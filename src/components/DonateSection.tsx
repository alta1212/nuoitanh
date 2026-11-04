import { useEffect, useRef, useState } from "react";
import { defaultTier, fund, tiers, type TierId } from "../data/fund";
import { messages } from "../i18n";
import {
  formatAmountInput,
  normalizeAmountInput,
  parseAmount,
} from "../utils/amount";
import { formatCurrency, type Locale } from "../utils/locale";
import { freePagePath } from "../utils/navigation";
import { useFx } from "./FxProvider";
import MealQr from "./MealQr";

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
  const label = tier
    ? t.tiers[tier.id].name
    : typed >= 1_000_000
      ? t.customTycoon
      : typed >= 200_000
        ? t.customRare
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
      <h2 className="sec-title">{t.donateTitle}</h2>
      <p className="sec-sub">{t.donateSub}</p>
      <div className="donate">
        <div>
          <div className="tiers">
            {tiers.map((item) => (
              <button
                className={`tier${item.id === tierId ? " active" : ""}`}
                type="button"
                aria-pressed={item.id === tierId}
                key={item.id}
                onClick={(event) => {
                  clearTimeout(customTimer.current);
                  setTierId(item.id);
                  setCustom("");
                  toast(t.tiers[item.id].toast);
                  burst(item.fx, event);
                }}
              >
                <div className="em">{item.em}</div>
                <b>{t.tiers[item.id].name}</b>
                <div className="amt">{formatCurrency(item.amount, locale)}</div>
                <small>{t.tiers[item.id].desc}</small>
              </button>
            ))}
          </div>
          <label className="custom">
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
          <div className="free-cta">
            <p>
              <b>{t.freeCtaBold}</b> {t.freeCtaText}
            </p>
            <a
              className="btn btn-ghost"
              href={freePagePath}
              style={{ padding: "10px 16px", fontSize: 14 }}
            >
              {t.freeCtaAction}
            </a>
          </div>
        </div>
        <div className="qr-side">
          <div className="qr-tier">{label}</div>
          {amount === null ? (
            <div className="qr-box">
              <div className="qr-message" role="status">
                {t.amountTooSmall}
              </div>
            </div>
          ) : (
            <MealQr key={amount} url={buildQrUrl(amount)} locale={locale} />
          )}
          <div className="qr-amount">
            {amount === null
              ? formatCurrency(typed, locale)
              : amount > 0
                ? formatCurrency(amount, locale)
                : t.customAny}
          </div>
          <div className="qr-caption">{t.qrCaption}</div>
          <div className="acct">
            <div>
              <span>{t.bank}</span>
              <b>{fund.bankName}</b>
            </div>
            <div>
              <span>{t.accountNumber}</span>
              <b>
                <span style={{ color: "var(--ink)" }}>{fund.accountNo}</span>
                <button className="copy" type="button" onClick={() => copy(fund.accountNo)}>
                  {t.copy}
                </button>
              </b>
            </div>
            <div>
              <span>{t.recipient}</span>
              <b>{fund.accountName}</b>
            </div>
            <div>
              <span>{t.memoLabel}</span>
              <b>
                <span style={{ color: "var(--ink)" }}>{fund.memo}</span>
                <button className="copy" type="button" onClick={() => copy(fund.memo)}>
                  {t.copy}
                </button>
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
