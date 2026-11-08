// 店家基本資料（非語系相關的部分）。換成真實資料時只需修改這個檔案。
export const site = {
  brand: "Kieu Tien Nail",
  phone: "0909-001-261",
  phoneHref: "tel:+886909001261",
  email: "hello@kieutiennail.example",
  /** LINE 官方帳號（QR Code 連結）；中文與越南語版都使用 LINE */
  lineUrl: "https://lin.ee/9d0xj2B",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("新北市三峽區忠孝街25號")}`,
  /** 結構化資料（JSON-LD）用的地址與營業時間；與畫面上的文字（字典 contact.*）要同步修改 */
  address: {
    streetAddress: "忠孝街25號",
    addressLocality: "三峽區",
    addressRegion: "新北市",
    postalCode: "237",
    addressCountry: "TW",
  },
  openingHours: [
    { days: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:00", closes: "21:00" },
    { days: ["Saturday", "Sunday"], opens: "10:00", closes: "19:00" },
  ],
  priceRange: "NT$300–2,000",
} as const;

/** 在路徑前加上 basePath（給 <img src>、CSS 背景等不會自動處理 basePath 的地方用） */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
