import { useState } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { products, type Product } from "../data/products";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

interface FreeFeedPageProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function ProductImage({
  product,
  fallback,
  loading,
}: {
  product: Product;
  fallback: string;
  loading: string;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">(
    product.image ? "loading" : "error",
  );
  return (
    <span className="product-image" data-state={state}>
      {state !== "error" && (
        <img
          src={product.image}
          alt=""
          loading="lazy"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
      {state === "loading" && <span className="image-loading">{loading}</span>}
      {state === "error" && (
        <span className="product-image-fallback">{fallback}</span>
      )}
    </span>
  );
}

export default function FreeFeedPage({
  locale,
  onLocaleChange,
}: FreeFeedPageProps) {
  const t = messages[locale].feed;
  const common = messages[locale].common;

  return (
    <div className="page free-feed-page">
      <a className="skip-link" href="#main-content">
        {common.skipLink}
      </a>
      <header className="masthead">
        <a className="brand" href="/" aria-label={common.homeLabel}>
          <span className="brand-name">{common.brand}</span>
          <span className="brand-caption">{common.brandCaption}</span>
        </a>
        <nav className="masthead-tools" aria-label={common.navigationLabel}>
          <a className="nav-link" href="/">
            {t.back}
          </a>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </nav>
      </header>
      <main id="main-content" className="feed-main" tabIndex={-1}>
        <section className="feed-intro" aria-labelledby="feed-title">
          <div>
            <p className="shop-note">{t.kicker}</p>
            <h1 id="feed-title">
              {t.titleLine1}
              <br />
              <span>{t.titleLine2}</span>
            </h1>
          </div>
          <div className="feed-intro-copy">
            <p className="lead">{t.lead}</p>
            <p className="affiliate-note">{t.affiliateNote}</p>
          </div>
        </section>
        <section
          className="product-section"
          aria-labelledby="product-list-title"
        >
          <div className="catalog-heading">
            <h2 id="product-list-title">{t.productListLabel}</h2>
            <span>{t.newTabNote}</span>
          </div>
          {products.length ? (
            <div className="product-grid">
              {products.map((product, index) => (
                <a
                  className="product-card"
                  href={product.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  key={product.url}
                >
                  <ProductImage
                    product={product}
                    fallback={t.imageUnavailable}
                    loading={t.imageLoading}
                  />
                  <span className="product-copy">
                    <span className="product-label">
                      {String(index + 1).padStart(2, "0")} / {t.productLabel}
                    </span>
                    <h3>{product.title}</h3>
                    <span className="product-description">
                      {product.description}
                    </span>
                    <span className="product-action">
                      {t.viewProduct}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="catalog-empty">
              {t.emptyProducts} <a href="/">{t.back}</a>
            </p>
          )}
        </section>
      </main>
      <footer className="shop-footer">
        <p>{t.footerNote}</p>
        <span>{common.footerNote}</span>
      </footer>
    </div>
  );
}
