export type Locale = "vi" | "en";

export const localeStorageKey = "nuoitanh-locale";

export function resolveLocale(
  storedLocale: string | null,
  browserLanguage: string,
): Locale {
  if (storedLocale === "vi" || storedLocale === "en") return storedLocale;
  return browserLanguage.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function getInitialLocale(): Locale {
  let storedLocale: string | null = null;
  try {
    storedLocale = window.localStorage.getItem(localeStorageKey);
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }
  return resolveLocale(storedLocale, window.navigator.language);
}

export function saveLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // The selected language still works for the current page session.
  }
}

export function formatCurrency(amount: number, locale: Locale) {
  const formatted = amount.toLocaleString(locale === "vi" ? "vi-VN" : "en-US");
  return locale === "vi" ? `${formatted}đ` : `₫${formatted}`;
}
