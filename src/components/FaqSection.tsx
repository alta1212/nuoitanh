import { messages } from "../i18n";
import type { Locale } from "../utils/locale";
import Reveal from "./Reveal";

export default function FaqSection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <section>
      <Reveal className="wrap narrow">
        <div className="label">{t.faqLabel}</div>
        {t.faq.map((item) => (
          <details className="faq" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
