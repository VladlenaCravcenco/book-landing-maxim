import { Resend } from "resend";

const DEFAULT_MAIB_API = "https://api.maibmerchants.md/v1";

// Сайт отдаёт 307 с 11book.online на www.11book.online.
// MAIB не ходит по редиректам при callback, поэтому все адреса — сразу на www.
const DEFAULT_SITE_URL = "https://www.11book.online";

export type Lang = "ru" | "ro";

export function getEnvValue(ctx: any, name: string): string | undefined {
  const fromAdapter = ctx?.env?.get?.(name);
  if (fromAdapter) return fromAdapter;
  return (globalThis as any)?.process?.env?.[name];
}

export function mustEnv(ctx: any, name: string): string {
  const v = getEnvValue(ctx, name);
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

export function maibApi(ctx: any) {
  return getEnvValue(ctx, "MAIB_API_URL") || DEFAULT_MAIB_API;
}

export function siteUrl(ctx: any) {
  return (getEnvValue(ctx, "SITE_URL") || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function toLang(v: unknown): Lang {
  return v === "ro" ? "ro" : "ru";
}

/** Язык зашит в orderId как префикс: "ro-…" / "ru-…". */
export function langFromOrderId(orderId: string): Lang | undefined {
  if (orderId.startsWith("ro-")) return "ro";
  if (orderId.startsWith("ru-")) return "ru";
  return undefined;
}

export async function fetchJson(
  url: string,
  init: RequestInit,
  timeoutMs = 15000,
) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    const text = await res.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text.slice(0, 500) };
    }
    return { res, data };
  } finally {
    clearTimeout(t);
  }
}

export async function getAccessToken(ctx: any): Promise<string> {
  const projectId = mustEnv(ctx, "MAIB_PROJECT_ID");
  const projectSecret = mustEnv(ctx, "MAIB_PROJECT_SECRET");

  const { res, data } = await fetchJson(`${maibApi(ctx)}/generate-token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ projectId, projectSecret }),
  });

  const token = data?.result?.accessToken;
  if (!res.ok || !data?.ok || !token) {
    console.error("[maib] token error", res.status, data);
    throw new Error(`MAIB token error (HTTP ${res.status})`);
  }
  return token;
}

export type PayInfo = {
  payId: string;
  orderId: string;
  status: string; // OK | FAILED | CREATED | PENDING | DECLINED | TIMEOUT
  statusCode?: string;
  statusMessage?: string;
  amount?: number;
  currency?: string;
  email?: string;
};

/** Авторитетный статус платежа — спрашиваем у MAIB, а не верим браузеру/callback. */
export async function getPayInfo(ctx: any, payId: string): Promise<PayInfo> {
  const token = await getAccessToken(ctx);
  const { res, data } = await fetchJson(
    `${maibApi(ctx)}/pay-info/${encodeURIComponent(payId)}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok || !data?.ok || !data?.result) {
    console.error("[maib] pay-info error", res.status, data);
    throw new Error(`MAIB pay-info error (HTTP ${res.status})`);
  }

  const r = data.result;
  return {
    payId: String(r.payId ?? payId),
    orderId: String(r.orderId ?? ""),
    status: String(r.status ?? ""),
    statusCode: r.statusCode != null ? String(r.statusCode) : undefined,
    statusMessage: r.statusMessage != null ? String(r.statusMessage) : undefined,
    amount: r.amount != null ? Number(r.amount) : undefined,
    currency: r.currency != null ? String(r.currency) : undefined,
    email: r.email ? String(r.email) : undefined,
  };
}

function bookEmail(lang: Lang, bookUrl: string, orderId: string, payId: string) {
  if (lang === "ro") {
    return {
      subject: "Acces la cartea „Sună-mă, nu mi-am schimbat numărul”",
      html: `<!DOCTYPE html>
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
      <a href="${bookUrl}" style="display:inline-block;padding:14px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">
        Citește cartea
      </a>
    </p>
    <p style="font-size:12px;color:#777;">
      Order ID: ${orderId || "-"}<br>
      Pay ID: ${payId || "-"}
    </p>
  </div>
</body>
</html>`,
    };
  }

  return {
    subject: "Доступ к книге «Позвони мне, я свой номер не менял»",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;padding:32px;border-radius:12px;">
    <h2 style="margin-top:0;">Спасибо за покупку</h2>
    <p>Вы успешно приобрели электронную книгу<br>
    <strong>«Позвони мне, я свой номер не менял»</strong></p>
    <p style="margin:32px 0;">
      <a href="${bookUrl}" style="display:inline-block;padding:14px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">
        Читать книгу
      </a>
    </p>
    <p style="font-size:12px;color:#777;">
      Номер заказа: ${orderId || "-"}<br>
      ID платежа: ${payId || "-"}
    </p>
  </div>
</body>
</html>`,
  };
}

/**
 * Отправляет письмо с книгой. Идемпотентно по payId (ключ Resend живёт 24 ч),
 * поэтому callback и страница успеха могут вызвать это оба — письмо придёт одно.
 */
export async function sendBookEmail(
  ctx: any,
  opts: { email: string; lang: Lang; payId: string; orderId: string },
) {
  const resend = new Resend(mustEnv(ctx, "RESEND_API_KEY"));
  const from = mustEnv(ctx, "MAIL_FROM");
  const base = siteUrl(ctx);
  const bookUrl = opts.lang === "ro" ? `${base}/ro/read/` : `${base}/read/`;
  const { subject, html } = bookEmail(opts.lang, bookUrl, opts.orderId, opts.payId);

  const result = await resend.emails.send(
    { from, to: opts.email, subject, html },
    { idempotencyKey: `book-email/${opts.payId}` },
  );

  if (result.error) {
    console.error("[mail] send failed", result.error);
    throw new Error(`Email send failed: ${result.error.message}`);
  }
  return result.data?.id ?? null;
}
