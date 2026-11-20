import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = messages[locale].common;

  return (
    <footer>
      <div className="wrap">
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {t.footerRights}
        </p>
        <p>{t.footerAddress}</p>
      </div>
    </footer>
  );
}
