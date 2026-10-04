import en from "./locales/en.json";
import vi from "./locales/vi.json";
import type { Locale } from "./utils/locale";

export type Messages = typeof vi;

export const messages: Record<Locale, Messages> = { vi, en };
