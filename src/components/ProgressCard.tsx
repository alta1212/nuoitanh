import { fund } from "../data/fund";
import { messages } from "../i18n";
import { formatCurrency, type Locale } from "../utils/locale";

export default function ProgressCard({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const percent = (fund.raised / fund.goal) * 100;
  const percentText = percent.toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
    maximumFractionDigits: 4,
  });

  return (
    <div className="progress-card">
      <div className="progress-head">
        <div>
          {t.raisedLabel} <b>{formatCurrency(fund.raised, locale)}</b>
        </div>
        <div style={{ color: "var(--muted)" }}>
          {t.goalLabel}{" "}
          <b style={{ color: "var(--ink)", fontSize: 18 }}>
            {formatCurrency(fund.goal, locale)}
          </b>
        </div>
      </div>
      <div className="bar-outer">
        <div className="bar-inner" style={{ width: `${Math.max(percent, 0.8)}%` }} />
      </div>
      <div className="progress-foot">
        <span>{t.percentReached.replace("{percent}", percentText)}</span>
        <span>{t.timeLeft}</span>
      </div>
    </div>
  );
}
