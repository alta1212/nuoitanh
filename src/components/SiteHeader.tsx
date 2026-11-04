import { useDarkMode } from "../hooks/useDarkMode";
import { useSadMusic } from "../hooks/useSadMusic";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import { useFx } from "./FxProvider";
import LanguageSwitcher from "./LanguageSwitcher";

interface SiteHeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function SiteHeader({ locale, onLocaleChange }: SiteHeaderProps) {
  const t = messages[locale].common;
  const { toast } = useFx();
  const { dark, toggle: toggleDark } = useDarkMode();
  const { playing, toggle: toggleMusic } = useSadMusic();

  function onMusicClick() {
    try {
      if (toggleMusic()) toast(t.musicToast);
    } catch {
      toast(t.musicError);
    }
  }

  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="/" aria-label={t.homeLabel}>
          <div className="seal">QT</div>
          <div>
            <b>
              {t.brandLine1}
              <br />
              {t.brandLine2}
            </b>
            <small>{t.brandCaption}</small>
          </div>
        </a>
        <nav className="nav-actions" aria-label={t.navigationLabel}>
          <button
            className={`icon-btn music${playing ? " on" : ""}`}
            type="button"
            title={t.musicTitle}
            onClick={onMusicClick}
          >
            <span>🎻</span>
            <span className="eq">
              <i />
              <i />
              <i />
            </span>
            <span className="label">{playing ? t.musicOff : t.musicOn}</span>
          </button>
          <button
            className={`icon-btn${dark ? " on" : ""}`}
            type="button"
            title={t.darkTitle}
            onClick={() => {
              if (toggleDark()) toast(t.nightToast);
            }}
          >
            <span>{dark ? "☀️" : "🌙"}</span>
            <span className="label">{dark ? t.dayLabel : t.nightLabel}</span>
          </button>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </nav>
      </div>
    </header>
  );
}
