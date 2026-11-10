import type { RequestHandler } from "@builder.io/qwik-city";
import { getPayInfo, langFromOrderId, sendBookEmail } from "~/lib/maib";

/**
 * MAIB присылает сюда уведомление после оплаты (JSON: { result: {...}, signature }).
 * Телу не доверяем: берём из него только payId и спрашиваем реальный статус через pay-info.
 * Оплата через /pay списывается сразу — никакого confirm/complete здесь не нужно.
 */
async function handleCallback(ctx: any) {
  const { request, json, url } = ctx;

  let raw = "";
  try {
    raw = await request.text();
  } catch (err) {
    console.warn("[maib callback] request.text() failed", err);
  }

  let payId = String(url.searchParams.get("payId") || "");
  if (!payId && raw) {
    try {
      const parsed: any = JSON.parse(raw);
      payId = String(parsed?.result?.payId ?? parsed?.payId ?? "");
    } catch {
      payId = new URLSearchParams(raw).get("payId") || "";
    }
  }

  console.log("[maib callback] hit", {
    method: request.method,
    payId,
    raw: raw.slice(0, 500),
  });

  // Всегда 200, чтобы MAIB не ретраил бесконечно; причины видны в логах.
  if (!payId) {
    json(200, { ok: true, note: "no payId" });
    return;
  }

  try {
    const info = await getPayInfo(ctx, payId);
    console.log("[maib callback] pay-info", info);

    if (info.status !== "OK") {
      json(200, { ok: true, status: info.status });
      return;
    }

    if (!info.email) {
      console.warn("[maib callback] paid, but no email in pay-info", info);
      json(200, { ok: true, status: info.status, note: "no email" });
      return;
    }

    await sendBookEmail(ctx, {
      email: info.email,
      lang: langFromOrderId(info.orderId) ?? "ru",
      payId: info.payId,
      orderId: info.orderId,
    });

    json(200, { ok: true, status: info.status, emailed: true });
  } catch (e: any) {
    console.error("[maib callback] error", e);
    json(200, { ok: true, step: "exception" });
  }
}

export const onPost: RequestHandler = async (ctx) => {
  await handleCallback(ctx);
};

export const onGet: RequestHandler = async (ctx) => {
  await handleCallback(ctx);
};
