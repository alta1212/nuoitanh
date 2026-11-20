import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import Reveal from "./Reveal";

const medals = ["🥇", "🥈", "🥉"];

export default function DonorBoard({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <section>
      <Reveal className="wrap narrow">
        <div className="label">{t.donorsLabel}</div>
        <h2>
          {t.donorsTitle1}
          <br />
          {t.donorsTitle2}
        </h2>
        <p className="muted" style={{ marginBottom: 30 }}>
          {t.donorsSub}
        </p>
        <div className="hof">
          {t.donors.map((donor, index) => (
            <div className="donor" key={donor.name}>
              <span className="medal" aria-hidden="true">
                {medals[index] ?? "🎖️"}
              </span>
              <div>
                <b>{donor.name}</b>
                <q>{donor.note}</q>
              </div>
              <span className="gift">{donor.gift}</span>
            </div>
          ))}
          <div className="donor you">
            <span className="medal" aria-hidden="true">
              🕯️
            </span>
            <div>
              <b>{t.donorYouName}</b>
              <q>{t.donorYouNote}</q>
            </div>
            <a className="gift" href="#donate">
              {t.donorYouAction}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
