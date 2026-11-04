import { useEffect } from "react";
import DonateSection from "../components/DonateSection";
import DonorBoard from "../components/DonorBoard";
import FaqSection from "../components/FaqSection";
import Hero from "../components/Hero";
import ProgressCard from "../components/ProgressCard";
import StorySection from "../components/StorySection";
import type { Locale } from "../utils/locale";
import { goDonate } from "../utils/navigation";

export default function HomePage({ locale }: { locale: Locale }) {
  // Đến từ /#donate ở trang khác: section chỉ tồn tại sau khi React render.
  useEffect(() => {
    if (window.location.hash === "#donate") goDonate();
  }, []);

  return (
    <div className="wrap">
      <Hero locale={locale} />
      <ProgressCard locale={locale} />
      <StorySection locale={locale} />
      <DonateSection locale={locale} />
      <DonorBoard locale={locale} />
      <FaqSection locale={locale} />
    </div>
  );
}
