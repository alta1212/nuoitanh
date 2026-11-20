import { useEffect, useMemo, useRef, useState } from "react";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

interface Position {
  line: number;
  char: number;
}

/** Lá thư gõ dần như máy chữ khi khách cuộn tới. */
export default function LetterSection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const lines = useMemo(() => [...t.letter, t.letterSign], [t]);
  const ref = useRef<HTMLDivElement>(null);
  // null: hiện đủ cả thư (lúc prerender và khi khách giảm chuyển động).
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setPosition({ line: 0, char: 0 });
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!position) return;
    const line = lines[position.line];
    if (line === undefined) return;
    const atEnd = position.char >= line.length;
    const previous = line[position.char - 1] ?? "";
    const delay = atEnd ? 520 : /[.,—…]/.test(previous) ? 240 : 26;
    const timer = window.setTimeout(() => {
      setPosition(
        atEnd
          ? { line: position.line + 1, char: 0 }
          : { line: position.line, char: position.char + 1 },
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [lines, position]);

  return (
    <section id="letter">
      <div className="wrap narrow" ref={ref}>
        <div className="label">{t.letterLabel}</div>
        <div className="letter">
          {lines.map((line, index) => {
            const visible = !position
              ? line
              : index < position.line
                ? line
                : index === position.line
                  ? line.slice(0, position.char)
                  : "";
            const typingHere = position?.line === index;
            return (
              <p
                className={index === lines.length - 1 ? "sign" : undefined}
                key={line}
              >
                {visible}
                {typingHere ? <span className="cursor">&nbsp;</span> : null}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
