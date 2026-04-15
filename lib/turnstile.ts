type VerifyTurnstileArgs = {
  token?: string;
  ip?: string;
};

type TurnstileVerificationResult = {
  ok: boolean;
  message?: string;
  reason?: "disabled" | "missing" | "failed";
};

type TurnstileApiResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken({
  token,
  ip
}: VerifyTurnstileArgs): Promise<TurnstileVerificationResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: true, reason: "disabled" };
  }

  if (!token) {
    return {
      ok: false,
      reason: "missing",
      message: "La vérification anti-bot est requise avant l’envoi."
    };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  if (ip) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString(),
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        ok: false,
        reason: "failed",
        message: "La vérification anti-bot a échoué. Réessayez dans quelques instants."
      };
    }

    const payload = (await response.json()) as TurnstileApiResponse;
    if (!payload.success) {
      return {
        ok: false,
        reason: "failed",
        message: "La vérification anti-bot a échoué. Réessayez dans quelques instants."
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Turnstile verification error", error);
    return {
      ok: false,
      reason: "failed",
      message: "Le contrôle anti-bot est temporairement indisponible."
    };
  }
}
