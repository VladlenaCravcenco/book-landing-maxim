import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

const SITE = "https://www.11book.online";
const OG_IMAGE = `${SITE}/images/og-cover.jpg`;

/** Пары страниц RU ↔ RO: "/x/" ↔ "/ro/x/". */
function alternates(pathname: string) {
  const isRo = pathname === "/ro" || pathname.startsWith("/ro/");
  const ruPath = isRo ? pathname.slice(3) || "/" : pathname;
  const roPath = ruPath === "/" ? "/ro/" : `/ro${ruPath}`;
  return { isRo, ruPath, roPath };
}

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const { isRo, ruPath, roPath } = alternates(loc.url.pathname);
  // Canonical — всегда www и без параметров (?payId=…, ?t=… и т.п.)
  const canonical = `${SITE}${loc.url.pathname}`;
  const description = head.meta.find((m) => m.name === "description")?.content;
  const noindex = head.meta.some(
    (m) => m.name === "robots" && String(m.content).includes("noindex"),
  );

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={canonical} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      {!noindex && (
        <>
          <link rel="alternate" hreflang="ru" href={`${SITE}${ruPath}`} />
          <link rel="alternate" hreflang="ro" href={`${SITE}${roPath}`} />
          <link rel="alternate" hreflang="x-default" href={`${SITE}${ruPath}`} />
        </>
      )}

      {/* Превью ссылок в соцсетях и мессенджерах */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="11book.online" />
      <meta property="og:locale" content={isRo ? "ro_RO" : "ru_RU"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={head.title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
