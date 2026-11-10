function getEnvValue(ctx: any, name: string): string | undefined {
  return ctx?.env?.get?.(name) || (globalThis as any)?.process?.env?.[name];
}

/**
 * Доступ к книге. Токен = "<payId>.<HMAC-SHA256(payId)>", без базы данных:
 * подделать его без секрета нельзя, а проверка не требует запроса в MAIB.
 *
 * Секрет: READ_TOKEN_SECRET, если задан в Vercel, иначе производный от
 * MAIB_PROJECT_SECRET (он уже есть). Если поменять секрет — все выданные
 * ссылки и cookie перестанут работать, покупатели восстановят доступ по ID платежа.
 */

export const ACCESS_COOKIE = "book_access";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 года

function secret(ctx: any): string {
  const s =
    getEnvValue(ctx, "READ_TOKEN_SECRET") ||
    getEnvValue(ctx, "MAIB_PROJECT_SECRET");
  if (!s) throw new Error("READ_TOKEN_SECRET / MAIB_PROJECT_SECRET is missing");
  return `book-read-access-v1:${s}`;
}

function b64url(buf: ArrayBuffer): string {
  let bin = "";
  for (const b of new Uint8Array(buf)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(ctx: any, payId: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret(ctx)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`read:${payId}`),
  );
  return b64url(sig);
}

export async function createAccessToken(ctx: any, payId: string): Promise<string> {
  return `${payId}.${await sign(ctx, payId)}`;
}

export async function verifyAccessToken(ctx: any, token: string | undefined | null) {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[A-Za-z0-9-]{8,64}$/.test(payId)) return false;

  const expected = await sign(ctx, payId);
  // сравнение без раннего выхода
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

/** ctx — RequestEvent Qwik City (есть cookie.set). */
export function setAccessCookie(ctx: any, token: string) {
  ctx.cookie.set(ACCESS_COOKIE, token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function hasAccess(ctx: any): Promise<boolean> {
  return verifyAccessToken(ctx, ctx.cookie.get(ACCESS_COOKIE)?.value);
}

/** Выдать доступ по подтверждённому платежу (cookie на этот браузер). */
export async function grantAccess(ctx: any, payId: string) {
  const token = await createAccessToken(ctx, payId);
  setAccessCookie(ctx, token);
  return token;
}
