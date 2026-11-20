import { useEffect, useState } from "react";
import { fund } from "../data/fund";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

const pad = (value: number) => String(value).padStart(2, "0");

/** "Bữa no gần nhất cách đây…" — chạy từ lúc khách mở trang. */
export default function HungerClock({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  // Server không biết "bây giờ": render dấu gạch rồi để client đếm tiếp.
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    const start = Date.now() - fund.lastMealSeconds * 1000;
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const text =
    elapsed === null
      ? t.timerPending
      : t.timerFormat
          .replace("{hours}", String(Math.floor(elapsed / 3600)))
          .replace("{minutes}", pad(Math.floor((elapsed % 3600) / 60)))
          .replace("{seconds}", pad(elapsed % 60));

  return (
    <div className="timer">
      {t.timerLabel}&nbsp; <b>{text}</b>
    </div>
  );
}
