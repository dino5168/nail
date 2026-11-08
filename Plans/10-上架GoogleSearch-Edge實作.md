# 10-上架GoogleSearch-Edge實作

> 來源需求：[[10-上架GoogleSearch-Edge]]　｜　進度：`Progress.md`

## 需求

1. 上架 Google 搜尋：登錄 https://dino5168.github.io/nail/zh-tw/ 、 https://dino5168.github.io/nail/vi/
2. 上架 Microsoft 搜尋（Bing／Edge）。

## Google Search Console（2026-11-08，✅ 完成）

- [x] 新增資源：**網址前置字元** `https://dino5168.github.io/nail/`（一個資源涵蓋 `/zh-tw/` 與 `/vi/`；「網域」資源需要 DNS 驗證，github.io 無法設定）。
- [x] 驗證擁有權：HTML 檔案法，`website/public/googlec0196776f2e548ff.html`（commit `7afd9ea`）→ 線上 `/nail/googlec0196776f2e548ff.html`。**驗證成功。此檔案不可刪除**，刪除後會失去驗證。
- [x] 提交 Sitemap：`https://dino5168.github.io/nail/sitemap.xml`（12 個網址，含 hreflang）。剛提交時狀態顯示「無法擷取」，這是新資源常見的暫時狀態；檢查過 sitemap 線上回應 200、XML 格式正確，通常 1～2 天內會變成「成功」。
- [x] 網址審查 →「要求建立索引」：`/nail/zh-tw/`、`/nail/vi/` 都已加入優先檢索佇列。

## Microsoft Bing（Edge 的搜尋引擎）

### IndexNow（✅ 已送出）

- [x] Bing 官方的網址通知協定，不需登入。金鑰檔 `website/public/e4cd882950e7af19595f33d4c141c709.txt`（commit `33de920`）→ 線上 `/nail/e4cd882950e7af19595f33d4c141c709.txt`。**此檔案不可刪除。**
- [x] 已把 sitemap 的 12 個網址送到 `https://www.bing.com/indexnow`，回應 202（已接收）。IndexNow 也會同步通知 Yandex、Naver 等搜尋引擎。
- 之後網站有大幅更新時，可以用同樣方式再通知一次（見下方指令）。

```bash
KEY=e4cd882950e7af19595f33d4c141c709
curl -X POST https://www.bing.com/indexnow -H "Content-Type: application/json; charset=utf-8" \
  -d '{"host":"dino5168.github.io","key":"'$KEY'","keyLocation":"https://dino5168.github.io/nail/'$KEY'.txt","urlList":["https://dino5168.github.io/nail/zh-tw/","https://dino5168.github.io/nail/vi/"]}'
```

### Bing Webmaster Tools（⏳ 等使用者登入）

Bing Webmaster Tools 需要登入（Microsoft、Google 或 Facebook 帳號）。登入會建立 Webmaster 帳號並授權存取帳號，必須由使用者本人操作。登入後的步驟：

1. 選「從 Google Search Console 匯入」（最快，會一併匯入已驗證的網站與 sitemap），或手動新增網站 `https://dino5168.github.io/nail/`。
2. 手動新增時，用 XML 檔（`BingSiteAuth.xml`）或 meta 標記驗證，再提交 `sitemap.xml`。
