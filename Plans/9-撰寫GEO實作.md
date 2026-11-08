# 9-撰寫GEO實作

> 來源需求：[[9-撰寫GEO]]　｜　進度：`Progress.md`

## 需求

幫網站做 GEO（Generative Engine Optimization，讓 ChatGPT、Perplexity、Google AI 摘要等 AI 搜尋找得到、引用得正確）與 SEO。**GEO 優先，SEO 次要。**

## 決議

AI 搜尋引用網站內容時，最需要的是：**清楚的實體（哪一家店）＋可直接引用的事實句子＋結構化資料＋給 AI 的說明檔**。做法：

1. **一個事實來源**：新增 `src/lib/facts.ts`，電話、地址、LINE、營業時間、價格範圍全部從 `config/site.ts`、`data/services.ts` 與字典取值。字典文字用 `{phone}`、`{address}`、`{line}`、`{hours}`、`{priceMin}`、`{priceMax}` 佔位，畫面、JSON-LD、llms.txt 都會自動換成同一份資料。改電話或價目時不會有地方漏改。
2. **可直接引用的文字（GEO 核心）**
   - 首頁新增「店家資訊一覽」（越南語「Thông tin tiệm」）：一段完整的店家介紹句子＋地址、電話、LINE、營業時間、語言、價格範圍、預約方式條列。
   - 常見問題前面新增 4 題 AI 最常被問的問題：在哪裡、怎麼預約、營業時間、價格大約多少（答案由實際資料產生）。
   - 中文、越南語的 meta description 改成包含店名、完整地址、服務、語言、預約方式的句子。
3. **結構化資料（JSON-LD）**
   - NailSalon 加上：別名（嬌仙美甲／Kieu Tien Nail／Kiều Tiên Nail）、E.164 電話、地圖連結、服務地區、服務語言（中文、越南語）、預約聯絡方式（電話＋LINE）、創辦人、**完整價目表（OfferCatalog，13 項）**、價格範圍（由價目自動計算）。
   - 新增 WebSite 節點；常見問題頁新增 **FAQPage**。
   - 移除 Email 與 Instagram／Facebook：它們還是示範值（`.example` 信箱、社群首頁），放進結構化資料會讓 AI 引用錯誤資訊。社群連結換成真的帳號後會自動輸出到 `sameAs`。
4. **llms.txt**（https://llmstxt.org/ 的格式）：建置時產生
   - `/nail/llms.txt`：中英文店家摘要、重要資訊、中英文地址、兩種語系的頁面連結。
   - `/nail/llms-full.txt`：兩種語系的店家介紹、完整價目表、常見問題全文。
   - 加了英文摘要與英文地址（No. 25, Zhongxiao St., Sanxia Dist., New Taipei City 237, Taiwan），讓用英文詢問的 AI 也能對上。

### 沒有做的事與原因

- **robots.txt**：GitHub Pages 專案網站在 `/nail/` 底下，爬蟲只讀網域根目錄的 `https://dino5168.github.io/robots.txt`（目前 404 = 全部允許），放在 `/nail/` 不會生效。現況沒有封鎖任何 AI 爬蟲（GPTBot、ClaudeBot、PerplexityBot 等），不需處理。`llms.txt` 同理，標準位置是網域根目錄；放在 `/nail/llms.txt` 對有讀取網站路徑的 AI 工具仍有用，但效果有限。**改用自訂網域（例如 kieutiennail.com）後，robots.txt 與 llms.txt 才能放在根目錄**，這是之後最有效的一步。
- **Google 商家檔案（Google Business Profile）**：AI 搜尋與 Google 地圖對在地店家最依賴這個資料來源，但需要店家本人申請與驗證，無法在網站程式中完成。

## 做法（2026-11-08）

- [x] `src/lib/facts.ts`（新增）：價格範圍、E.164 電話、營業時間文字、`fillFacts()`、`sameAs` 過濾示範連結。
- [x] `src/config/site.ts`：新增 `addressEn`；刪除寫死的 `priceRange`（改由價目計算）。
- [x] `src/components/JsonLd.tsx`：改寫為 `@graph`（NailSalon＋WebSite），新增 `FaqJsonLd`。
- [x] `src/components/ShopFacts.tsx`（新增）：首頁「店家資訊一覽」。
- [x] `src/app/[lang]/page.tsx`：在預約 CTA 前加入 `ShopFacts`。
- [x] `src/app/[lang]/faq/page.tsx`：答案經 `fillFacts()`，加入 FAQPage JSON-LD。
- [x] `src/lib/llms.ts`、`src/app/llms.txt/route.ts`、`src/app/llms-full.txt/route.ts`（新增）。
- [x] 字典 `zh-tw.ts`、`vi.ts`：新增 `facts` 區塊、FAQ 新增 4 題、meta description 改寫。

## 驗證

- `npm run lint`、`npm run typecheck`、`npm run build`（`NEXT_PUBLIC_BASE_PATH=/nail`）都通過；建置輸出包含 `llms.txt`、`llms-full.txt`。
- 檢查建置後的 JSON-LD：NailSalon 有 19 個欄位、13 項價目、`sameAs` 只有 LINE、電話為 `+886909001261`；FAQ 頁有 FAQPage（中文 11 題）。
- 本機用無頭 Edge（CDP）截圖：首頁「店家資訊一覽」桌機與手機（越南語 390px）版面正常；FAQ 新題目顯示正確，佔位字都已換成實際資料。
- commit `d63d63c` 的 CI & Deploy ✅；線上 `/nail/llms.txt`、`/nail/llms-full.txt` 回應 200（text/plain; charset=utf-8），首頁有店家資訊與 OfferCatalog，FAQ 頁有 FAQPage。

## 之後（影響 GEO 最大的幾件事）

1. **換掉示範資料**：營業時間、價目、FAQ、創立年份、團隊成員目前仍是示範值，AI 會原樣引用。換成真實資料後，畫面、JSON-LD、llms.txt 會一起更新。
2. 申請並驗證 **Google 商家檔案**，名稱、地址、電話與網站完全一致（NAP 一致）。
3. 考慮**自訂網域**，讓 robots.txt、llms.txt 放在根目錄。
4. 填入真的 Instagram／Facebook 帳號（`config/site.ts`），會自動加入 `sameAs`。
