import type { RequestHandler } from "@builder.io/qwik-city";
import {
  fetchJson,
  getAccessToken,
  maibApi,
  siteUrl,
  toLang,
} from "~/lib/maib";

// Цена фиксируется на сервере — то, что прислал браузер, игнорируем.
const AMOUNT = 199;
const CURRENCY = "MDL";

export const onGet: RequestHandler = async ({ json }) => {
  json(200, { ok: true, route: "maib/create-payment" });
};

export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  try {
    const body: any = await request.json().catch(() => ({}));

    const lang = toLang(body.language);
    const rawEmail = String(body.customerEmail ?? body.email ?? "").trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)
      ? rawEmail
      : undefined;

    const xf = request.headers.get("x-forwarded-for") || "";
    const clientIp = (xf.split(",")[0] || "").trim() || "127.0.0.1";

    const base = siteUrl(ctx);
    const prefix = lang === "ro" ? "/ro" : "";
    // Слеш в конце обязателен: без него Qwik отвечает 301 (лишний редирект).
    const okUrl = `${base}${prefix}/payment/success/`;
    const failUrl = `${base}${prefix}/payment/fail/`;
    const callbackUrl = `${base}/api/maib/callback`;

    // Язык храним префиксом в orderId, чтобы callback знал, на каком языке слать письмо.
    // Всегда генерируем на сервере (ro-/ru- + 32 hex = 35 символов).
    const uid = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}${Math.random()}`)
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 32);
    const orderId = `${lang}-${uid}`;

    const description =
      lang === "ro" ? "11book — carte electronică" : "11book — электронная книга";

    const accessToken = await getAccessToken(ctx);

    const { res: payRes, data: payData } = await fetchJson(
      `${maibApi(ctx)}/pay`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          clientIp,
          amount: AMOUNT,
          currency: CURRENCY,
          description,
          language: lang,
          orderId,
          ...(email ? { email } : {}),
          callbackUrl,
          okUrl,
          failUrl,
        }),
      },
    );

    const payUrl = payData?.result?.payUrl;
    const payId = payData?.result?.payId;

    if (!payRes.ok || !payData?.ok || !payUrl) {
      console.error("[create-payment] MAIB pay error", payRes.status, payData);
      json(502, { error: "MAIB pay error", status: payRes.status });
      return;
    }

    console.log("[create-payment] created", { payId, orderId, lang });
    json(200, { ok: true, payId, orderId, payUrl });
  } catch (e: any) {
    console.error("[create-payment] ERROR", e);
    json(500, { error: "Server error" });
  }
};
