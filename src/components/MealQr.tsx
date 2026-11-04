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
    <>
      <div className="qr-box" aria-busy={state === "loading"}>
        {state === "error" ? (
          <div className="qr-message" role="status">
            <p>{t.qrError}</p>
            <button className="btn btn-ghost" type="button" onClick={retry}>
              {t.qrRetry}
            </button>
          </div>
        ) : (
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
      </div>
      {state === "loading" && (
        <p className="qr-caption" role="status" style={{ margin: "12px 0 0" }}>
          {t.qrLoading}
        </p>
      )}
    </>
  );
}
