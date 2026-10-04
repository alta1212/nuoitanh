import { useEffect, useState } from "react";
import { messages } from "./i18n";
import FreeFeedPage from "./pages/FreeFeedPage";
import HomePage from "./pages/HomePage";
import { getInitialLocale, saveLocale } from "./utils/locale";

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const isFreeFeed = window.location.pathname.startsWith("/free-feed");

  useEffect(() => {
    const meta = messages[locale].meta;
    document.documentElement.lang = locale;
    document.title = isFreeFeed ? meta.feedTitle : meta.homeTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    saveLocale(locale);
  }, [isFreeFeed, locale]);

  return isFreeFeed ? (
    <FreeFeedPage locale={locale} onLocaleChange={setLocale} />
  ) : (
    <HomePage locale={locale} onLocaleChange={setLocale} />
  );
}
