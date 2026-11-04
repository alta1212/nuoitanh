import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

const medals = ["🥇", "🥈", "🥉"];

export default function DonorBoard({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <section>
      <h2 className="sec-title">{t.donorsTitle}</h2>
      <p className="sec-sub">{t.donorsSub}</p>
      <div className="donors">
        {t.donors.map((donor, index) => (
          <div className={`donor${index < 3 ? " top" : ""}`} key={donor.name}>
            <div className="rank">{medals[index] ?? "🎖️"}</div>
            <div>
              <b>{donor.name}</b>
              <small>{donor.note}</small>
            </div>
            <div className="money">{donor.amount}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
