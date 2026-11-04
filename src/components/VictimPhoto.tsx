import { useState } from "react";
import { fund } from "../data/fund";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

export default function VictimPhoto({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <figure className="victim" style={{ margin: 0 }}>
      <div className="note">
        {t.noteLine1}
        <br />
        {t.noteLine2}
      </div>
      <div className="photo">
        {fund.avatar && !avatarFailed ? (
          <img
            src={fund.avatar}
            alt={t.victimAlt}
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <span className="emoji">🥲</span>
        )}
        <div className="bar">{t.photoBar}</div>
      </div>
      <figcaption>
        {t.captionVictim} <b>{fund.nickname}</b> {t.captionAfter}
      </figcaption>
      <div className="stamp">
        {t.stampLine1}
        <br />
        {t.stampLine2}
      </div>
    </figure>
  );
}
