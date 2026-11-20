import { useEffect, useRef, useState } from "react";
import { defaultTier, fund, tiers, type TierId } from "../data/fund";
import { messages } from "../i18n";
import { formatAmountInput, normalizeAmountInput, parseAmount } from "../utils/amount";
import { formatCurrency, type Locale } from "../utils/locale";
import { freePagePath } from "../utils/navigation";
import { useFx } from "./FxProvider";
import MealQr from "./MealQr";
import ProgressCard from "./ProgressCard";
import RefuseFlow from "./RefuseFlow";
import Reveal from "./Reveal";

const qrBase = `https://img.vietqr.io/image/${fund.bankCode}-${fund.accountNo}-compact.png`;

function buildQrUrl(amount: number) {
  const memo = `addInfo=${encodeURIComponent(fund.memo)}`;
  return amount > 0 ? `${qrBase}?amount=${amount}&${memo}` : `${qrBase}?${memo}`;
}

export default function DonateSection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const { toast, burst } = useFx();
  const [tierId, setTierId] = useState<TierId | null>(defaultTier);
  const [custom, setCustom] = useState("");
  const customTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(customTimer.current), []);

  const tier = tiers.find(({ id }) => id === tierId);
  // null: đang nhập dở dưới mức tối thiểu; 0: tùy tâm, người chuyển tự điền số tiền.
  const amount = custom ? parseAmount(custom) : (tier?.amount ?? 0);
  const typed = Number(custom) || 0;
  const amountText =
    amount === null
      ? formatCurrency(typed, locale)
      : amount > 0
        ? formatCurrency(amount, locale)
        : t.customAny;

  function onCustomInput(value: string) {
    const digits = normalizeAmountInput(value).slice(0, 10);
    setCustom(digits);
    setTierId(null);
    clearTimeout(customTimer.current);
    const next = parseAmount(digits);
    if (next !== null) {
      customTimer.current = window.setTimeout(() => {
        burst(Math.min(90, 10 + Math.round(next / 20_000)));
        toast(t.customToast);
      }, 700);
    }
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast(t.copied.replace("{value}", value));
    } catch {
      toast(t.copyError);
    }
  }

  return (
    <section id="donate">
      <Reveal className="wrap narrow">
        <div className="label">{t.donateLabel}</div>
        <h2>
          {t.donateTitle1}
          <br />
          {t.donateTitle2}
          <em>{t.donateTitleEm}</em>
          {t.donateTitle3}
        </h2>

        <ProgressCard locale={locale} />

        <div className="tiers" role="radiogroup" aria-label={t.tiersLabel}>
          {tiers.map((item) => (
            <button
              className={`tier${item.id === tierId ? " sel" : ""}`}
              type="button"
              role="radio"
              aria-checked={item.id === tierId}
              key={item.id}
              onClick={(event) => {
                clearTimeout(customTimer.current);
                setTierId(item.id);
                setCustom("");
                toast(t.tiers[item.id].toast);
                burst(item.fx, event);
              }}
            >
              <span className="nm">{t.tiers[item.id].name}</span>
              <span className="amt">{formatCurrency(item.amount, locale)}</span>
              <span className="ds">{t.tiers[item.id].desc}</span>
            </button>
          ))}
        </div>

        <label className="custom">
          {t.customLabel}
          <input
            inputMode="numeric"
            autoComplete="off"
            placeholder={t.customPlaceholder}
            aria-label={t.customPlaceholder}
            value={formatAmountInput(custom, locale === "vi" ? "." : ",")}
            onChange={(event) => onCustomInput(event.target.value)}
          />
          <span>{locale === "vi" ? "đ" : "₫"}</span>
        </label>

        <div className="pay">
          {amount === null ? (
            <div className="qr-box">
              <div className="qr-message" role="status">
                {t.amountTooSmall}
              </div>
            </div>
          ) : (
            <MealQr key={amount} url={buildQrUrl(amount)} locale={locale} />
          )}
          <div className="pay-info">
            <div className="pay-row">
              <span>{t.bank}</span>
              <span className="val">{fund.bankName}</span>
            </div>
            <div className="pay-row">
              <span>{t.accountNumber}</span>
              <span className="val">
                {fund.accountNo}
                <button className="copy" type="button" onClick={() => copy(fund.accountNo)}>
                  {t.copy}
                </button>
              </span>
            </div>
            <div className="pay-row">
              <span>{t.recipient}</span>
              <span className="val">{fund.accountName}</span>
            </div>
            <div className="pay-row">
              <span>{t.memoLabel}</span>
              <span className="val">
                {fund.memo}
                <button className="copy" type="button" onClick={() => copy(fund.memo)}>
                  {t.copy}
                </button>
              </span>
            </div>
            <div className="pay-row">
              <span>{t.amountLabel}</span>
              <span className="val">{amountText}</span>
            </div>
            <p className="pay-note">{t.payNote}</p>
            <p className="qr-caption">{t.qrCaption}</p>
          </div>
        </div>

        <div className="btns">
          <a className="btn ghost" href={freePagePath}>
            {t.freeCta}
          </a>
          <RefuseFlow locale={locale} />
        </div>
      </Reveal>
    </section>
  );
}
