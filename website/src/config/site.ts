// 店家基本資料（非語系相關的部分）。換成真實資料時只需修改這個檔案。
export const site = {
  brand: "Bloom Nail Studio",
  phone: "02-1234-5678",
  phoneHref: "tel:+886212345678",
  email: "hello@bloomnail.example",
  lineUrl: "https://line.me/R/ti/p/@bloomnail",
  zaloUrl: "https://zalo.me/0000000000",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
  mapUrl: "https://maps.google.com/?q=台北市大安區忠孝東路四段100號",
  /** 結構化資料（JSON-LD）用的地址與營業時間；與畫面上的文字（字典 contact.*）要同步修改 */
  address: {
    streetAddress: "忠孝東路四段100號2樓",
    addressLocality: "大安區",
    addressRegion: "台北市",
    postalCode: "106",
    addressCountry: "TW",
  },
  geo: { latitude: 25.0416, longitude: 121.5438 },
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
