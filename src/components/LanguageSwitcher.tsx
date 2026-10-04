import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

interface LanguageSwitcherProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export default function LanguageSwitcher({
  locale,
  onChange,
}: LanguageSwitcherProps) {
  const common = messages[locale].common;

  return (
    <div className="language-switcher" role="group" aria-label={common.languageLabel}>
      <button
        type="button"
        aria-label={common.vietnamese}
        aria-pressed={locale === "vi"}
        onClick={() => onChange("vi")}
      >
        VI
      </button>
      <button
        type="button"
        aria-label={common.english}
        aria-pressed={locale === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}
