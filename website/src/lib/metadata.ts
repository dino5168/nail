import type { Metadata } from "next";
import { href, htmlLang, locales, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dino5168.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const absolute = (path: string) => `${siteUrl}${basePath}${path}`;

/** 每頁共用的 metadata：標題、描述、canonical、hreflang、Open Graph */
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  dict: Dictionary,
  description?: string,
): Metadata {
  const title = page === "home" ? dict.meta.siteName : `${dict.nav[page]}｜${dict.meta.siteName}`;
  const desc = description ?? dict.meta.description;
  return {
    title,
    description: desc,
    alternates: {
      canonical: absolute(href(locale, page)),
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], absolute(href(l, page))])),
        "x-default": absolute(href("zh-tw", page)),
      },
    },
    openGraph: {
      title,
      description: desc,
      siteName: dict.meta.siteName,
      locale: locale === "vi" ? "vi_VN" : "zh_TW",
      type: "website",
      url: absolute(href(locale, page)),
    },
  };
}
