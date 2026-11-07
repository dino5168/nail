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
      className={`fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5 ${
        isLine ? "bg-[#06c755]" : "bg-[#0068ff]"
      }`}
    >
      <ChatIcon className="h-5 w-5" />
      <span className="hidden sm:inline">{chat.label}</span>
      <span className="sm:hidden">{isLine ? "LINE" : "Zalo"}</span>
    </a>
  );
}
