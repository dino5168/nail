// 服務價目（與語系無關的資料）。名稱與說明在各語系字典的 services.items[id]。
export const serviceCategories = ["hand", "foot", "extension", "care"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export const serviceIds = [
  "gelSolid",
  "gelArt",
  "french",
  "catEye",
  "footGel",
  "footArt",
  "footSpa",
  "extGel",
  "extAcrylic",
  "overlay",
  "paraffin",
  "cuticle",
  "removal",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export interface Service {
  id: ServiceId;
  category: ServiceCategory;
  /** 新台幣價格 */
  price: number;
  /** true 表示「起」價 */
  from?: boolean;
  /** 分鐘 */
  duration: number;
  /** 是否出現在首頁「熱門服務」 */
  featured?: boolean;
}

export const services: Service[] = [
  { id: "gelSolid", category: "hand", price: 900, duration: 60, featured: true },
  { id: "gelArt", category: "hand", price: 1200, from: true, duration: 90, featured: true },
  { id: "french", category: "hand", price: 1100, duration: 75 },
  { id: "catEye", category: "hand", price: 1200, duration: 75 },
  { id: "footGel", category: "foot", price: 1100, duration: 75 },
  { id: "footArt", category: "foot", price: 1400, from: true, duration: 90 },
  { id: "footSpa", category: "foot", price: 1200, duration: 60, featured: true },
  { id: "extGel", category: "extension", price: 1800, from: true, duration: 120, featured: true },
  { id: "extAcrylic", category: "extension", price: 2000, from: true, duration: 120 },
  { id: "overlay", category: "extension", price: 400, duration: 30 },
  { id: "paraffin", category: "care", price: 600, duration: 30 },
  { id: "cuticle", category: "care", price: 500, duration: 40 },
  { id: "removal", category: "care", price: 300, duration: 30 },
];

export function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString("en-US")}`;
}
