import { useEffect, useState } from "react";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import { goDonate } from "../utils/navigation";
import Modal from "./Modal";

/** "Tôi không muốn giúp" → một chuỗi câu nói, mỗi lần một buồn hơn. */
export default function RefuseFlow({ locale }: { locale: Locale }) {
  const t = messages[locale].home;
  const [step, setStep] = useState<number | null>(null);

  // Trời mưa to hơn khi khách từ chối.
  useEffect(() => {
    document.body.classList.toggle("sad", step !== null);
    return () => document.body.classList.remove("sad");
  }, [step]);

  function close() {
    setStep(null);
  }

  return (
    <>
      <button className="link-btn" type="button" onClick={() => setStep(0)}>
        {t.refuse}
      </button>
      {step !== null && t.refuseSteps[step] ? (
        <Modal
          title={t.refuseSteps[step].title}
          text={t.refuseSteps[step].text}
          onClose={close}
        >
          <button
            className="btn main"
            type="button"
            onClick={() => {
              close();
              goDonate();
            }}
          >
            {t.refuseChange}
          </button>
          <button
            className="btn ghost shrink"
            type="button"
            style={{ transform: `scale(${1 - step * 0.18})` }}
            onClick={() => setStep(step + 1 < t.refuseSteps.length ? step + 1 : null)}
          >
            {t.refuseStill}
          </button>
        </Modal>
      ) : null}
    </>
  );
}
