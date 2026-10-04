import { useEffect, useState } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { products } from "../data/products";
import { messages } from "../i18n";
import {
  formatAmountInput,
  normalizeAmountInput,
  parseAmount,
} from "../utils/amount";
import { formatCurrency, type Locale } from "../utils/locale";

const amounts = [15_000, 35_000, 50_000];
const qrBase = "https://img.vietqr.io/image/TCB-1212141000-compact.png";

type AmountFeedback = "current" | "minimum" | "tooSmall" | "tooLarge";

interface HomePageProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function HomePage({ locale, onLocaleChange }: HomePageProps) {
  const [status, setStatus] = useState<"ready" | "opened">("ready");
  const [amount, setAmount] = useState(50_000);
  const [customAmount, setCustomAmount] = useState("");
  const [feedback, setFeedback] = useState<AmountFeedback>("current");
  const t = messages[locale].home;
  const common = messages[locale].common;
  const error = feedback === "tooSmall" || feedback === "tooLarge";
  const amountMessage =
    feedback === "current"
      ? t.amountCurrent.replace("{amount}", formatCurrency(amount, locale))
      : {
          minimum: t.amountMinimum,
          tooSmall: t.amountTooSmall,
          tooLarge: t.amountTooLarge,
        }[feedback];

  useEffect(() => {
    if (!customAmount) return;

    const timer = window.setTimeout(() => {
      const value = parseAmount(customAmount);
      if (value === null) {
        setFeedback(Number(customAmount) < 2_000 ? "tooSmall" : "tooLarge");
        return;
      }

      setAmount(value);
      setFeedback("current");
    }, 300);

    return () => window.clearTimeout(timer);
  }, [customAmount]);

  function feedForFree() {
    const randomValue = new Uint32Array(1);
    crypto.getRandomValues(randomValue);
    window.open(
      products[randomValue[0] % products.length].url,
      "_blank",
      "noopener",
    );
    setStatus("opened");
  }

  function selectAmount(value: number) {
    setAmount(value);
    setCustomAmount("");
    setFeedback("current");
  }

  function changeCustomAmount(value: string) {
    const normalized = normalizeAmountInput(value);
    setCustomAmount(normalized);
    setFeedback(normalized ? "current" : "minimum");
  }

  const qrUrl = `${qrBase}?amount=${amount}&addInfo=${encodeURIComponent("cam on da nuoi Tanh")}`;

  return (
    <div className="page">
      <header className="masthead">
        <p className="brand">{common.brand}</p>
        <div className="masthead-tools">
          <p className="record">
            {t.recordLine1}<br />{t.recordLine2}
          </p>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </div>
      </header>
      <main>
        <section className="left" aria-labelledby="page-title">
          <div>
            <p className="kicker">{t.kicker}</p>
            <h1 id="page-title">{t.titleLine1}<br />{t.titleLine2}</h1>
            <p className="lead">{t.lead}</p>
          </div>
          <div className="free-box" data-free-label={common.freeBadge}>
            <p className="section-label">{t.freeLabel}</p>
            <h2>{t.freeTitleLine1}<br />{t.freeTitleLine2}</h2>
            <p>{t.freeDescription}</p>
            <div className="action-row">
              <button className="action" type="button" onClick={feedForFree}>{t.openRandom}</button>
              <a className="action action-secondary" href="/free-feed">{t.chooseProduct}</a>
            </div>
            <p className="status" aria-live="polite">
              {status === "ready" ? t.statusReady : t.statusOpened}
            </p>
          </div>
        </section>
        <section className="qr-panel" aria-labelledby="qr-title">
          <div className="qr-heading">
            <div>
              <p className="section-label">{t.qrLabel}</p>
              <h2 id="qr-title">{t.qrTitle}</h2>
            </div>
            <span className="stamp" aria-label={t.stampLabel}>
              {t.stampLine1}<br />{t.stampLine2}
            </span>
          </div>
          <fieldset className="amount-picker">
            <legend>{t.amountLegend}</legend>
            <div className="amount-options">
              {amounts.map((value) => (
                <button
                  className="amount-option"
                  type="button"
                  aria-pressed={amount === value && !customAmount}
                  onClick={() => selectAmount(value)}
                  key={value}
                >
                  {formatCurrency(value, locale)}
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <input
                type="text"
                inputMode="numeric"
                placeholder={t.amountPlaceholder}
                aria-label={t.customAmountLabel}
                aria-describedby="amount-message"
                aria-invalid={error || undefined}
                value={formatAmountInput(customAmount, locale === "vi" ? "." : ",")}
                onChange={(event) => changeCustomAmount(event.target.value)}
              />
            </div>
            <p className="amount-message" id="amount-message" data-error={error || undefined} aria-live="polite">
              {amountMessage}
            </p>
          </fieldset>
          <a className="qr-link" href={qrUrl} target="_blank" rel="noopener" aria-label={t.openQrLabel}>
            <img src={qrUrl} width="512" height="512" alt={t.qrAlt} />
          </a>
          <div className="bank-line" aria-label={t.bankInfoLabel}>
            <span>{t.bank}</span><strong>Techcombank</strong>
            <span>{t.accountNumber}</span><strong>1212141000</strong>
            <span>{t.recipient}</span><strong>Nguyễn Tuấn Anh</strong>
          </div>
          <p className="disclaimer">{t.disclaimer}</p>
        </section>
      </main>
    </div>
  );
}
