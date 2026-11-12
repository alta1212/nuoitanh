import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { defaultLocale, getInitialLocale } from "./utils/locale";
import "./styles/global.css";

const container = document.getElementById("root")!;
const locale = getInitialLocale();
const app = (
  <StrictMode>
    <App initialLocale={locale} path={window.location.pathname} />
  </StrictMode>
);

// HTML được prerender bằng tiếng Việt. Khách tiếng Việt: hydrate lên HTML có sẵn.
// Khách ngôn ngữ khác: render lại từ đầu để khỏi lệch nội dung khi hydrate.
if (container.hasChildNodes() && locale === defaultLocale) hydrateRoot(container, app);
else createRoot(container).render(app);
