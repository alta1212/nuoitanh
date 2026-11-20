import { meritSteps } from "../data/fund";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

/** Thanh công đức dính trên đầu trang 0đ: điểm, danh hiệu, và năm ngọn nến. */
export default function MeritMeter({
  locale,
  points,
}: {
  locale: Locale;
  points: number;
}) {
  const t = messages[locale].free;
  let level = 0;
  while (level + 1 < meritSteps.length && points >= meritSteps[level + 1]) level++;

  const nextStep = meritSteps[level + 1];
  const nextLabel =
    nextStep === undefined
      ? t.maxLevel
      : t.nextLevel
          .replace("{points}", String(nextStep - points))
          .replace("{level}", t.levels[level + 1]);
  const low = meritSteps[level];
  const percent =
    nextStep === undefined ? 100 : ((points - low) / (nextStep - low)) * 100;

  return (
    <div className="merit" aria-live="polite">
      <div className="wrap">
        <div className="pts">
          {points.toLocaleString(locale === "vi" ? "vi-VN" : "en-US")}
          <small>{t.meritUnit}</small>
        </div>
        <div className="meter-box">
          <div
            className="meter"
            role="progressbar"
            aria-label={t.meritAria}
            aria-valuenow={points}
          >
            <i style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
          </div>
          <div className="lvl">
            {t.levelLabel} <b>{t.levels[level]}</b> · {nextLabel}
          </div>
        </div>
        <div className={`flames${level > 0 ? " lit" : ""}`} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((index) => (
            <span key={index} style={{ opacity: index <= level - 1 ? 1 : 0.25 }}>
              🕯️
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
