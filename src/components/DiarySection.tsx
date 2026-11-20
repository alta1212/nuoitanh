import { useEffect, useMemo, useRef, useState } from "react";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

/** Nhật ký một tháng + ba con số tự đếm lên khi cuộn tới. */
export default function DiarySection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const targets = useMemo(
    () => t.stats.map((stat) => (/^\d+$/.test(stat.value) ? Number(stat.value) : null)),
    [t],
  );
  const ref = useRef<HTMLDivElement>(null);
  // null: hiện luôn số thật (lúc prerender và khi khách giảm chuyển động).
  const [counts, setCounts] = useState<(number | null)[] | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setCounts(targets.map((target) => (target === null ? null : 0)));
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [targets]);

  useEffect(() => {
    if (!counts) return;
    const running = counts.some(
      (count, index) => count !== null && count < (targets[index] ?? 0),
    );
    if (!running) return;
    const timer = window.setTimeout(() => {
      setCounts((current) =>
        (current ?? []).map((count, index) => {
          const target = targets[index];
          if (count === null || target === null) return count;
          return Math.min(target, count + Math.max(1, Math.ceil(target / 40)));
        }),
      );
    }, 28);
    return () => clearTimeout(timer);
  }, [counts, targets]);

  return (
    <section>
      <div className="wrap narrow" ref={ref}>
        <div className="label">{t.diaryLabel}</div>
        <h2>
          {t.diaryTitle1}
          <br />
          {t.diaryTitle2}
        </h2>
        <div className="diary">
          {t.diary.map((entry, index) => (
            <div
              className={`entry${index === t.diary.length - 1 ? " last" : ""}`}
              key={entry.day}
            >
              <div className="d">{entry.day}</div>
              <div className="t">{entry.text}</div>
            </div>
          ))}
        </div>
        <div className="stats">
          {t.stats.map((stat, index) => {
            const count = counts?.[index];
            return (
              <div className="stat" key={stat.label}>
                <b>{count === null || count === undefined ? stat.value : count}</b>
                <span>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
