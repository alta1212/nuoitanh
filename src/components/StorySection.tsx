import { messages } from "../i18n";
import type { Locale } from "../utils/locale";

export default function StorySection({ locale }: { locale: Locale }) {
  const t = messages[locale].home;

  return (
    <section>
      <h2 className="sec-title">{t.storyTitle}</h2>
      <p className="sec-sub">{t.storySub}</p>
      <div className="story">
        {t.story.map((item, index) => (
          <div className="item" key={item.title}>
            <div className="n">{String(index + 1).padStart(2, "0")}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
