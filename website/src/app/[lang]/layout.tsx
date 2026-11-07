import { notFound } from "next/navigation";
import { ChatButton } from "@/components/ChatButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/RevealObserver";
import { hasLocale, htmlLang, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

// 只產生 zh-tw 與 vi，其他路徑一律 404（靜態輸出必要設定）
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={htmlLang[lang]} className={`${fontVariables} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header locale={lang} nav={dict.nav} brand={dict.brand} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
        <ChatButton chat={dict.chat} />
        <RevealObserver />
        <JsonLd locale={lang} dict={dict} />
      </body>
    </html>
  );
}
