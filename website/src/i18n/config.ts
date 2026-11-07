export const locales = ["zh-tw", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh-tw";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** <html lang> 與 hreflang 使用的 BCP 47 標籤 */
export const htmlLang: Record<Locale, string> = {
  "zh-tw": "zh-Hant-TW",
  vi: "vi",
};

/** 語系切換按鈕上顯示的名稱 */
export const localeLabel: Record<Locale, string> = {
  "zh-tw": "中文",
  vi: "Tiếng Việt",
};

export const pageKeys = ["home", "about", "services", "gallery", "contact", "faq"] as const;
export type PageKey = (typeof pageKeys)[number];

/** 產生站內連結（不含 basePath，next/link 會自動加上） */
export function href(locale: Locale, page: PageKey = "home"): string {
  return page === "home" ? `/${locale}/` : `/${locale}/${page}/`;
}
