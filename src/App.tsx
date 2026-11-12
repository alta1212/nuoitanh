import { useEffect, useState } from "react";
import AlertBar from "./components/AlertBar";
import ExitIntentModal from "./components/ExitIntentModal";
import FxProvider from "./components/FxProvider";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { messages } from "./i18n";
import FreeFeedPage from "./pages/FreeFeedPage";
import HomePage from "./pages/HomePage";
import { saveLocale, type Locale } from "./utils/locale";
import { isFreePage } from "./utils/navigation";

interface AppProps {
  /** Ngôn ngữ lúc render đầu tiên; phải khớp với HTML prerender khi hydrate. */
  initialLocale: Locale;
  /** Đường dẫn trang, truyền vào để render được cả ở server lẫn client. */
  path: string;
}

export default function App({ initialLocale, path }: AppProps) {
  const [locale, setLocale] = useState(initialLocale);
  const isFreeFeed = isFreePage(path);
  const t = messages[locale];

  useEffect(() => {
    const meta = messages[locale].meta;
    document.documentElement.lang = locale;
    document.title = isFreeFeed ? meta.feedTitle : meta.homeTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    saveLocale(locale);
  }, [isFreeFeed, locale]);

  return (
    <FxProvider>
      <div className="stars" />
      <a className="skip-link" href="#main-content">
        {t.common.skipLink}
      </a>
      <AlertBar text={t.common.marquee} />
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main id="main-content" tabIndex={-1}>
        {isFreeFeed ? <FreeFeedPage locale={locale} /> : <HomePage locale={locale} />}
      </main>
      <SiteFooter locale={locale} />
      <ExitIntentModal locale={locale} />
    </FxProvider>
  );
}
