import { setAccessCookie, verifyAccessToken } from "./access";

/**
 * onRequest для /read и /ro/read:
 * - страница персональная — не кэшировать;
 * - ссылка из письма вида /read/?t=<токен>: ставим cookie и убираем токен из адреса.
 */
export async function handleReadRequest(ev: any) {
  ev.headers.set("cache-control", "private, no-store");
  ev.headers.set("x-robots-tag", "noindex, nofollow");

  const t = ev.url.searchParams.get("t");
  if (!t) return;

  if (await verifyAccessToken(ev, t)) {
    setAccessCookie(ev, t);
    const clean = new URL(ev.url);
    clean.searchParams.delete("t");
    throw ev.redirect(302, clean.pathname + clean.search);
  }
}
