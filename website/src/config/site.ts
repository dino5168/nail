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
} as const;

/** 在路徑前加上 basePath（給 <img src>、CSS 背景等不會自動處理 basePath 的地方用） */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
