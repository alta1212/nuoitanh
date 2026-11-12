import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { messages } from "./i18n";
import { defaultLocale } from "./utils/locale";
import { isFreePage } from "./utils/navigation";

/** Render một trang thành HTML tĩnh (dùng lúc build, xem scripts/prerender.mjs). */
export function render(path: string) {
  const meta = messages[defaultLocale].meta;
  return {
    html: renderToString(
      <StrictMode>
        <App initialLocale={defaultLocale} path={path} />
      </StrictMode>,
    ),
    title: isFreePage(path) ? meta.feedTitle : meta.homeTitle,
  };
}
