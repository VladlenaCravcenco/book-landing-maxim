import type { RequestHandler } from "@builder.io/qwik-city";

const DEFAULT_MAIB_API = "https://api.maibmerchants.md/v1";

function getEnvValue(ctx: any, name: string): string | undefined {
  const fromAdapter = ctx?.env?.get?.(name);
  if (fromAdapter) return fromAdapter;

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
  json(200, { ok: true, route: "maib/refund" });
};

export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  try {
    console.log("[refund] hit");

    const projectId = mustEnv(ctx, "MAIB_PROJECT_ID");
    const projectSecret = mustEnv(ctx, "MAIB_PROJECT_SECRET");
    const MAIB_API = getEnvValue(ctx, "MAIB_API_URL") || DEFAULT_MAIB_API;

    const body: any = await request.json().catch(() => ({}));

    const payId = body.payId ? String(body.payId) : "";
    if (!payId) {
      json(400, { ok: false, error: "payId is required" });
      return;
    }

    // refundAmount НЕ обязателен.
    // Если не передать — будет FULL refund (полный возврат).
    // Если передать — частичный/полный, но в формате X.XX
    const refundAmountRaw = body.refundAmount ?? body.amount;
    const refundAmount =
      refundAmountRaw === undefined || refundAmountRaw === null || refundAmountRaw === ""
        ? undefined
        : Number(refundAmountRaw);

    if (refundAmount !== undefined) {
      if (!Number.isFinite(refundAmount) || refundAmount <= 0) {
        json(400, { ok: false, error: "refundAmount must be a positive number" });
        return;
      }
    }

    // 1) generate-token
    const { res: tokenRes, data: tokenData } = await fetchJson(
      `${MAIB_API}/generate-token`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId, projectSecret }),
      },
      15000
    );

    const accessToken = tokenData?.result?.accessToken;

    if (!tokenRes.ok || !tokenData?.ok || !accessToken) {
      console.error("MAIB token error:", tokenRes.status, tokenData);
      json(500, {
        ok: false,
        error: "MAIB token error",
        status: tokenRes.status,
        details: tokenData,
      });
      return;
    }

    // 2) refund
    const payload: any = { payId };
    if (refundAmount !== undefined) payload.refundAmount = refundAmount;

    const { res: refundRes, data: refundData } = await fetchJson(
      `${MAIB_API}/refund`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
      15000
    );

    if (!refundRes.ok || !refundData?.ok) {
      console.error("MAIB refund error:", refundRes.status, refundData);
      json(500, {
        ok: false,
        error: "MAIB refund error",
        status: refundRes.status,
        details: refundData,
      });
      return;
    }

    json(200, refundData);
  } catch (e: any) {
    console.error("[refund] ERROR:", e);
    json(500, { ok: false, error: e?.message || "Server error" });
  }
};