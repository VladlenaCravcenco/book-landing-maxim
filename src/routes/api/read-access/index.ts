import type { RequestHandler } from "@builder.io/qwik-city";
import { grantAccess } from "~/lib/access";
import { getPayInfo } from "~/lib/maib";

/**
 * Восстановление доступа к книге по ID платежа (он есть в письме).
 * Доступ выдаётся только если MAIB подтверждает, что платёж оплачен.
 */
export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;
  ctx.headers.set("cache-control", "no-store");

  try {
    const body: any = await request.json().catch(() => ({}));
    const payId = String(body?.payId ?? "").trim();

    if (!/^[A-Za-z0-9-]{8,64}$/.test(payId)) {
      json(400, { ok: false, error: "invalid payId" });
      return;
    }

    let info;
    try {
      info = await getPayInfo(ctx, payId);
    } catch {
      // MAIB отвечает 400 на несуществующий payId
      json(404, { ok: false, error: "not found" });
      return;
    }

    if (info.status !== "OK") {
      json(403, { ok: false, error: "not paid", status: info.status });
      return;
    }

    await grantAccess(ctx, info.payId);
    console.log("[read-access] granted", { payId: info.payId });
    json(200, { ok: true });
  } catch (e) {
    console.error("[read-access] error", e);
    json(500, { ok: false, error: "Server error" });
  }
};
