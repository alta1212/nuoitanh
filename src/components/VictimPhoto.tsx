import { useState } from "react";
import { fund } from "../data/fund";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

/** Polaroid đã che mặt, kèm hai giọt nước mắt. */
export default function VictimPhoto({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <figure className="polaroid">
      <div className="img">
        {fund.avatar && !avatarFailed ? (
          <img src={fund.avatar} alt={t.victimAlt} onError={() => setAvatarFailed(true)} />
        ) : null}
      </div>
      <div className="censor">{t.photoBar}</div>
      <span className="tear" aria-hidden="true" />
      <span className="tear right" aria-hidden="true" />
      <figcaption className="cap">{t.photoCaption}</figcaption>
    </figure>
  );
}
