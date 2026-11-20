import { useSadMusic } from "../hooks/useSadMusic";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import { useFx } from "./FxProvider";
import LanguageSwitcher from "./LanguageSwitcher";

interface SiteHeaderProps {
  locale: Locale;
  /** Trang 0đ: thay tên quỹ bằng link quay lại, và không có nhạc nền. */
  freeFeed?: boolean;
  onLocaleChange: (locale: Locale) => void;
}

export default function SiteHeader({ locale, freeFeed, onLocaleChange }: SiteHeaderProps) {
  const t = messages[locale].common;
  const free = messages[locale].free;
  const { toast } = useFx();
  const { playing, toggle } = useSadMusic();

  function onMusicClick() {
    try {
      if (toggle()) toast(t.musicToast);
    } catch {
      toast(t.musicError);
    }
  }

  return (
    <header className="bar">
      {freeFeed ? (
        <a className="brand" href="/" aria-label={t.homeLabel}>
          {free.back}
        </a>
      ) : (
        <a className="brand" href="/" aria-label={t.homeLabel}>
          {t.brand}
        </a>
      )}
      <nav className="bar-tools" aria-label={t.navigationLabel}>
        {freeFeed ? (
          <span>{free.barNote}</span>
        ) : (
          <button
            className={`ghost-btn${playing ? " on" : ""}`}
            type="button"
            title={t.musicTitle}
            aria-pressed={playing}
            onClick={onMusicClick}
          >
            <span aria-hidden="true">🎻</span>
            <span className="eq" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{playing ? t.musicOff : t.musicOn}</span>
          </button>
        )}
        <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
      </nav>
    </header>
  );
}
