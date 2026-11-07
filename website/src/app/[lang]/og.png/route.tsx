import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { heroNailsDataUri, loadGoogleFont } from "@/lib/og";

// 每個語系在建置時產生一張 1200×630 的分享圖：out/<lang>/og.png
// （用 route handler 而非 opengraph-image 慣例，靜態輸出才會有 .png 副檔名，GitHub Pages 會以 image/png 傳送）
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/og.png">) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "zh-tw";
  const dict = await getDictionary(locale);

  const title = dict.brand.name;
  const sub = dict.brand.sub.toUpperCase();
  const tagline = dict.home.hero.titleLines.join(" ");
  const isZh = locale === "zh-tw";

  // 標題字型：中文 Noto Serif TC、越南語 Cormorant Garamond；副標 Noto Sans TC / Be Vietnam Pro
  const [displayFont, bodyFont] = await Promise.all([
    loadGoogleFont(isZh ? "Noto Serif TC" : "Cormorant Garamond", 500, `${title}${tagline.toUpperCase()}${tagline}`),
    loadGoogleFont(isZh ? "Noto Sans TC" : "Be Vietnam Pro", 500, sub),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(120deg, #fff7fa 0%, #fdf0f4 45%, #f7c6d7 100%)",
          fontFamily: "Body",
          color: "#1c1418",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 90px", width: 640 }}>
          <div style={{ fontFamily: "Display", fontSize: 84, lineHeight: 1.05 }}>{title}</div>
          <div style={{ marginTop: 14, fontSize: 22, letterSpacing: 8, color: "#b23a7a" }}>{sub}</div>
          <div style={{ marginTop: 48, height: 3, width: 90, background: "#f4a7c3" }} />
          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              fontFamily: "Display",
              fontSize: 40,
              lineHeight: 1.25,
              textTransform: isZh ? "none" : "uppercase",
            }}
          >
            {/* 中文：前兩段接在一起、最後一段換行；越南語：整句自然換行 */}
            {(isZh
              ? [dict.home.hero.titleLines.slice(0, -1).join(""), dict.home.hero.titleLines.at(-1) ?? ""]
              : [tagline]
            ).map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroNailsDataUri()} width={560} height={560} alt="" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Display", data: displayFont, weight: 500, style: "normal" },
        { name: "Body", data: bodyFont, weight: 500, style: "normal" },
      ],
    },
  );
}
