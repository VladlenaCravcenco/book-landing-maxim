import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request, json }) => {
  const raw = await request.text();

  console.log('MAIB CALLBACK:', raw);

  // Важно: json() НЕ возвращаем
  json(200, { ok: true });
};