import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — 嬌仙美甲 Kieu Tien Nail",
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// 全站 404（GitHub Pages 會以 404.html 顯示）。這裡不經過 layout，所以用一般 <a>。
export default function GlobalNotFound() {
  return (
    <html lang="zh-Hant-TW" className={fontVariables}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="heading-display text-7xl text-blush-500">404</p>
        <p className="text-lg">找不到這個頁面</p>
        <p className="text-lg" lang="vi">
          Không tìm thấy trang này
        </p>
        <div className="mt-4 flex gap-4">
          <a href={`${base}/zh-tw/`} className="btn-primary">
            回到首頁
          </a>
          <a href={`${base}/vi/`} className="btn-primary" lang="vi">
            Về trang chủ
          </a>
        </div>
      </body>
    </html>
  );
}
