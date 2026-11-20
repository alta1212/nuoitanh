import { useEffect } from "react";
import DiarySection from "../components/DiarySection";
import DonateSection from "../components/DonateSection";
import DonorBoard from "../components/DonorBoard";
import FaqSection from "../components/FaqSection";
import Hero from "../components/Hero";
import LetterSection from "../components/LetterSection";
import PhotoSection from "../components/PhotoSection";
import type { Locale } from "../utils/locale";
import { goDonate } from "../utils/navigation";

export default function HomePage({ locale }: { locale: Locale }) {
  // Đến từ /#donate ở trang khác: section chỉ tồn tại sau khi React render.
  useEffect(() => {
    if (window.location.hash === "#donate") goDonate();
  }, []);

  return (
    <>
      <Hero locale={locale} />
      <PhotoSection locale={locale} />
      <LetterSection key={locale} locale={locale} />
      <DiarySection key={`diary-${locale}`} locale={locale} />
      <DonateSection locale={locale} />
      <DonorBoard locale={locale} />
      <FaqSection locale={locale} />
    </>
  );
}
