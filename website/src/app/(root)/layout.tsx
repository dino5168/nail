import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "嬌仙美甲 Kieu Tien Nail",
  robots: { index: false },
  // Bing Webmaster Tools 擁有權驗證（與 public/BingSiteAuth.xml 同一組碼，不可刪除）
  verification: { other: { "msvalidate.01": "1C86A78A274F70E64AA3FA8033B2D435" } },
};

// "/" 專用的 root layout（[lang] 有自己的 root layout）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
