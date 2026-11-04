import { useEffect, useState } from "react";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import { freePagePath, goDonate } from "../utils/navigation";
import { useFx } from "./FxProvider";
import Modal from "./Modal";

const storageKey = "exitShown";

function wasShown() {
  try {
    return sessionStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // Without storage the popup can only repeat on a full reload.
  }
}

export default function ExitIntentModal({ locale }: { locale: Locale }) {
  const t = messages[locale].exit;
  const { toast } = useFx();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let shown = wasShown();
    const show = () => {
      shown = true;
      markShown();
      setOpen(true);
    };
    const onMouseOut = (event: MouseEvent) => {
      if (shown || event.relatedTarget || event.clientY > 8) return;
      show();
    };
    // trên điện thoại: hiện popup khi quay lại tab sau khi rời đi
    const onVisibility = () => {
      if (document.visibilityState === "visible" && !shown && "ontouchstart" in window) {
        show();
      }
    };
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!open) return null;

  return (
    <Modal big="🥺" title={t.title} text={t.text} onClose={() => setOpen(false)}>
      <button
        className="btn btn-red"
        type="button"
        style={{ justifyContent: "center" }}
        onClick={() => {
          setOpen(false);
          goDonate();
        }}
      >
        {t.stay}
      </button>
      <a className="btn btn-ghost" href={freePagePath} style={{ justifyContent: "center" }}>
        {t.free}
      </a>
      <button
        className="link-btn"
        type="button"
        onClick={() => {
          setOpen(false);
          toast(t.leaveToast);
        }}
      >
        {t.leave}
      </button>
    </Modal>
  );
}
