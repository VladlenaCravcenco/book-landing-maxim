import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    console.log('[create-payment] hit');

    // ✅ читаем body безопасно
    const text = await request.text();
    console.log('[create-payment] raw body:', text);

    let body: any = {};
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      // если прилетит не JSON — не падаем
      body = {};
    }

    console.log('[create-payment] parsed:', body);

    // временно вернём заглушку payUrl, но уже после чтения body
    json(200, { payUrl: '/payment/success?stub=2', debugBody: body });
  } catch (e: any) {
    console.error('[create-payment] ERROR:', e);
    json(500, { error: e?.message || 'Server error' });
  }
};