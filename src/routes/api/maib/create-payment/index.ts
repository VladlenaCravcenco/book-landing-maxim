import type { RequestHandler } from "@builder.io/qwik-city";

const DEFAULT_MAIB_API = "https://api.maibmerchants.md/v1";

function getEnvValue(ctx: any, name: string): string | undefined {
  // Qwik adapters могут давать env.get()
  const fromAdapter = ctx?.env?.get?.(name);
  if (fromAdapter) return fromAdapter;

  // Node/Vercel serverless
  const fromProcess =
    (globalThis as any)?.process?.env?.[name] ?? process.env?.[name];
  return fromProcess;
}

function mustEnv(ctx: any, name: string) {
  const v = getEnvValue(ctx, name);
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

async function fetchJson(url: string, init: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  } finally {
    clearTimeout(t);
  }
}

export const onGet: RequestHandler = async ({ json }) => {
  json(200, { ok: true, route: "maib/create-payment" });
};

export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  try {
    console.log("[create-payment] hit");

    const projectId = mustEnv(ctx, "MAIB_PROJECT_ID");
    const projectSecret = mustEnv(ctx, "MAIB_PROJECT_SECRET");

    const MAIB_API = getEnvValue(ctx, "MAIB_API_URL") || DEFAULT_MAIB_API;

    const body: any = await request.json().catch(() => ({}));

    const amount = Number(body.amount ?? 10);
    const currency = String(body.currency ?? "MDL");
    const language = String(body.language ?? "ru");

    const email = body.customerEmail
      ? String(body.customerEmail)
      : body.email
        ? String(body.email)
        : undefined;

    const xf = request.headers.get("x-forwarded-for") || "";
    const clientIp = (xf.split(",")[0] || "").trim() || "127.0.0.1";

    const BASE = "https://11book.online";

    const okUrl = `${BASE}/payment/success`;
    const failUrl = `${BASE}/payment/fail`;
    const callbackUrl = `${BASE}/api/maib/callback`;

    const orderId = String(
      body.orderId ?? globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
    );

    // 1) generate-token
    const { res: tokenRes, data: tokenData } = await fetchJson(
      `${MAIB_API}/generate-token`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId, projectSecret }),
      },
      15000,
    );

    const accessToken = tokenData?.result?.accessToken;

    if (!tokenRes.ok || !tokenData?.ok || !accessToken) {
      console.error("MAIB token error:", tokenRes.status, tokenData);
      json(500, {
        error: "MAIB token error",
        status: tokenRes.status,
        details: tokenData,
      });
      return;
    }

    // 2) pay
    const { res: payRes, data: payData } = await fetchJson(
      `${MAIB_API}/pay`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          clientIp,
          amount,
          currency,
          description: body.description
            ? String(body.description)
            : "11book.online",
          language,
          orderId,
          email,
          callbackUrl,
          okUrl,
          failUrl,
        }),
      },
      15000,
    );

    const payUrl = payData?.result?.payUrl;
    const payId = payData?.result?.payId;

    if (!payRes.ok || !payData?.ok || !payUrl) {
      console.error("MAIB pay error:", payRes.status, payData);
      json(500, {
        error: "MAIB pay error",
        status: payRes.status,
        details: payData,
      });
      return;
    }

    json(200, { ok: true, payId, orderId, payUrl });
  } catch (e: any) {
    console.error("[create-payment] ERROR:", e);
    json(500, { error: e?.message || "Server error" });
  }
};
