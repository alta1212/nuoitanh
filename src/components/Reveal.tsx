import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hiện dần khi cuộn tới. Class được gắn trong effect nên HTML prerender
 * vẫn hiển thị đầy đủ cho bot và cho khách tắt JavaScript.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.classList.remove("reveal", "in");
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
