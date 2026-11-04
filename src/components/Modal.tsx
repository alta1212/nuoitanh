import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  big: string;
  title: string;
  text: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ big, title, text, onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [onClose]);

  // Portal: <main> tạo stacking context riêng, modal phải nằm ngoài để phủ cả trang.
  return createPortal(
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <div className="big">{big}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="row">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
