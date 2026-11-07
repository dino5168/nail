# CLAUDE.md — 美甲網站（web-nail）

靜態美甲網站「花漾美甲 Bloom Nail Studio」（暫定品牌），支援繁體中文與越南語。

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
      ├─ config/site.ts      ← 店家電話、LINE/Zalo、社群連結、asset() 工具
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
- 圖片目前是 SVG 佔位圖（`components/illustrations.tsx`）。真實照片放 `website/public/images/`，並在 `data/gallery.ts` 的 `image` 欄位填入路徑。

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
3. **CI 執行完同步 git**：檢查通過 → commit → push 到 `main` → GitHub Actions（lint／typecheck／build／deploy Pages）。用 `gh run watch` 或 Actions 頁面確認 CI 成功；失敗就修正後再 push。
4. 每次工作結束更新 `Progress.md`（日期、完成事項、下一步）。
5. 文件與回覆一律使用繁體中文；檔案為 UTF-8。
