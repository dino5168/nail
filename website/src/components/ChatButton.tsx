import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { ChatIcon } from "./icons";

/** 右下角浮動聊天按鈕：中文版連 LINE、越南語版連 Zalo */
export function ChatButton({ chat }: { chat: Dictionary["chat"] }) {
  const isLine = chat.channel === "line";
  return (
    <a
      href={isLine ? site.lineUrl : site.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      // LINE 綠底配白字對比不足（2.25:1），改用深色字；Zalo 藍底白字為 4.9:1
      className={`fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium shadow-lg transition-transform hover:-translate-y-0.5 ${
        isLine ? "bg-[#06c755] text-ink" : "bg-[#0068ff] text-white"
      }`}
    >
      <ChatIcon className="h-5 w-5" />
      <span className="hidden sm:inline">{chat.label}</span>
      <span className="sm:hidden">{isLine ? "LINE" : "Zalo"}</span>
    </a>
  );
}
