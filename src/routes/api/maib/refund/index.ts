import type { RequestHandler } from "@builder.io/qwik-city";
import { fetchJson, getAccessToken, getEnvValue, maibApi } from "~/lib/maib";

/**
 * Возврат денег. Раньше был открыт всем — любой мог вернуть любой платёж по payId.
 * Теперь нужен заголовок `Authorization: Bearer <REFUND_ADMIN_TOKEN>`.
 * Если переменная REFUND_ADMIN_TOKEN не задана в Vercel — возвраты через API выключены.
 *
 * Пример:
 *   curl -X POST https://www.11book.online/api/maib/refund \
 *     -H "Authorization: Bearer $REFUND_ADMIN_TOKEN" \
 *     -H "content-type: application/json" \
 *     -d '{"payId":"..."}'
 */
export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  const adminToken = getEnvValue(ctx, "REFUND_ADMIN_TOKEN");
  const auth = request.headers.get("authorization") || "";
  if (!adminToken || auth !== `Bearer ${adminToken}`) {
    json(403, { ok: false, error: "Forbidden" });
    return;
  }

  try {
    const body: any = await request.json().catch(() => ({}));

    const payId = body.payId ? String(body.payId) : "";
    if (!payId) {
      json(400, { ok: false, error: "payId is required" });
      return;
    }

    // refundAmount не обязателен: без него — полный возврат.
    const refundAmountRaw = body.refundAmount ?? body.amount;
    const refundAmount =
      refundAmountRaw === undefined || refundAmountRaw === null || refundAmountRaw === ""
        ? undefined
        : Number(refundAmountRaw);

    if (refundAmount !== undefined && (!Number.isFinite(refundAmount) || refundAmount <= 0)) {
      json(400, { ok: false, error: "refundAmount must be a positive number" });
      return;
    }

    const accessToken = await getAccessToken(ctx);

    const payload: any = { payId };
    if (refundAmount !== undefined) payload.refundAmount = refundAmount;

    const { res, data } = await fetchJson(`${maibApi(ctx)}/refund`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok || !data?.ok) {
      console.error("[refund] MAIB error", res.status, data);
      json(502, { ok: false, error: "MAIB refund error", status: res.status, details: data });
      return;
    }

    json(200, data);
  } catch (e: any) {
    console.error("[refund] ERROR", e);
    json(500, { ok: false, error: e?.message || "Server error" });
  }
};
