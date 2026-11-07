"use client";

import { useEffect } from "react";
import { asset } from "@/config/site";
import { defaultLocale, href, type Locale } from "@/i18n/config";

// 切換到 [lang] 的 root layout 必須整頁載入，所以直接用 location.replace
export function LocaleRedirect() {
  useEffect(() => {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    const locale: Locale = langs.some((l) => l.toLowerCase().startsWith("vi")) ? "vi" : defaultLocale;
    window.location.replace(asset(href(locale)));
  }, []);
  return null;
}
