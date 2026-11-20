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
    <>
      <div className="prog">
        <i style={{ width: `${Math.max(percent, 0.6)}%` }} />
      </div>
      <div className="prog-meta">
        <span>
          {t.raisedLabel} {formatCurrency(fund.raised, locale)} · {" "}
          {t.percentReached.replace("{percent}", percentText)}
        </span>
        <span>
          {t.goalLabel} {formatCurrency(fund.goal, locale)}
        </span>
      </div>
    </>
  );
}
