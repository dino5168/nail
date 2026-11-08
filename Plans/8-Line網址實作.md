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
