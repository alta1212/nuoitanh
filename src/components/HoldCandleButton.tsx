import { useEffect, useRef, useState } from "react";
import { candleDrainMs, candleHoldMs } from "../data/fund";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

interface HoldCandleButtonProps {
  locale: Locale;
  /** Nến đã thắp trong lần xem trước (đọc từ localStorage). */
  lit: boolean;
  onLit: () => void;
  onAlready: () => void;
}

/** Giữ 3 giây để thắp nến. Buông tay sớm thì lửa tắt dần. */
export default function HoldCandleButton({
  locale,
  lit,
  onLit,
  onAlready,
}: HoldCandleButtonProps) {
  const t = messages[locale].free;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(lit);
  const callbacks = useRef({ onLit, onAlready });
  const [label, setLabel] = useState(lit ? t.candleDone : t.tasks.candle.cta);

  callbacks.current = { onLit, onAlready };

  useEffect(() => {
    doneRef.current = lit;
    if (!lit) return;
    buttonRef.current?.classList.add("lit");
    setLabel(t.candleDone);
  }, [lit, t]);

  useEffect(() => {
    const button = buttonRef.current;
    const fill = fillRef.current;
    if (!button || !fill) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let progress = 0;
    let holding = false;
    let last = 0;
    let frame: number | null = null;
    let resetTimer: number | undefined;

    const stage = (value: number) =>
      value < 0.33
        ? t.candleStages[0]
        : value < 0.66
          ? t.candleStages[1]
          : value < 0.95
            ? t.candleStages[2]
            : t.candleStages[3];

    function finish() {
      doneRef.current = true;
      holding = false;
      frame = null;
      progress = 1;
      button!.classList.remove("holding");
      button!.classList.add("lit");
      setLabel(t.candleDone);
      navigator.vibrate?.(60);
      callbacks.current.onLit();
    }

    function step(time: number) {
      const delta = last ? time - last : 16;
      last = time;
      progress += holding ? delta / candleHoldMs : -delta / candleDrainMs;
      progress = Math.max(0, Math.min(1, progress));
      fill!.style.transform = `scaleX(${progress})`;
      if (holding) setLabel(`${stage(progress)} ${Math.round(progress * 100)}%`);
      if (progress >= 1) {
        finish();
        return;
      }
      if (!holding && progress <= 0) {
        frame = null;
        last = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    }

    function loop() {
      if (frame !== null) return;
      last = 0;
      frame = requestAnimationFrame(step);
    }

    function startHold(event: Event) {
      if (event instanceof KeyboardEvent) {
        if (event.repeat || (event.key !== " " && event.key !== "Enter")) return;
      }
      event.preventDefault();
      if (doneRef.current) {
        callbacks.current.onAlready();
        return;
      }
      // Khách chọn giảm chuyển động: một cú bấm là nến cháy luôn.
      if (reduced) {
        fill!.style.transform = "scaleX(1)";
        finish();
        return;
      }
      clearTimeout(resetTimer);
      holding = true;
      button!.classList.add("holding");
      loop();
    }

    function endHold(event?: Event) {
      if (!holding) return;
      if (
        event instanceof KeyboardEvent &&
        event.key !== " " &&
        event.key !== "Enter"
      ) {
        return;
      }
      holding = false;
      button!.classList.remove("holding");
      if (progress < 1) {
        setLabel(t.candleLetGo);
        button!.classList.remove("shake");
        void button!.offsetWidth;
        button!.classList.add("shake");
        resetTimer = window.setTimeout(() => {
          if (!holding && !doneRef.current) setLabel(t.tasks.candle.cta);
        }, 1400);
      }
      loop();
    }

    const blur = () => endHold();
    const stop = (event: Event) => event.preventDefault();

    button.addEventListener("pointerdown", startHold);
    button.addEventListener("pointerup", endHold);
    button.addEventListener("pointerleave", endHold);
    button.addEventListener("pointercancel", endHold);
    button.addEventListener("keydown", startHold);
    button.addEventListener("keyup", endHold);
    button.addEventListener("blur", blur);
    button.addEventListener("contextmenu", stop);
    button.addEventListener("click", stop);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      clearTimeout(resetTimer);
      button.removeEventListener("pointerdown", startHold);
      button.removeEventListener("pointerup", endHold);
      button.removeEventListener("pointerleave", endHold);
      button.removeEventListener("pointercancel", endHold);
      button.removeEventListener("keydown", startHold);
      button.removeEventListener("keyup", endHold);
      button.removeEventListener("blur", blur);
      button.removeEventListener("contextmenu", stop);
      button.removeEventListener("click", stop);
    };
  }, [t]);

  return (
    <button
      className={`btn ghost hold${lit ? " lit" : ""}`}
      type="button"
      ref={buttonRef}
      aria-label={t.candleAria}
    >
      <span className="fill" ref={fillRef} aria-hidden="true" />
      <span className="txt">{label}</span>
    </button>
  );
}
