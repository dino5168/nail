import type { MetadataRoute } from "next";
import { href, htmlLang, locales, pageKeys } from "@/i18n/config";
import { absolute } from "@/lib/metadata";

// 靜態輸出：建置時產生 out/sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pageKeys.flatMap((page) =>
    locales.map((locale) => ({
      url: absolute(href(locale, page)),
      lastModified,
      changeFrequency: page === "home" || page === "gallery" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], absolute(href(l, page))])),
      },
    })),
  );
}
