import type { RequestHandler } from "@builder.io/qwik-city";

const DEFAULT_MAIB_API = "https://api.maibmerchants.md/v1";

function getEnvValue(ctx: any, name: string): string | undefined {
  const fromAdapter = ctx?.env?.get?.(name);
  if (fromAdapter) return fromAdapter;

  return (globalThis as any)?.process?.env?.[name] ?? process.env?.[name];
}

function mustEnv(ctx: any, name: string) {
  const v = getEnvValue(ctx, name);
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

async function fetchJson(url: string, init: RequestInit) {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

async function handleCallback(ctx: any) {
  const { request, json, url } = ctx;

  // 1) Снимаем максимум инфы для логов
  const method = request.method;
  const contentType = request.headers.get("content-type") || "";

  let raw = "";
  try {
    raw = await request.text();
  } catch (err) {
    console.warn("[maib callback] request.text() failed", err);
  }

  // payId/orderId часто приходят либо query, либо в body
  const qpPayId = String(url.searchParams.get("payId") || "");
  const qpOrderId = String(url.searchParams.get("orderId") || "");

  let bodyPayId = "";
  let bodyOrderId = "";

  if (raw) {
    // JSON
    try {
      const parsed: any = JSON.parse(raw);
      bodyPayId =
        (parsed?.payId && String(parsed.payId)) ||
        (parsed?.result?.payId && String(parsed.result.payId)) ||
        "";
      bodyOrderId =
        (parsed?.orderId && String(parsed.orderId)) ||
        (parsed?.result?.orderId && String(parsed.result.orderId)) ||
        "";
    } catch {
      // form-urlencoded
      try {
        const params = new URLSearchParams(raw);
        bodyPayId = params.get("payId") || "";
        bodyOrderId = params.get("orderId") || "";
      } catch {}
    }
  }

  const payId = qpPayId || bodyPayId;
  const orderId = qpOrderId || bodyOrderId;

  console.log("[maib callback] hit", {
    method,
    contentType,
    payId,
    orderId,
    raw: raw ? raw.slice(0, 500) : "",
  });

  // 2) Если нет payId/orderId — всё равно отвечаем 200 (чтобы MAIB не ретраил бесконечно),
  // но по логам будет понятно, что реально пришло.
  if (!payId || !orderId) {
    json(200, { ok: true, note: "no payId/orderId in callback" });
    return;
  }

  // 3) Делаем confirm
  try {
    const projectId = mustEnv(ctx, "MAIB_PROJECT_ID");
    const projectSecret = mustEnv(ctx, "MAIB_PROJECT_SECRET");
    const MAIB_API = getEnvValue(ctx, "MAIB_API_URL") || DEFAULT_MAIB_API;

    // token
    const { res: tokenRes, data: tokenData } = await fetchJson(
      `${MAIB_API}/generate-token`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectId, projectSecret }),
      },
    );

    const accessToken = tokenData?.result?.accessToken;
    if (!tokenRes.ok || !tokenData?.ok || !accessToken) {
      console.error("[maib callback] token error", tokenRes.status, tokenData);
      json(200, { ok: true, step: "token_error" }); // 200 чтобы MAIB не душил ретраями
      return;
    }

    // confirm
    const { res: confRes, data: confData } = await fetchJson(
      `${MAIB_API}/confirm`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ payId, orderId }),
      },
    );

    console.log("[maib callback] confirm result", {
      status: confRes.status,
      ok: confRes.ok,
      confData,
    });

    // ВАЖНО: даже если confirm не ок — мы всё равно отвечаем 200, но в логах видна причина.
    json(200, { ok: true, confirmed: confRes.ok });
    return;
  } catch (e: any) {
    console.error("[maib callback] server error", e);
    json(200, { ok: true, step: "exception", message: e?.message || "error" });
    return;
  }
}

export const onPost: RequestHandler = async (ctx) => {
  await handleCallback(ctx);
};

export const onGet: RequestHandler = async (ctx) => {
  await handleCallback(ctx);
};
