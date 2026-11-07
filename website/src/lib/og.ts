// Open Graph 圖片（next/og）用的工具：建置時執行，不會進入瀏覽器端程式碼。

/**
 * 從 Google Fonts 只下載 text 用到的字（子集），回傳 TTF 資料。
 * next/og（satori）不支援 woff2；不帶瀏覽器 User-Agent 時 Google 會回傳 TTF。
 */
export async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`無法載入字型 ${family}：${css.slice(0, 200)}`);
  const res = await fetch(src[1]);
  if (!res.ok) throw new Error(`字型下載失敗 ${family}: ${res.status}`);
  return res.arrayBuffer();
}

/** 與首頁 Hero 相同風格的五指美甲插畫（SVG 字串，轉成 data URI 給 <img> 使用） */
export function heroNailsDataUri(): string {
  const almond =
    "M0,-95 C26,-95 40,-40 40,25 C40,72 22,95 0,95 C-22,95 -40,72 -40,25 C-40,-40 -26,-95 0,-95Z";
  const fingers = [
    { angle: -36, len: 560, floral: false },
    { angle: -17, len: 640, floral: true },
    { angle: 0, len: 680, floral: false },
    { angle: 17, len: 640, floral: true },
    { angle: 34, len: 560, floral: false },
  ];
  const flower = (x: number, y: number, r: number, color: string) =>
    `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288]
      .map((d) => `<ellipse cx="0" cy="${-r}" rx="${r * 0.62}" ry="${r}" fill="${color}" transform="rotate(${d})"/>`)
      .join("")}<circle r="${r * 0.35}" fill="#2a0f22"/></g>`;
  const glitter = (seed: number) =>
    Array.from({ length: 16 }, (_, i) => {
      const a = Math.sin(seed * 97 + i * 13.37) * 10000;
      const b = Math.sin(seed * 31 + i * 7.11) * 10000;
      const x = (a - Math.floor(a) - 0.5) * 60;
      const y = (b - Math.floor(b) - 0.5) * 160;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8" fill="#fff" opacity="0.75"/>`;
    }).join("");

  const body = fingers
    .map(
      (f, i) => `<g transform="translate(320 760) rotate(${f.angle}) translate(0 ${-f.len})">
        <rect x="-46" y="0" width="92" height="${f.len}" rx="46" fill="url(#skin)"/>
        <g transform="translate(0 66) scale(0.95)">
          <path d="${almond}" fill="${f.floral ? "#fbeef3" : "#8e2a6e"}"/>
          ${f.floral ? `<path d="M-30,80 C-10,30 10,0 30,-60" stroke="#2a0f22" stroke-width="1.6" fill="none"/>${flower(8, -28, 14, "#8e2a6e")}${flower(-14, 36, 11, "#c25a9a")}` : glitter(i + 1)}
          <path d="M-22,-60 C-18,-80 -8,-88 0,-90" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.45"/>
        </g>
      </g>`,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">
    <defs><linearGradient id="skin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e9b79f"/><stop offset="0.5" stop-color="#f6d3c2"/><stop offset="1" stop-color="#e5ad95"/>
    </linearGradient></defs>${body}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
