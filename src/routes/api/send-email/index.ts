import type { RequestHandler } from "@builder.io/qwik-city";
import { getPayInfo, langFromOrderId, sendBookEmail, toLang } from "~/lib/maib";

/**
 * Вызывается со страницы успеха. Письмо уходит только если MAIB подтверждает,
 * что платёж с этим payId реально оплачен (status === "OK").
 * Ответ: { status: "sent" | "pending" | "failed", ... }
 */
export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  try {
    const body: any = await request.json().catch(() => ({}));
    const payId = body?.payId ? String(body.payId) : "";
    const browserEmail = body?.email ? String(body.email).trim() : "";

    if (!payId) {
      json(400, { status: "failed", error: "payId is required" });
      return;
    }

    const info = await getPayInfo(ctx, payId);

    if (info.status === "CREATED" || info.status === "PENDING") {
      json(200, { status: "pending" });
      return;
    }

    if (info.status !== "OK") {
      json(200, { status: "failed", payStatus: info.status });
      return;
    }

    // Email, указанный при оплате (из MAIB), надёжнее того, что лежит в браузере.
    const email = info.email || browserEmail;
    if (!email) {
      json(200, { status: "failed", error: "no email" });
      return;
    }

    await sendBookEmail(ctx, {
      email,
      lang: langFromOrderId(info.orderId) ?? toLang(body?.language),
      payId: info.payId,
      orderId: info.orderId,
    });

    json(200, { status: "sent" });
  } catch (e: any) {
    console.error("[send-email] error", e);
    json(500, { status: "failed", error: "Server error" });
  }
};
