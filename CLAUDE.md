# CLAUDE.md — 美甲網站（web-nail）

靜態美甲網站「嬌仙美甲 Kieu Tien Nail」（越南語：Kiều Tiên Nail），店址：新北市三峽區忠孝街25號。支援繁體中文與越南語。

- Repo：https://github.com/dino5168/nail
- 線上網址：https://dino5168.github.io/nail/
- 需求：`Plans/1-網站建構.md`；實作計畫（滾動式）：`Plans/1-網站建構實作.md`；進度：`Progress.md`

## 目錄結構

```
web-nail/                    ← git repo 根目錄
├─ Plans/                    ← 需求與計畫（Obsidian 筆記）
├─ Progress.md               ← 進度紀錄（每次工作結束必須更新）
├─ .github/workflows/deploy.yml
└─ website/                  ← Next.js 專案（所有 npm 指令都在這裡執行）
   ├─ AGENTS.md              ← Next.js 16 提醒：API 與舊版不同，先查 node_modules/next/dist/docs/
   └─ src/
      ├─ app/(root)/         ← "/"：依瀏覽器語言導向 /zh-tw/ 或 /vi/
      ├─ app/[lang]/         ← 各語系頁面（首頁、about、services、gallery、contact、faq）
      ├─ app/global-not-found.tsx
      ├─ components/         ← Header、Footer、ChatButton、sections、GalleryGrid、icons、illustrations
      ├─ config/site.ts      ← 店家電話、LINE（兩語系共用）、社群連結、asset() 工具
      ├─ data/               ← services.ts（價目）、gallery.ts（作品集）
      ├─ i18n/               ← config.ts（語系清單、href()）、dictionaries/zh-tw.ts、vi.ts
      └─ lib/                ← fonts.ts、metadata.ts
```

## 技術重點

- Next.js 16（App Router、Turbopack）＋ React 19 ＋ TypeScript ＋ Tailwind CSS v4。
- **純靜態輸出**：`output: 'export'`、`trailingSlash: true`、`images.unoptimized`。不可使用 Server Actions、cookies、headers、proxy、redirects 等需要伺服器的功能。
- **basePath**：由 `NEXT_PUBLIC_BASE_PATH` 決定（CI 為 `/nail`，本機為空）。`next/link` 會自動加上；`<img src>`、`<a>`、`location` 等需用 `asset()`（`src/config/site.ts`）。
- **多語系**：
  - 新增文字時，先在 `zh-tw.ts` 加欄位，再在 `vi.ts` 補上；`vi.ts` 型別為 `Dictionary`，漏翻譯會編譯失敗。
  - 與語系無關的資料（價格、時間、作品集）放在 `src/data/`，文字以 id 對應到字典。
  - 站內連結一律用 `href(locale, page)`。
  - 語系切換使用 `<a>` 整頁載入（確保 `<html lang>` 更新）。
- `[lang]/layout.tsx` 設定 `dynamicParams = false` 與 `generateStaticParams`，新增頁面時沿用相同的 `hasLocale` + `notFound()` 寫法。
- 圖片：首頁 Hero 已是真實照片（`public/images/home-hero.webp`，由 `Plans/Images/home01.png` 轉成 WebP）；作品集 g01～g04 是 Pexels 圖庫照片（`public/images/gallery/`，`credit` 欄位記錄來源，仍顯示「示意圖」）；其餘仍是 SVG 佔位圖（`components/illustrations.tsx`）。真實照片放 `website/public/images/`，建議先用 sharp 轉 WebP，`<img src>` 要經過 `asset()`；作品集在 `data/gallery.ts` 的 `image` 欄位填入路徑。
- **字型**：
  - 拉丁／越南文：Cormorant Garamond（標題）＋ Be Vietnam Pro（內文），由 `next/font/google` 載入。
  - 中文標題：`scripts/subset-font.mjs` 在 `predev`／`prebuild` 自動掃描 `src/` 的中文字，產生只含這些字的 Noto Serif TC 子集（`src/fonts/`，約 130 KB，**需 commit**）。修改中文文案後跑一次 dev 或 build，再把更新後的字型一起 commit。
  - 中文內文使用系統字型（不下載）。**不要**改回 `next/font/google` 的 Noto TC，會產生 400 KB 以上會擋住渲染的 CSS。
- **捲動淡入**：元素加上 `data-reveal`（可帶 `"1"`～`"3"` 表示延遲），由 `RevealObserver` 處理。有 hover 位移效果的元素，請把 `data-reveal` 加在外層。
- **GEO／SEO**（見 `Plans/9-撰寫GEO實作.md`）：店家事實的單一來源是 `lib/facts.ts`，字典裡的 `{phone}`、`{address}`、`{line}`、`{hours}`、`{priceMin}`、`{priceMax}` 會換成實際資料；新增文字要提到電話、地址等事實時請用佔位字，不要寫死。結構化資料在 `components/JsonLd.tsx`（NailSalon＋WebSite＋價目 OfferCatalog，FAQ 頁另有 FAQPage）；`app/llms.txt`、`app/llms-full.txt` 在建置時產生給 AI 讀的說明；首頁 `components/ShopFacts.tsx` 是給 AI 引用的店家資訊區塊。另有 `app/sitemap.ts`、`[lang]/og.png/route.tsx`（分享圖）、`lib/metadata.ts` 的 `pageMetadata()`（canonical、hreflang、OG、Twitter）。示範值（`.example` 信箱、社群首頁連結）不會輸出到結構化資料。
- **header 有 `backdrop-blur`**：任何 `position: fixed` 的浮層（選單、彈窗）都**不能**放在 `<header>` 裡面，否則會以 header 為定位基準，高度變成 0（見 `Plans/3-手機實作.md`）。
- **搜尋引擎驗證檔（不可刪除）**：`public/googlec0196776f2e548ff.html`（Google Search Console 擁有權驗證）、`public/e4cd882950e7af19595f33d4c141c709.txt`（Bing IndexNow 金鑰）。見 `Plans/10-上架GoogleSearch-Edge實作.md`。
- 已知問題：在 **Windows** 本機建置時，Next 16.4 會把 `__PAGE__` 預取檔輸出成子目錄（路徑分隔符的 bug），本機靜態測試會看到幾個 404。CI 在 Linux 建置，不受影響。

## 常用指令（PowerShell，在 `website/` 下）

```powershell
npm run dev                       # 開發伺服器 http://localhost:3000
npm run lint                      # ESLint
npm run typecheck                 # next typegen + tsc
$env:NEXT_PUBLIC_BASE_PATH="/nail"; npm run build   # 模擬 CI 的正式建置，輸出到 out/
```

> dev server 若出現 `Unexpected non-whitespace character after JSON` 的 500 錯誤，是 `.next` 快取損壞：停掉 server、刪除 `.next` 後重啟。

## 工作流程（必須遵守）

1. **滾動式計劃**：開始新階段前先更新 `Plans/1-網站建構實作.md`，近期細、遠期粗。
2. 修改完成後在本機執行 `npm run lint`、`npm run typecheck`、`npm run build`，全部通過才 commit。
3. **GitHub Pages 的 Source 必須是「GitHub Actions」**（Settings → Pages）。若設成「Deploy from a branch」，GitHub 內建的 `pages build and deployment` 會和我們的 workflow 同時部署，較晚完成的會覆蓋網站，可能變成全站 404。檢查方式：Actions 列表中每次 push 只應出現「CI & Deploy」，不應出現 `pages build and deployment`。
4. **CI 執行完同步 git**：檢查通過 → commit → push 到 `main` → GitHub Actions（lint／typecheck／build／deploy Pages）。用 `gh run watch` 或 Actions 頁面確認 CI 成功；失敗就修正後再 push。
5. 每次工作結束更新 `Progress.md`（日期、完成事項、下一步）。
6. 文件與回覆一律使用繁體中文；檔案為 UTF-8。
