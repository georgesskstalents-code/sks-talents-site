const debuggerListResponse = await fetch("http://127.0.0.1:9222/json/list");

if (!debuggerListResponse.ok) {
  throw new Error(`Unable to reach Chrome debugger: ${debuggerListResponse.status}`);
}

const targets = await debuggerListResponse.json();
const pageTarget = targets.find(
  (target) => target.type === "page" && target.url.startsWith("http://127.0.0.1:3200/")
);

if (!pageTarget?.webSocketDebuggerUrl) {
  throw new Error("No local SKS TALENTS page target found in Chrome debugger.");
}

const socket = new WebSocket(pageTarget.webSocketDebuggerUrl);
const pending = new Map();
let messageId = 0;
const consoleMessages = [];

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

socket.addEventListener("message", (event) => {
  const payload = JSON.parse(event.data);
  if (payload.method === "Runtime.consoleAPICalled") {
    consoleMessages.push({
      type: payload.params.type,
      args: payload.params.args?.map((arg) => arg.value ?? arg.description ?? null) ?? []
    });
    return;
  }

  if (payload.method === "Runtime.exceptionThrown") {
    consoleMessages.push({
      type: "exception",
      args: [payload.params.exceptionDetails?.text ?? "Unknown exception"]
    });
    return;
  }

  if (!("id" in payload)) {
    return;
  }

  const entry = pending.get(payload.id);
  if (!entry) {
    return;
  }

  pending.delete(payload.id);

  if (payload.error) {
    entry.reject(new Error(payload.error.message));
    return;
  }

  entry.resolve(payload.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });

  return result.result?.value;
}

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false
});
await send("Page.navigate", { url: "http://127.0.0.1:3200/" });
await new Promise((resolve) => setTimeout(resolve, 8000));

const data = await evaluate(`(() => {
  const root = document.querySelector('.sks-elfsight-translator');
  const widget = root?.querySelector('[class^="elfsight-app-"]');
  const iframe = root?.querySelector('iframe');
  const shadowHost = widget?.shadowRoot ? true : false;
  const rect = root?.getBoundingClientRect();
  const widgetRect = widget?.getBoundingClientRect();
  const iframeRect = iframe?.getBoundingClientRect();
  const styles = root ? window.getComputedStyle(root) : null;
  const parentStyles = root?.parentElement ? window.getComputedStyle(root.parentElement) : null;

  return {
    hasRoot: !!root,
    hasWidget: !!widget,
    hasIframe: !!iframe,
    hasShadowRoot: shadowHost,
    rootHtml: root?.innerHTML ?? null,
    text: root?.innerText ?? null,
    rect: rect ? { width: rect.width, height: rect.height, x: rect.x, y: rect.y } : null,
    widgetRect: widgetRect ? { width: widgetRect.width, height: widgetRect.height } : null,
    iframeRect: iframeRect ? { width: iframeRect.width, height: iframeRect.height } : null,
    styles: styles ? {
      display: styles.display,
      width: styles.width,
      minWidth: styles.minWidth,
      maxWidth: styles.maxWidth,
      overflow: styles.overflow,
      borderRadius: styles.borderRadius,
      border: styles.border,
      background: styles.backgroundColor
    } : null,
    parentStyles: parentStyles ? {
      display: parentStyles.display,
      width: parentStyles.width,
      visibility: parentStyles.visibility
    } : null,
    globals: {
      eapps: typeof window.eapps,
      elfsightPlatform: typeof window.EappsPlatform,
      elfsightWidget: typeof window.elfsightApp,
    },
    scripts: [...document.scripts].map((script) => script.src).filter(Boolean).filter((src) => src.includes('elfsight')),
    resources: performance.getEntriesByType('resource').map((entry) => entry.name).filter((name) => name.includes('elfsight'))
  };
})()`);

console.log(JSON.stringify({ ...data, consoleMessages }, null, 2));
socket.close();
