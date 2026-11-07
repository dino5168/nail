import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";

// 拉丁／越南文字型
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  display: "swap",
});

export const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// 中文標題字型：只含網站實際用到的字（由 scripts/subset-font.mjs 在 dev/build 前產生）。
// 不預先載入，越南語頁面就不會下載；中文內文使用系統字型（正黑體／蘋方）。
export const notoSerifTc = localFont({
  src: "../fonts/noto-serif-tc-subset.woff2",
  variable: "--font-noto-serif-tc",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["PMingLiU", "Songti TC", "serif"],
});

export const fontVariables = [cormorant, beVietnam, notoSerifTc].map((f) => f.variable).join(" ");
