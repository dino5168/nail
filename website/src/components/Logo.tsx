import type { Dictionary } from "@/i18n/dictionaries/zh-tw";

/** 文字 Logo（換成正式 Logo 圖檔時只需改這個元件） */
export function Logo({ brand, light = false }: { brand: Dictionary["brand"]; light?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-display text-[1.6rem] tracking-wide ${light ? "text-white" : "text-ink"}`}>
        {brand.name}
      </span>
      <span
        className={`mt-1 text-[0.6rem] uppercase tracking-[0.3em] ${light ? "text-blush-300" : "text-plum-500"}`}
      >
        {brand.sub}
      </span>
    </span>
  );
}
