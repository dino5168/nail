import { Be_Vietnam_Pro, Cormorant_Garamond, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";

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

// 中文字型（字檔大，依 unicode-range 分段載入，不預先載入）
export const notoSansTc = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const notoSerifTc = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const fontVariables = [cormorant, beVietnam, notoSansTc, notoSerifTc]
  .map((f) => f.variable)
  .join(" ");
