import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "花漾美甲 Bloom Nail Studio",
  robots: { index: false },
};

// "/" 專用的 root layout（[lang] 有自己的 root layout）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
