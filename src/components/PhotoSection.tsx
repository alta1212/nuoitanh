import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import Reveal from "./Reveal";
import VictimPhoto from "./VictimPhoto";

export default function PhotoSection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <section id="story">
      <Reveal className="wrap narrow photo-row">
        <VictimPhoto locale={locale} />
        <div className="photo-text">
          <div className="label">{t.photoLabel}</div>
          <p>{t.photoText1}</p>
          <p>{t.photoText2}</p>
        </div>
      </Reveal>
    </section>
  );
}
