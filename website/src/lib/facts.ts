// 店家「事實」的單一來源：首頁店家資訊、FAQ、JSON-LD、llms.txt 都從這裡取值，
// 改電話、地址、營業時間或價目時，只需改 config/site.ts、data/services.ts 與字典。
import { site } from "@/config/site";
import { services } from "@/data/services";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";

const prices = services.map((s) => s.price);
export const priceMin = Math.min(...prices);
export const priceMax = Math.max(...prices);
const fmt = (n: number) => n.toLocaleString("en-US");

/** schema.org priceRange，例如 "NT$300–2,000" */
export const priceRange = `NT$${fmt(priceMin)}–${fmt(priceMax)}`;

/** E.164 電話（+886...），給 JSON-LD 使用 */
export const phoneE164 = site.phoneHref.replace(/^tel:/, "");

/** 營業時間的一行文字，例如「週二至週五 11:00 – 21:00；…」 */
export const hoursText = (dict: Dictionary) =>
  dict.contact.hours.map((h) => `${h.days} ${h.time}`).join(dict.facts.listSep);

/** 把字典文字中的 {address}、{phone}、{line}、{hours}、{priceMin}、{priceMax} 換成實際資料 */
export function fillFacts(text: string, dict: Dictionary): string {
  const values: Record<string, string> = {
    address: dict.contact.address,
    phone: site.phone,
    line: site.lineUrl,
    hours: hoursText(dict),
    priceMin: fmt(priceMin),
    priceMax: fmt(priceMax),
  };
  return text.replace(/\{(\w+)\}/g, (m, key: string) => values[key] ?? m);
}

/** 實際存在的社群連結（還是預設首頁的示範連結不輸出，避免 AI 抓到錯誤資料） */
export const sameAs = [site.lineUrl, site.instagramUrl, site.facebookUrl].filter(
  (url) => new URL(url).pathname.length > 1,
);
