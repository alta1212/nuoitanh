import { useEffect, useState, type MouseEvent } from "react";
import { useFx } from "../components/FxProvider";
import HoldCandleButton from "../components/HoldCandleButton";
import MeritMeter from "../components/MeritMeter";
import MeritReceipt from "../components/MeritReceipt";
import ProductShelf from "../components/ProductShelf";
import Reveal from "../components/Reveal";
import TaskCard from "../components/TaskCard";
import { productMerit, tasks } from "../data/fund";
import { products } from "../data/products";
import { useMerit } from "../hooks/useMerit";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

export default function FreeFeedPage({ locale }: { locale: Locale }) {
  const t = messages[locale].free;
  const { toast, burst } = useFx();
  const { merit, add, markSeen } = useMerit();
  // HTML prerender dùng sản phẩm đầu tiên; chọn ngẫu nhiên sau khi hydrate để không lệch.
  const [randomProduct, setRandomProduct] = useState(products[0]?.url);

  useEffect(() => {
    setRandomProduct(products[Math.floor(Math.random() * products.length)]?.url);
  }, []);

  const visibleTasks = tasks.filter(
    (task) => task.url && (task.url !== "random-product" || randomProduct),
  );

  function reward(key: string, points: number, once: boolean, event?: MouseEvent) {
    if (!add(key, points, once)) {
      toast(t.alreadyDone);
      return;
    }
    burst(Math.min(40, 8 + Math.round(points / 8)), event);
    toast(t.meritToast.replace("{merit}", String(points)));
  }

  async function share(points: number) {
    const data = {
      title: t.shareTitle,
      text: t.shareText,
      url: `${window.location.origin}/`,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        toast(t.shareCopied);
      }
    } catch (error) {
      // Khách tự bấm huỷ hộp chia sẻ thì im lặng, lỗi thật mới nhắc.
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        toast(t.shareError);
      }
      return;
    }
    reward("share", points, true);
  }

  const meritLabel = (points: number) => t.meritLabel.replace("{merit}", String(points));

  return (
    <>
      <div className="wrap narrow free-hero">
        <div className="label">{t.label}</div>
        <h1>
          {t.title1}
          <br />
          {t.title2}
          <em>{t.titleEm}</em>
          {t.titleAfter}
        </h1>
        <p className="sub">{t.sub}</p>
      </div>

      <MeritMeter locale={locale} points={merit.points} />

      <section>
        <Reveal className="wrap">
          <div className="label">{t.tasksLabel}</div>
          <h2>{t.tasksTitle}</h2>
          <div className="tasks">
            {visibleTasks.map((task) => {
              const copy = t.tasks[task.id];
              const done = Boolean(merit.log[task.id]);
              return (
                <TaskCard
                  key={task.id}
                  icon={task.icon}
                  title={copy.title}
                  description={copy.desc}
                  meritLabel={meritLabel(task.merit)}
                  done={done}
                >
                  {task.url === "share" ? (
                    <button
                      className="btn main"
                      type="button"
                      onClick={() => void share(task.merit)}
                    >
                      {copy.cta}
                    </button>
                  ) : task.url === "candle" ? (
                    <HoldCandleButton
                      locale={locale}
                      lit={done}
                      onLit={() => reward(task.id, task.merit, true)}
                      onAlready={() => toast(t.candleAlready)}
                    />
                  ) : (
                    <a
                      className="btn main"
                      href={task.url === "random-product" ? randomProduct : task.url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      onClick={(event) => reward(task.id, task.merit, true, event)}
                    >
                      {copy.cta}
                    </a>
                  )}
                </TaskCard>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal className="wrap">
          <div className="label">{t.shelfLabel}</div>
          <h2>
            {t.shelfTitle1}
            <br />
            {t.shelfTitle2}
            <em>{t.shelfTitleEm}</em>
            {t.shelfTitleAfter}
          </h2>
          <p className="muted">
            {t.shelfSub.replace("{merit}", String(productMerit))}
          </p>
          <ProductShelf
            locale={locale}
            seen={merit.seen}
            onOpen={(url) => {
              if (!markSeen(url)) return;
              reward("shelf", productMerit, false);
            }}
          />
          <div className="disclose">
            <b>{t.disclaimerBold}</b> {t.disclaimerText}
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal className="wrap">
          <MeritReceipt locale={locale} merit={merit} />
        </Reveal>
      </section>

      <section>
        <Reveal className="wrap narrow end">
          <div className="label">{t.endLabel}</div>
          <h2>
            {t.endTitle1}
            <br />
            {t.endTitle2}
            <em>{t.endTitleEm}</em>
            {t.endTitleAfter}
          </h2>
          <p className="muted">{t.endSub}</p>
          <div className="btns">
            <a className="btn main" href="/#donate">
              {t.endDonate}
            </a>
            <a className="btn ghost" href="/">
              {t.endHome}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
