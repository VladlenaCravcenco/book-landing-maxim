import type { RequestHandler } from "@builder.io/qwik-city";
import { Resend } from "resend";

function getEnv(ctx: any, name: string) {
  // 1) Qwik adapters (server/edge)
  const v1 = ctx?.env?.get?.(name);
  if (v1) return v1;

  // 2) Node/Vercel serverless
  const v2 = (globalThis as any)?.process?.env?.[name] ?? process?.env?.[name];
  if (v2) return v2;

  return undefined;
}

function mustEnv(ctx: any, name: string) {
  const v = getEnv(ctx, name);
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  try {
    const resend = new Resend(mustEnv(ctx, "RESEND_API_KEY"));

    const body: any = await request.json().catch(() => ({}));
    const email = body?.email ? String(body.email) : "";
    const language = body?.language === "ro" ? "ro" : "ru";
    const payId = body?.payId ? String(body.payId) : "";
    const orderId = body?.orderId ? String(body.orderId) : "";

    if (!email) {
      json(400, { error: "Email is required" });
      return;
    }

    const from = mustEnv(ctx, "MAIL_FROM"); // лучше строго must, чтобы не стрелять в onboarding@resend.dev

    const subject =
      language === "ro"
        ? "Acces la cartea „Sună-mă, nu mi-am schimbat numărul”"
        : "Доступ к книге «Позвони мне, я свой номер не менял»";

    const bookUrl = "https://11book.online/read";

    const html =
      language === "ro"
        ? `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
<body style="margin:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;padding:32px;border-radius:12px;">
    <h2 style="margin-top:0;">Mulțumim pentru achiziție</h2>
    <p>Ați cumpărat cu succes cartea electronică<br>
    <strong>„Sună-mă, nu mi-am schimbat numărul”</strong></p>

    <p style="margin:32px 0;">
      <a href="${bookUrl}"
         style="display:inline-block;padding:14px 24px;background:#111;color:#fff;
                text-decoration:none;border-radius:8px;">
        Citește cartea
      </a>
    </p>

    <p style="font-size:12px;color:#777;">
      Order ID: ${orderId || "-"}<br>
      Pay ID: ${payId || "-"}
    </p>
  </div>
</body>
</html>
`
        : `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;padding:32px;border-radius:12px;">
    <h2 style="margin-top:0;">Спасибо за покупку</h2>
    <p>Вы успешно приобрели электронную книгу<br>
    <strong>«Позвони мне, я свой номер не менял»</strong></p>

    <p style="margin:32px 0;">
      <a href="${bookUrl}"
         style="display:inline-block;padding:14px 24px;background:#111;color:#fff;
                text-decoration:none;border-radius:8px;">
        Читать книгу
      </a>
    </p>

    <p style="font-size:12px;color:#777;">
      Номер заказа: ${orderId || "-"}<br>
      ID платежа: ${payId || "-"}
    </p>
  </div>
</body>
</html>
`;
    const result = await resend.emails.send({
      from,
      to: email,
      subject,
      html,
    });

    const err = (result as any)?.error;
    const data = (result as any)?.data;

    if (err) {
      json(500, { error: "Email send failed", details: err });
      return;
    }

    json(200, { ok: true, id: data?.id || null });
  } catch (e: any) {
    json(500, { error: e?.message || "Server error" });
  }
};
