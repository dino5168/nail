// 產生中文標題字型（Noto Serif TC）的子集：只包含原始碼中實際出現的中文字。
// 由 npm 的 predev / prebuild 自動執行；也可手動：node scripts/subset-font.mjs
//
// - 掃描 src/ 下所有 .ts/.tsx 的中日韓字元與全形標點
// - 向 Google Fonts 下載只含這些字的 woff2（約 130 KB，完整字型分段載入約 3 MB 以上）
// - 輸出 src/fonts/noto-serif-tc-subset.woff2 與字元清單 .txt（兩者都要 commit）
// - 字元清單沒變就不重新下載；網路失敗但已有舊檔時只警告、不中斷建置
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src");
const outDir = join(srcDir, "fonts");
const fontFile = join(outDir, "noto-serif-tc-subset.woff2");
const charsFile = join(outDir, "noto-serif-tc-subset.txt");

const FAMILY = "Noto Serif TC";
const WEIGHT = 400;
// 需要瀏覽器 User-Agent，Google 才會回傳 woff2
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const CJK = /[　-〿㐀-䶿一-鿿＀-￯]/u;

function collectChars() {
  const chars = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(entry.name)) {
        for (const ch of readFileSync(p, "utf8")) if (CJK.test(ch)) chars.add(ch);
      }
    }
  };
  walk(srcDir);
  return [...chars].sort().join("");
}

async function download(text) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(FAMILY)}:wght@${WEIGHT}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl, { headers: { "User-Agent": UA } })).text();
  const urls = [...css.matchAll(/url\((.+?)\)\s*format\('woff2'\)/g)].map((m) => m[1]);
  if (urls.length !== 1) throw new Error(`預期 1 個 woff2，實際 ${urls.length} 個：${css.slice(0, 200)}`);
  const res = await fetch(urls[0]);
  if (!res.ok) throw new Error(`下載字型失敗：HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const text = collectChars();
const hash = createHash("sha1").update(text).digest("hex").slice(0, 10);

if (existsSync(fontFile) && existsSync(charsFile) && readFileSync(charsFile, "utf8").startsWith(`${hash}\n`)) {
  console.log(`[subset-font] 字元未變更（${text.length} 字），沿用現有字型`);
  process.exit(0);
}

try {
  const data = await download(text);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(fontFile, data);
  writeFileSync(charsFile, `${hash}\n${text}\n`);
  console.log(`[subset-font] 已產生 ${FAMILY} 子集：${text.length} 字，${(data.length / 1024).toFixed(0)} KB`);
} catch (err) {
  if (existsSync(fontFile)) {
    console.warn(`[subset-font] 警告：無法更新字型，沿用舊檔（新加入的字會以系統字型顯示）。${err.message}`);
  } else {
    console.error(`[subset-font] 錯誤：${err.message}`);
    process.exit(1);
  }
}
