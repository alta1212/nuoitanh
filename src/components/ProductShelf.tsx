import { useState } from "react";
import { productMerit } from "../data/fund";
import { categoryOrder, productNotes, type CategoryId } from "../data/product-notes";
import { products, type Product } from "../data/products";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

function ProductThumb({ product }: { product: Product }) {
  const [failed, setFailed] = useState(!product.image);
  return failed ? (
    <span aria-hidden="true">🛍️</span>
  ) : (
    <img src={product.image} alt="" loading="lazy" onError={() => setFailed(true)} />
  );
}

/** Kệ đồ Shopee: lọc theo loại, mỗi lần mở một món là +50 điểm. */
export default function ProductShelf({
  locale,
  seen,
  onOpen,
}: {
  locale: Locale;
  seen: readonly string[];
  onOpen: (url: string) => void;
}) {
  const t = messages[locale].free;
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  const available = categoryOrder.filter((category) =>
    products.some((product) => productNotes[product.url]?.category === category),
  );
  const shown = products.filter(
    (product) => filter === "all" || productNotes[product.url]?.category === filter,
  );

  return (
    <>
      <div className="filters" role="group" aria-label={t.categoriesLabel}>
        {(["all", ...available] as const).map((category) => (
          <button
            className={`chip${filter === category ? " on" : ""}`}
            type="button"
            aria-pressed={filter === category}
            key={category}
            onClick={() => setFilter(category)}
          >
            {t.categories[category]}
          </button>
        ))}
      </div>
      {shown.length ? (
        <div className="shelf">
          {shown.map((product) => {
            const note = productNotes[product.url]?.note;
            return (
              <div
                className={`item${seen.includes(product.url) ? " seen" : ""}`}
                key={product.url}
              >
                <span className="tag">
                  +{productMerit}
                </span>
                <div className="ph">
                  <ProductThumb product={product} />
                </div>
                <div className="body">
                  <h4>{product.title}</h4>
                  <span className="why">
                    {note ? `“${t.notes[note as keyof typeof t.notes]}”` : product.description}
                  </span>
                  <a
                    className="btn ghost"
                    href={product.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={() => onOpen(product.url)}
                  >
                    {t.viewProduct}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="muted">{t.emptyProducts}</p>
      )}
    </>
  );
}
