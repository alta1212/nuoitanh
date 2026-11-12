import { useEffect, useState, type MouseEvent } from "react";
import { useFx } from "../components/FxProvider";
import TaskCard from "../components/TaskCard";
import { productMerit, tasks } from "../data/fund";
import { products, type Product } from "../data/products";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

function ProductThumb({ product }: { product: Product }) {
  const [failed, setFailed] = useState(!product.image);
  return failed ? (
    <>🛍️</>
  ) : (
    <img src={product.image} alt="" loading="lazy" onError={() => setFailed(true)} />
  );
}

export default function FreeFeedPage({ locale }: { locale: Locale }) {
  const t = messages[locale].free;
  const { toast, burst } = useFx();
  const [done, setDone] = useState<ReadonlySet<string>>(new Set());
  const [merit, setMerit] = useState(0);
  // HTML prerender dùng sản phẩm đầu tiên; chọn ngẫu nhiên sau khi hydrate để không lệch.
  const [randomProduct, setRandomProduct] = useState(products[0]?.url);
  useEffect(() => {
    setRandomProduct(products[Math.floor(Math.random() * products.length)]?.url);
  }, []);

  const visibleTasks = tasks.filter(
    (task) => task.url && (task.url !== "random-product" || randomProduct),
  );

  function complete(key: string, points: number, event: MouseEvent, silent = false) {
    if (done.has(key)) return;
    setDone(new Set(done).add(key));
    setMerit(merit + points);
    burst(20, event);
    if (!silent) toast(t.meritToast.replace("{merit}", String(points)));
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/`);
      toast(t.shareCopied);
    } catch {
      toast(t.shareError);
    }
  }

  const meritLabel = (points: number) => t.meritLabel.replace("{merit}", String(points));

  return (
    <div className="wrap">
      <div className="free-hero">
        <a href="/" className="link-btn" style={{ fontSize: 14 }}>
          {t.back}
        </a>
        <div className="kicker" style={{ marginTop: 18 }}>
          <i />
          {t.kicker}
        </div>
        <h1>
          {t.titleBefore}
          <em>{t.titleEm}</em>
        </h1>
        <p className="lede">{t.lede}</p>
        <div className="merit">
          {t.meritCounter} <b>{merit.toLocaleString(locale === "vi" ? "vi-VN" : "en-US")}</b>
        </div>
      </div>

      <div className="tasks">
        {visibleTasks.map((task) => {
          const copy = t.tasks[task.id];
          const isShare = task.url === "share";
          return (
            <TaskCard
              key={task.id}
              icon={task.icon}
              title={copy.title}
              description={copy.desc}
              meritLabel={meritLabel(task.merit)}
              cta={copy.cta}
              done={done.has(task.id)}
              href={
                isShare
                  ? undefined
                  : task.url === "random-product"
                    ? randomProduct
                    : task.url
              }
              onActivate={(event) => {
                if (isShare) void share();
                complete(task.id, task.merit, event, isShare);
              }}
            />
          );
        })}
      </div>

      <h2 className="sec-title products-title">{t.productsTitle}</h2>
      <p className="sec-sub">{t.productsSub}</p>
      {products.length ? (
        <div className="tasks">
          {products.map((product) => (
            <TaskCard
              key={product.url}
              icon={<ProductThumb product={product} />}
              title={product.title}
              description={product.description}
              clampDescription
              meritLabel={meritLabel(productMerit)}
              cta={t.viewProduct}
              done={done.has(product.url)}
              href={product.url}
              onActivate={(event) => complete(product.url, productMerit, event)}
            />
          ))}
        </div>
      ) : (
        <p className="sec-sub">{t.emptyProducts}</p>
      )}

      <div className="disclaimer">
        ℹ️ <b>{t.disclaimerBold}</b> {t.disclaimerText}
      </div>
      <div style={{ textAlign: "center", margin: "34px 0 10px" }}>
        <p style={{ color: "var(--muted)", margin: "0 0 12px" }}>{t.backToQrQuestion}</p>
        <a className="btn btn-red" href="/#donate">
          {t.backToQr}
        </a>
      </div>
    </div>
  );
}
