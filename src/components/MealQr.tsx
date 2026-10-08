import { useState } from "react";
import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

export default function MealQr({
  url,
  locale,
}: {
  url: string;
  locale: Locale;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const t = messages[locale].home;
  const imageUrl = attempt ? `${url}&retry=${attempt}` : url;

  function retry() {
    setState("loading");
    setAttempt((value) => value + 1);
  }

  return (
    <div className="qr-area" aria-busy={state === "loading"}>
      {state !== "error" && (
        <a
          className="qr-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.openQrLabel}
        >
          <img
            key={imageUrl}
            src={imageUrl}
            width="512"
            height="512"
            alt={t.qrAlt}
            onLoad={() => setState("loaded")}
            onError={() => setState("error")}
          />
        </a>
      )}
      {state === "loading" && (
        <p className="qr-feedback" role="status">
          {t.qrLoading}
        </p>
      )}
      {state === "error" && (
        <div className="qr-error" role="status">
          <p>{t.qrError}</p>
          <button
            className="action action-secondary"
            type="button"
            onClick={retry}
          >
            {t.qrRetry}
          </button>
        </div>
      )}
      {state === "loaded" && <p className="qr-caption">{t.qrCaption}</p>}
    </div>
  );
}
