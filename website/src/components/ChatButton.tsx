import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { ChatIcon } from "./icons";

/** 右下角浮動聊天按鈕：兩種語系都連到 LINE 官方帳號 */
export function ChatButton({ chat }: { chat: Dictionary["chat"] }) {
  return (
    <a
      href={site.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      // LINE 綠底配白字對比不足（2.25:1），改用深色字
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#06c755] px-4 py-3 text-sm font-medium text-ink shadow-lg transition-transform hover:-translate-y-0.5"
    >
      <ChatIcon className="h-5 w-5" />
      <span className="hidden sm:inline">{chat.label}</span>
      <span className="sm:hidden">LINE</span>
    </a>
  );
}
