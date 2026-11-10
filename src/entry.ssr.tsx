/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import Root from "./root";

function langFromUrl(url: unknown): string {
  try {
    const path = new URL(String(url)).pathname;
    return path === "/ro" || path.startsWith("/ro/") ? "ro" : "ru";
  } catch {
    return "ru";
  }
}

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: langFromUrl(opts.serverData?.url),
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}
