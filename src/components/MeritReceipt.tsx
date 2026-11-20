import { meritSteps } from "../data/fund";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import type { MeritState } from "../hooks/useMerit";

/** Hóa đơn công đức: liệt kê việc tốt, tổng điểm, và quy đổi ra đồ ăn. */
export default function MeritReceipt({
  locale,
  merit,
}: {
  locale: Locale;
  merit: MeritState;
}) {
  const t = messages[locale].free;
  const labels = t.receiptLabels as Record<string, string | undefined>;
  const rows = Object.entries(merit.log);

  let step = 0;
  while (step + 1 < meritSteps.length && merit.points >= meritSteps[step + 1]) step++;

  const message =
    merit.points === 0
      ? t.receiptEmpty
      : merit.points < meritSteps[3]
        ? t.receiptLow
        : t.receiptHigh;

  return (
    <div className="receipt">
      <h3>{t.receiptTitle}</h3>
      <div className="org">
        {t.receiptOrg}
        <br />
        {t.receiptAddress}
      </div>
      {rows.map(([key, points]) => (
        <div className="r" key={key}>
          <span>{labels[key] ?? key}</span>
          <span>{points}</span>
        </div>
      ))}
      <div className="r total">
        <span>{t.receiptTotal}</span>
        <span>{t.receiptPoints.replace("{points}", String(merit.points))}</span>
      </div>
      <div className="r">
        <span>{t.receiptMoney}</span>
        <span>{t.receiptMoneyValue}</span>
      </div>
      <div className="r">
        <span>{t.receiptConvert}</span>
        <span>{t.foods[step]}</span>
      </div>
      <p className="msg">{message}</p>
    </div>
  );
}
