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

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

socket.addEventListener("message", (event) => {
  const payload = JSON.parse(event.data);
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

const before = await evaluate(`(() => ({
  href: window.location.href,
  selector: !!document.querySelector('[data-site-language-selector]'),
  enButton: !!document.querySelector('[title="English translation of the site"]'),
  scriptExists: !!document.getElementById('google-translate-script'),
  scriptSrc: document.getElementById('google-translate-script')?.src ?? null,
  initialized: document.getElementById('google_translate_element')?.dataset.initialized ?? null,
  combo: !!document.querySelector('.goog-te-combo'),
  htmlClass: document.documentElement.className,
  cookie: document.cookie,
}))()`);

for (let attempt = 0; attempt < 20; attempt += 1) {
  const ready = await evaluate(`(() => ({
    initialized: document.getElementById('google_translate_element')?.dataset.initialized ?? null,
    combo: !!document.querySelector('.goog-te-combo')
  }))()`);

  if (ready.combo) {
    break;
  }

  await delay(500);
}

await evaluate(`(() => {
  const button = document.querySelector('[title="English translation of the site"]');
  if (!button) {
    throw new Error('English button not found');
  }
  button.click();
  return true;
})()`);

for (let attempt = 0; attempt < 20; attempt += 1) {
  const state = await evaluate(`(() => ({
    cookie: document.cookie,
    comboValue: document.querySelector('.goog-te-combo')?.value ?? null,
    htmlClass: document.documentElement.className,
    bodyText: document.body.innerText.slice(0, 500)
  }))()`);

  if (
    state.cookie.includes("googtrans=/fr/en") ||
    state.comboValue === "en" ||
    state.htmlClass.includes("translated")
  ) {
    console.log(JSON.stringify({ before, after: state }, null, 2));
    socket.close();
    process.exit(0);
  }

  await delay(500);
}

const after = await evaluate(`(() => ({
  scriptExists: !!document.getElementById('google-translate-script'),
  scriptSrc: document.getElementById('google-translate-script')?.src ?? null,
  initialized: document.getElementById('google_translate_element')?.dataset.initialized ?? null,
  comboValue: document.querySelector('.goog-te-combo')?.value ?? null,
  htmlClass: document.documentElement.className,
  cookie: document.cookie,
  translateResourceHits: performance.getEntriesByType('resource')
    .map((entry) => entry.name)
    .filter((name) => name.includes('translate')),
  bodyText: document.body.innerText.slice(0, 800)
}))()`);

console.log(JSON.stringify({ before, after }, null, 2));
socket.close();
process.exit(1);
