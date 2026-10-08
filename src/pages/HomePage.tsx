import { useState } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import MealQr from "../components/MealQr";
import { products } from "../data/products";
import { messages } from "../i18n";
import {
  formatAmountInput,
  normalizeAmountInput,
  parseAmount,
} from "../utils/amount";
import { formatCurrency, type Locale } from "../utils/locale";

const amounts = [15_000, 35_000, 50_000];
const accountNumber = "1212141000";
const qrBase = `https://img.vietqr.io/image/TCB-${accountNumber}-compact.png`;

interface HomePageProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function HomePage({ locale, onLocaleChange }: HomePageProps) {
  const [freeStatus, setFreeStatus] = useState<"ready" | "opened" | "error">(
    "ready",
  );
  const [preset, setPreset] = useState(50_000);
  const [customAmount, setCustomAmount] = useState("");
  const [copyStatus, setCopyStatus] = useState<"ready" | "copied" | "error">(
    "ready",
  );
  const t = messages[locale].home;
  const common = messages[locale].common;
  const amount = customAmount ? parseAmount(customAmount) : preset;
  const error = amount === null;
  const amountMessage = error
    ? Number(customAmount) < 2_000
      ? t.amountTooSmall
      : t.amountTooLarge
    : t.amountCurrent.replace("{amount}", formatCurrency(amount, locale));
  const menuNames = [t.menuSnack, t.menuMeal, t.menuFull];
  const menuDescriptions = [
    t.menuSnackDescription,
    t.menuMealDescription,
    t.menuFullDescription,
  ];
  const selectedMeal = customAmount
    ? t.customMeal
    : menuNames[amounts.indexOf(preset)];

  function feedForFree() {
    if (!products.length) {
      setFreeStatus("error");
      return;
    }
    const randomValue = new Uint32Array(1);
    crypto.getRandomValues(randomValue);
    const tab = window.open("about:blank", "_blank");
    if (!tab) {
      setFreeStatus("error");
      return;
    }
    tab.opener = null;
    tab.location.href = products[randomValue[0] % products.length].url;
    setFreeStatus("opened");
  }

  function selectAmount(value: number) {
    setPreset(value);
    setCustomAmount("");
  }

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  const qrUrl =
    amount === null
      ? ""
      : `${qrBase}?amount=${amount}&addInfo=${encodeURIComponent("Moi Tanh an com")}`;

  return (
    <div className="page">
      <a className="skip-link" href="#main-content">
        {common.skipLink}
      </a>
      <header className="masthead">
        <a className="brand" href="/" aria-label={common.homeLabel}>
          <span className="brand-name">{common.brand}</span>
          <span className="brand-caption">{common.brandCaption}</span>
        </a>
        <nav className="masthead-tools" aria-label={common.navigationLabel}>
          <a className="nav-link" href="/free-feed">
            {common.freeNav}
          </a>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="shop-intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="shop-note">{t.kicker}</p>
            <h1 id="page-title">
              {t.titleLine1}
              <br />
              <span>{t.titleLine2}</span>
            </h1>
            <p className="lead">{t.lead}</p>
            <div className="intro-actions">
              <a className="action action-primary" href="#menu">
                {t.inviteMeal}
              </a>
              <button
                className="action action-secondary"
                type="button"
                onClick={feedForFree}
              >
                {t.openRandom}
              </button>
            </div>
            <p className="free-caption">
              {t.freeDescription} <a href="/free-feed">{t.chooseProduct}</a>
            </p>
            <p
              className="status"
              aria-live="polite"
              data-error={freeStatus === "error" || undefined}
            >
              {freeStatus === "ready"
                ? t.statusReady
                : freeStatus === "opened"
                  ? t.statusOpened
                  : t.statusError}
            </p>
          </div>
          <figure className="meal-illustration">
            <img
              src="/images/com.svg"
              width="620"
              height="560"
              alt={t.mealAlt}
              fetchPriority="high"
            />
            <figcaption>{t.mealCaption}</figcaption>
          </figure>
        </section>
        <section className="counter" id="menu" aria-labelledby="menu-title">
          <div className="menu-panel">
            <div className="section-heading">
              <p className="section-label">{t.menuLabel}</p>
              <h2 id="menu-title">{t.menuTitle}</h2>
              <p>{t.menuDescription}</p>
            </div>
            <fieldset className="amount-picker">
              <legend className="sr-only">{t.amountLegend}</legend>
              <div className="menu-options">
                {amounts.map((value, index) => (
                  <button
                    className="menu-option"
                    type="button"
                    aria-pressed={preset === value && !customAmount}
                    onClick={() => selectAmount(value)}
                    key={value}
                  >
                    <span className="menu-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="menu-item-copy">
                      <span className="menu-item-name">{menuNames[index]}</span>
                      <span className="menu-item-description">
                        {menuDescriptions[index]}
                      </span>
                    </span>
                    <span className="menu-leader" aria-hidden="true" />
                    <span className="menu-price">
                      {formatCurrency(value, locale)}
                    </span>
                    <span className="selection-mark" aria-hidden="true">
                      {preset === value && !customAmount ? "✓" : "+"}
                    </span>
                  </button>
                ))}
              </div>
              <div className="custom-amount">
                <label htmlFor="custom-amount">{t.customAmountLabel}</label>
                <div className="amount-input-wrap">
                  <input
                    id="custom-amount"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={t.amountPlaceholder}
                    aria-describedby="amount-message"
                    aria-invalid={error || undefined}
                    value={formatAmountInput(
                      customAmount,
                      locale === "vi" ? "." : ",",
                    )}
                    onChange={(event) =>
                      setCustomAmount(normalizeAmountInput(event.target.value))
                    }
                  />
                  <span aria-hidden="true">VND</span>
                </div>
                <p
                  className="amount-message"
                  id="amount-message"
                  data-error={error || undefined}
                  aria-live="polite"
                >
                  {amountMessage}
                </p>
              </div>
            </fieldset>
            <aside className="free-menu">
              <div>
                <p className="section-label">{t.freeLabel}</p>
                <h3>{t.freeTitle}</h3>
              </div>
              <a className="free-menu-link" href="/free-feed">
                {t.freeMenuAction}
              </a>
              <p>{t.affiliateNote}</p>
            </aside>
          </div>
          <div className="receipt" aria-labelledby="qr-title">
            <div className="receipt-heading">
              <span>{common.brand}</span>
              <p>{t.receiptCaption}</p>
            </div>
            <h2 id="qr-title">{t.qrTitle}</h2>
            <dl className="receipt-summary">
              <div>
                <dt>{t.mealLabel}</dt>
                <dd>{selectedMeal}</dd>
              </div>
              <div>
                <dt>{t.guestLabel}</dt>
                <dd>Tanh</dd>
              </div>
              <div className="receipt-total">
                <dt>{t.totalLabel}</dt>
                <dd>
                  {amount === null
                    ? t.invalidAmount
                    : formatCurrency(amount, locale)}
                </dd>
              </div>
            </dl>
            {amount === null ? (
              <p className="qr-invalid" role="status">
                {t.qrInvalid}
              </p>
            ) : (
              <MealQr key={qrUrl} url={qrUrl} locale={locale} />
            )}
            <dl className="bank-line" aria-label={t.bankInfoLabel}>
              <div>
                <dt>{t.bank}</dt>
                <dd>Techcombank</dd>
              </div>
              <div>
                <dt>{t.accountNumber}</dt>
                <dd className="account-number">{accountNumber}</dd>
              </div>
              <div>
                <dt>{t.recipient}</dt>
                <dd>Nguyễn Tuấn Anh</dd>
              </div>
            </dl>
            <button
              className="copy-account"
              type="button"
              onClick={copyAccount}
            >
              {copyStatus === "copied" ? t.copiedAccount : t.copyAccount}
            </button>
            <p className="copy-status" aria-live="polite">
              {copyStatus === "error" ? t.copyError : ""}
            </p>
            <p className="receipt-thanks">{t.receiptThanks}</p>
          </div>
        </section>
      </main>
      <footer className="shop-footer">
        <p>{t.disclaimer}</p>
        <span>{common.footerNote}</span>
      </footer>
    </div>
  );
}
