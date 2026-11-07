"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset } from "@/config/site";
import { href, localeLabel, locales, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { Logo } from "./Logo";

const navPages: PageKey[] = ["home", "about", "services", "gallery", "contact", "faq"];

function normalize(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/** 把目前路徑的語系段落換成另一個語系 */
function switchLocalePath(pathname: string, target: Locale) {
  const parts = normalize(pathname).split("/");
  parts[1] = target;
  return parts.join("/");
}

export function Header({
  locale,
  nav,
  brand,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  brand: Dictionary["brand"];
}) {
  const pathname = normalize(usePathname() ?? "/");
  const [open, setOpen] = useState(false);

  // 開啟手機選單時鎖住背景捲動
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (page: PageKey) => pathname === href(locale, page);

  const languageSwitcher = (
    <div className="flex items-center gap-1 text-xs" aria-label={nav.language} role="group">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-blush-400">/</span>}
          {/* 用一般 <a> 整頁載入，確保 <html lang> 與字型正確切換 */}
          <a
            href={asset(switchLocalePath(pathname, l))}
            lang={l === "vi" ? "vi" : "zh-Hant-TW"}
            hrefLang={l === "vi" ? "vi" : "zh-Hant-TW"}
            aria-current={l === locale ? "true" : undefined}
            className={`px-1 py-0.5 transition-colors ${
              l === locale ? "font-semibold text-plum-700" : "text-muted hover:text-ink"
            }`}
          >
            {localeLabel[l]}
          </a>
        </span>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-blush-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link href={href(locale)} onClick={() => setOpen(false)} aria-label={brand.name}>
          <Logo brand={brand} />
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center text-sm">
            {navPages.map((page) => (
              <li key={page} className="flex items-center">
                <span className="mx-3 h-1 w-1 rounded-full bg-blush-400" aria-hidden="true" />
                <Link
                  href={href(locale, page)}
                  aria-current={isActive(page) ? "page" : undefined}
                  className={`relative py-6 transition-colors hover:text-plum-700 ${
                    isActive(page)
                      ? "font-medium text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-blush-400"
                      : "text-ink/80"
                  }`}
                >
                  {nav[page]}
                </Link>
              </li>
            ))}
            <li aria-hidden="true">
              <span className="mx-3 block h-1 w-1 rounded-full bg-blush-400" />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">{languageSwitcher}</div>
          <Link href={href(locale, "contact")} className="btn-outline hidden sm:inline-flex">
            {nav.appointment}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-[2px] w-6 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span className={`absolute left-0 top-1.5 h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 h-[2px] w-6 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 手機選單 */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-blush-100 lg:hidden"
      >
        <nav className="container-page py-8" aria-label="Mobile">
          <ul className="space-y-1">
            {navPages.map((page) => (
              <li key={page}>
                <Link
                  href={href(locale, page)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(page) ? "page" : undefined}
                  className={`heading-display block border-b border-blush-200 py-4 text-2xl ${
                    isActive(page) ? "text-plum-700" : ""
                  }`}
                >
                  {nav[page]}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href(locale, "contact")} onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
            {nav.appointment}
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-muted">{nav.language}</span>
            {languageSwitcher}
          </div>
        </nav>
      </div>
    </header>
  );
}
