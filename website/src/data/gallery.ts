// 作品集資料。放入真實照片後，在 image 填入路徑（例如 "/images/gallery/01.jpg"），
// 有 image 的項目會顯示照片，沒有的顯示佔位插畫。
export const galleryCategories = ["gel", "art", "french", "extension", "foot"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  /** 佔位插畫配色：[指甲主色, 花紋色] */
  colors: [string, string];
  /** 指甲造型 */
  shape: "almond" | "square" | "round";
  image?: string;
}

export const gallery: GalleryItem[] = [
  { id: "g01", category: "art", colors: ["#8e2a6e", "#f6c9dc"], shape: "almond" },
  { id: "g02", category: "gel", colors: ["#e889ab", "#ffffff"], shape: "round" },
  { id: "g03", category: "french", colors: ["#fbe3ea", "#ffffff"], shape: "square" },
  { id: "g04", category: "extension", colors: ["#b23a7a", "#f3b6cd"], shape: "almond" },
  { id: "g05", category: "foot", colors: ["#d65a8a", "#ffe1ec"], shape: "round" },
  { id: "g06", category: "art", colors: ["#f2b5c9", "#7a1f5c"], shape: "almond" },
  { id: "g07", category: "gel", colors: ["#c9a0dc", "#ffffff"], shape: "square" },
  { id: "g08", category: "french", colors: ["#f7d6df", "#b23a7a"], shape: "almond" },
  { id: "g09", category: "extension", colors: ["#5e1846", "#e8a5c0"], shape: "almond" },
  { id: "g10", category: "art", colors: ["#e7b8a6", "#8e2a6e"], shape: "round" },
  { id: "g11", category: "foot", colors: ["#f08fb0", "#ffffff"], shape: "square" },
  { id: "g12", category: "gel", colors: ["#a7356f", "#f6c9dc"], shape: "almond" },
];
