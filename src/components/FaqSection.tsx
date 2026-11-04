import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

export default function FaqSection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <section>
      <h2 className="sec-title">{t.faqTitle}</h2>
      <p className="sec-sub">{t.faqSub}</p>
      {t.faq.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
