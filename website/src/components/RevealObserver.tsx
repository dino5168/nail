"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 捲動淡入：頁面上帶 data-reveal 的元素進入視窗時加上 .is-visible。
 * - 只有這個元件執行後才會在 <html> 加上 .reveal-ready，所以 JS 停用時內容照常顯示。
 * - 已在首屏內的元素會立即標記為可見，避免載入時閃爍。
 * - 使用者偏好減少動態時，CSS 直接停用動畫（見 globals.css）。
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    const viewportH = window.innerHeight;

    for (const el of elements) {
      if (el.getBoundingClientRect().top < viewportH) el.classList.add("is-visible");
    }
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    for (const el of elements) {
      if (!el.classList.contains("is-visible")) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
