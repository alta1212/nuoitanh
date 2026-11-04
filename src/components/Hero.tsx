import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import { freePagePath } from "../utils/navigation";
import RunawayButton from "./RunawayButton";
import VictimPhoto from "./VictimPhoto";

export default function Hero({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <div className="hero">
      <div className="hero-grid">
        <div>
          <div className="kicker">
            <i />
            {t.kicker}
          </div>
          <h1>
            <span className="day-title">
              {t.dayTitleBefore}
              <em>{t.dayTitleEm}</em>
              {t.dayTitleAfter}
            </span>
            <span className="night-title">
              {t.nightTitleBefore}
              <em>{t.nightTitleEm}</em>
            </span>
          </h1>
          <div className="growl">{t.growl}</div>
          <p className="lede">
            {t.ledeBefore}
            <b>{t.ledeBold}</b>
            {t.ledeAfter}
          </p>
          <div className="stats">
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <a className="btn btn-red" href="#donate">
              {t.ctaDonate}
            </a>
            <a className="btn btn-ghost" href={freePagePath}>
              {t.ctaFree}
            </a>
            <RunawayButton locale={locale} />
          </div>
        </div>
        <VictimPhoto locale={locale} />
      </div>
    </div>
  );
}
