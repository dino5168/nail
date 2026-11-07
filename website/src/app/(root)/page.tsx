import Link from "next/link";
import { href } from "@/i18n/config";
import { LocaleRedirect } from "./LocaleRedirect";

// "/"：依瀏覽器語言自動導向 /zh-tw/ 或 /vi/；JavaScript 停用時顯示選擇連結
export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <LocaleRedirect />
      <p className="heading-display text-3xl">嬌仙美甲 · Kieu Tien Nail</p>
      <div className="flex gap-4">
        <Link href={href("zh-tw")} className="btn-primary">
          繁體中文
        </Link>
        <Link href={href("vi")} className="btn-primary" lang="vi">
          Tiếng Việt
        </Link>
      </div>
    </main>
  );
}
