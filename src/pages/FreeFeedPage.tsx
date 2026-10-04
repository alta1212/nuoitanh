import LanguageSwitcher from "../components/LanguageSwitcher";
import { products } from "../data/products";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

interface FreeFeedPageProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function FreeFeedPage({
  locale,
  onLocaleChange,
}: FreeFeedPageProps) {
  const t = messages[locale].feed;
  const common = messages[locale].common;

  return (
    <div className="page free-feed-page">
      <header className="masthead">
        <a className="brand" href="/">{common.brand}</a>
        <div className="masthead-tools">
          <a className="back-link" href="/">{t.back}</a>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </div>
      </header>
      <main className="feed-main">
        <section className="feed-intro" aria-labelledby="feed-title">
          <p className="kicker">{t.kicker}</p>
          <h1 id="feed-title">{t.titleLine1}<br />{t.titleLine2}</h1>
          <p className="lead">{t.lead}</p>
        </section>
        <section className="product-grid" aria-label={t.productListLabel}>
          {products.map((product) => (
            <a
              className="product-card"
              href={product.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              key={product.url}
            >
              {product.image ? (
                <img src={product.image} alt="" loading="lazy" />
              ) : (
                <span className="product-image-fallback" aria-hidden="true">{common.freeBadge}</span>
              )}
              <span className="product-copy">
                <span className="product-label">{t.productLabel}</span>
                <h2>{product.title}</h2>
                <span className="product-description">{product.description}</span>
              </span>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
