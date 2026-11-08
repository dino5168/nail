# 8-Line網址實作

> 來源需求：[[8-Line網址]]　｜　進度：`Progress.md`

## 需求

1. 「LINE 線上諮詢」改用 LINE QR Code 網址 https://lin.ee/9d0xj2B。
2. Zalo 也改成使用 LINE。

## 決議

- `https://lin.ee/9d0xj2B` 會轉址到 LINE 官方帳號 `@464ljglf`，直接使用這個短網址（之後 LINE 後台若更換帳號，短網址仍由 LINE 管理）。
- **全站移除 Zalo**：越南語版的浮動按鈕、聯絡頁按鈕、文案都改成 LINE。兩種語系共用同一個 LINE 連結。

## 做法（2026-11-08）

- [x] `src/config/site.ts`：`lineUrl` 改為 `https://lin.ee/9d0xj2B`，刪除 `zaloUrl`。
- [x] `src/components/ChatButton.tsx`：不再依語系切換，固定連 LINE（綠底深色字）。
- [x] `src/app/[lang]/contact/page.tsx`：預約區只保留 LINE 按鈕與電話按鈕。
- [x] 字典：刪除 `chat.channel`、`contact.zaloButton`；越南語浮動按鈕改為「Chat với chúng tôi qua LINE」，首頁預約 CTA、聯絡頁導言、FAQ 結尾的「Zalo, LINE」都改成只有 LINE。
- [x] `CLAUDE.md` 目錄說明同步更新；中文字型子集重新產生。

## 驗證

- `npm run lint`、`npm run typecheck`、`npm run build`（`NEXT_PUBLIC_BASE_PATH=/nail`）都通過。
- 建置輸出全站搜尋不到 zalo；中文與越南語聯絡頁各有 2 個連到 `https://lin.ee/9d0xj2B` 的連結（浮動按鈕＋預約按鈕）。
- commit `4e0c40c` 的 CI & Deploy ✅；線上中文與越南語聯絡頁都連到 `lin.ee/9d0xj2B`，搜尋不到 zalo。

## 追加：聯絡頁 LINE QR Code（2026-11-08）

使用者要求在聯絡頁加上 LINE QR Code。

- [x] 用 `qrcode` 套件（只在暫存目錄使用，不加進專案相依）把 `https://lin.ee/9d0xj2B` 產生成 SVG → `website/public/images/line-qr.svg`（1.2 KB，容錯等級 M）。用 jsQR 解碼確認內容正確。
- [x] 聯絡頁「預約方式」卡片在 LINE／電話按鈕下方加上 QR Code 區塊（QR Code＋「掃描加入 LINE 好友」說明），圖片經 `asset()`。
- [x] 字典新增 `contact.lineQrTitle`、`lineQrText`、`lineQrAlt`（中文、越南語）。
- 注意：**更換 LINE 網址時要重新產生 `line-qr.svg`**（程式註解也有寫）。
- `npm run lint`、`typecheck`、`build` 都通過；本機截圖確認版面正常。

