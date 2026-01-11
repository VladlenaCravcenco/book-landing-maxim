import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ json }) => {
  json(200, { ok: true, route: 'maib/create-payment' });
};

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    console.log('[create-payment] hit');

    const text = await request.text();
    let body: any = {};
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = {};
    }

    json(200, { payUrl: '/payment/success?stub=2', debugBody: body });
  } catch (e: any) {
    console.error('[create-payment] ERROR:', e);
    json(500, { error: e?.message || 'Server error' });
  }
};