import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import HungerClock from "./HungerClock";

export default function Hero({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <div className="wrap narrow hero">
      <div className="candle" aria-hidden="true" />
      <div className="kicker">{t.kicker}</div>
      <h1>
        {t.titleLine1}
        <br />
        {t.titleLine2}
        <em>{t.titleEm}</em>
        {t.titleAfter}
      </h1>
      <p className="sub">{t.sub}</p>
      <HungerClock locale={locale} />
      <a className="scroll" href="#story">
        {t.scrollCue}
      </a>
    </div>
  );
}
