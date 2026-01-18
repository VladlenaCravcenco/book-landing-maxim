import type { RequestHandler } from '@builder.io/qwik-city';
import { Resend } from 'resend';

function getEnvValue(ctx: any, name: string): string | undefined {
  const fromAdapter = ctx?.env?.get?.(name);
  if (fromAdapter) return fromAdapter;

  const fromNode =
    (globalThis as any)?.process?.env?.[name] ??
    process?.env?.[name];

  return fromNode;
}

function mustEnv(ctx: any, name: string) {
  const v = getEnvValue(ctx, name);
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

export const onPost: RequestHandler = async (ctx) => {
  const { request, json } = ctx;

  try {
    const resend = new Resend(mustEnv(ctx, 'RESEND_API_KEY'));

    const body: any = await request.json().catch(() => ({}));
    const email = body?.email ? String(body.email) : '';
    const language = body?.language === 'ro' ? 'ro' : 'ru';
    const payId = body?.payId ? String(body.payId) : '';
    const orderId = body?.orderId ? String(body.orderId) : '';

    if (!email) {
      json(400, { error: 'Email is required' });
      return;
    }

    const subject =
      language === 'ro'
        ? 'Acces la cartea „Sună-mă, nu mi-am schimbat numărul”'
        : 'Доступ к книге «Позвони мне, я свой номер не менял»';

    const html =
      language === 'ro'
        ? `<h2>Mulțumim!</h2><p><a href="https://11book.online/read">Citește cartea</a></p>
           <p><small>payId: ${payId || '-'} | orderId: ${orderId || '-'}</small></p>`
        : `<h2>Спасибо!</h2><p><a href="https://11book.online/read">Читать книгу</a></p>
           <p><small>payId: ${payId || '-'} | orderId: ${orderId || '-'}</small></p>`;

    const from = getEnvValue(ctx, 'MAIL_FROM') || 'onboarding@resend.dev';

    const result = await resend.emails.send({ from, to: email, subject, html });

    const err = (result as any)?.error;
    const data = (result as any)?.data;

    if (err) {
      console.error('[send-email] resend error', err);
      json(500, { error: 'Email send failed', details: err });
      return;
    }

    json(200, { ok: true, id: data?.id || null });
  } catch (e: any) {
    console.error('[send-email] server error', e);
    json(500, { error: e?.message || 'Server error' });
  }
};