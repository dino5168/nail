# Progress — 美甲網站

> 計畫：`Plans/1-網站建構實作.md`　｜　規範：`CLAUDE.md`
> 需求單：`Plans/N-*.md`，執行後輸出 `Plans/N-*實作.md`

## 目前狀態（2026-11-07 暫停）

- 線上網址：https://dino5168.github.io/nail/ 　最新 commit：`c3048e9`（CI & Deploy ✅）
- 階段 1（骨架與 CI）：✅ 完成
- 階段 2（頁面內容）：✅ 完成（示範文案＋佔位圖）
- 階段 3-A（動畫、SEO、圖示、效能）：✅ 完成，Lighthouse 手機 96～97／100／100／100
- Plans/2 店名與地址：✅ 嬌仙美甲 Kieu Tien Nail、新北市三峽區忠孝街 25 號
- Plans/3 手機漢堡選單：✅ 已修正並在線上驗證
- 階段 3-B（其餘真實資料與照片）：⏳ 等待使用者提供

### 下次從這裡開始

1. 確認使用者是否已提供下方「待辦」中的資料。拿到後依 `Plans/1-網站建構實作.md` 的 3-B 項目替換：
   - 店家設定 `website/src/config/site.ts`
   - 兩語系字典 `website/src/i18n/dictionaries/zh-tw.ts`、`vi.ts`
   - 服務價目 `website/src/data/services.ts`
   - 作品集 `website/src/data/gallery.ts`，照片放 `website/public/images/`
2. 仍是示範值、上線前必須替換：電話 `02-1234-5678`、Email、LINE／Zalo 帳號、Instagram／Facebook 連結、營業時間、價目、團隊成員（Mia／Linh／Yuki）、創立年份與品牌故事、FAQ 內容。
3. 驗證工具：
   - 手機漢堡選單：`node website/scripts/menu-test.mjs <網址> <輸出.png>`（無頭 Edge + CDP，模擬 390×844 視窗點擊並截圖）
   - 效能：`npx lighthouse@12`，需設定 `CHROME_PATH` 指向 Edge
   - Chrome 擴充截不到 localhost，改用無頭 Edge 截圖

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

**階段 3-A 精修**
- 捲動淡入動畫（`RevealObserver` + `data-reveal`）：首屏內容不閃爍、JS 停用時照常顯示、支援減少動態。
- 自訂網站圖示 `icon.svg`。
- SEO：`sitemap.xml`（含 hreflang）、每語系 OG 分享圖 `/<lang>/og.png`、Twitter card、JSON-LD `NailSalon`。
- 效能：中文標題字型改為建置時子集化（131 KB），CSS 400+ KB → 42 KB。
- 無障礙：LINE 按鈕對比、Logo 連結名稱。
- Lighthouse（線上、手機）：zh-tw 96／100／100／100，vi 97／100／100／100。
- 發現：Windows 本機建置時 Next 16.4 的 `__PAGE__` 預取檔路徑有 bug；CI 在 Linux 建置正常（線上確認 200）。

**事故：全站 404**
- 原因：Pages Source 實際為「Deploy from a branch」，GitHub 內建的 `pages build and deployment` 與我們的 CI 同時部署；`68b6efc` 時內建部署較晚完成，把網站蓋成 repo 原始檔。
- 處理：使用者將 Source 改為 GitHub Actions，重新部署並確認；`CLAUDE.md` 已加入檢查方式。

**Plans/2 網站名稱修改**（詳見 `Plans/2-網站名稱修改實作.md`）
- 店名改為「嬌仙美甲」，外文名 Kieu Tien Nail（越南語 Kiều Tiên Nail）；地址改為新北市三峽區忠孝街 25 號。
- 移除不適用的捷運交通說明與舊台北座標；分享圖、子集字型、JSON-LD 隨建置更新。

**Plans/3 手機漢堡選單沒作用**（詳見 `Plans/3-手機實作.md`）
- 原因：選單寫在有 `backdrop-filter` 的 header 裡，fixed 定位以 header 為基準，高度變成 0。
- 修正：選單移到 header 外，`z-index` 蓋住聊天按鈕，加上 Esc 關閉；用無頭 Edge 實際點擊驗證（高度 0 → 772px）。

**待辦／下一步**
- [x] 使用者到 GitHub repo → Settings → Pages → Source 選「GitHub Actions」（只需一次）
- [x] 店名、地址
- [ ] 提供電話、營業時間、價目、LINE/Zalo 連結、交通說明、店家經緯度
- [ ] 提供店內與作品照片，替換佔位圖
- [x] 階段 3-A：捲動淡入動畫、sitemap／OG 圖、Lighthouse 檢查
- [ ] 上線正式網域後，到 Google Search Console 提交 `sitemap.xml`
