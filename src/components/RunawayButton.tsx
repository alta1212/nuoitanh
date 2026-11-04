import { useEffect, useRef, useState } from "react";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import { goDonate } from "../utils/navigation";
import Modal from "./Modal";

/** Nút "Không ủng hộ" biết chạy trốn. */
export default function RunawayButton({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const texts = t.noTexts;
  const textCount = texts.length;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    const button = buttonRef.current!;

    function flee(event: Event) {
      if (event.type === "touchstart") event.preventDefault();
      const rect = button.getBoundingClientRect();
      if (!button.classList.contains("fleeing")) {
        button.style.left = `${rect.left}px`;
        button.style.top = `${rect.top}px`;
        button.classList.add("fleeing");
        void button.offsetWidth;
      }
      const pad = 16;
      let x: number;
      let y: number;
      let tries = 0;
      do {
        x = pad + Math.random() * (innerWidth - rect.width - pad * 2);
        y = 80 + Math.random() * (innerHeight - rect.height - 100);
        tries++;
      } while (tries < 10 && Math.hypot(x - rect.left, y - rect.top) < 160);
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
      setTextIndex((index) => (index + 1) % textCount || 1);
    }

    function reset() {
      button.classList.remove("fleeing");
      button.style.left = "";
      button.style.top = "";
      setTextIndex(0);
    }

    // Listener gốc: touchstart của React là passive nên không preventDefault được.
    button.addEventListener("mouseenter", flee);
    button.addEventListener("touchstart", flee, { passive: false });
    addEventListener("resize", reset);
    return () => {
      button.removeEventListener("mouseenter", flee);
      button.removeEventListener("touchstart", flee);
      removeEventListener("resize", reset);
    };
  }, [textCount]);

  return (
    <>
      <button
        className="btn btn-no"
        type="button"
        ref={buttonRef}
        onClick={() => setCaught(true)}
      >
        {texts[textIndex]}
      </button>
      {caught && (
        <Modal
          big="🚫"
          title={t.noModalTitle}
          text={t.noModalText}
          onClose={() => setCaught(false)}
        >
          <button
            className="btn btn-red"
            type="button"
            style={{ justifyContent: "center" }}
            onClick={() => {
              setCaught(false);
              goDonate();
            }}
          >
            {t.noModalOk}
          </button>
        </Modal>
      )}
    </>
  );
}
