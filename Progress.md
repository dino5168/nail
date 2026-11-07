# Progress — 美甲網站

> 計畫：`Plans/1-網站建構實作.md`　｜　規範：`CLAUDE.md`

## 目前狀態

- 階段 1（骨架與 CI）：✅ 完成
- 階段 2（頁面內容）：✅ 完成（示範文案＋佔位圖）
- 階段 3（精修）：⏳ 等待使用者提供真實資料與回饋

## 紀錄

### 2026-11-07
**討論決議**：暫定品牌「花漾美甲 Bloom Nail Studio」、多頁結構、GitHub Actions 部署到 GitHub Pages、先用佔位圖。

**完成**
- 建立 Next.js 16 + React 19 + TypeScript + Tailwind v4 專案（`website/`），設定靜態輸出與 basePath。
- i18n：`/zh-tw/`、`/vi/` 子路徑，型別安全的字典，根路徑依瀏覽器語言自動導向，hreflang／canonical metadata。
- 共用元件：Header（圓點分隔選單、預約按鈕、語系切換、手機選單）、Footer、浮動聊天按鈕（中文 LINE、越南語 Zalo）、SVG 指甲插畫與圖示。
- 頁面：首頁（Hero、為什麼選擇我們、品牌介紹漸淡文字、熱門服務、作品精選、預約 CTA）、關於我們、服務價目、作品集（分類篩選）、聯絡我們、常見問題、全站 404。
- GitHub Actions：lint → typecheck → build → 部署 GitHub Pages。
- 本機驗證：lint、typecheck、build 通過；以 `/nail` basePath 的靜態輸出測試各頁 200，桌機與 390px 手機版截圖檢查版面。

- 已推送到 `main`（commit `2471bf5`）。CI run 42318298935：build job（lint／typecheck／build）✅；deploy job ❌，原因是 repo 尚未啟用 GitHub Pages。

- 使用者已將 Pages Source 設為 GitHub Actions；CI run 42319628526 全部成功，網站上線：https://dino5168.github.io/nail/（各頁 200、未知路徑 404）。
- 修正首頁 Hero 粉色光暈蓋住標題文字的問題。

**待辦／下一步**
- [x] 使用者到 GitHub repo → Settings → Pages → Source 選「GitHub Actions」（只需一次）
- [ ] 提供真實店名、地址、電話、營業時間、價目、LINE/Zalo 連結
- [ ] 提供店內與作品照片，替換佔位圖
- [ ] 階段 3：捲動淡入動畫、sitemap／OG 圖、Lighthouse 檢查
