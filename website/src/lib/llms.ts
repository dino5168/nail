// llms.txt（https://llmstxt.org/）：給 AI 搜尋／大型語言模型閱讀的 Markdown 店家說明。
// 建置時由字典與 config/site.ts、data/services.ts 產生，資料修改後自動同步。
import { site } from "@/config/site";
import { services } from "@/data/services";
import { href, locales, pageKeys, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { fillFacts, hoursText, priceRange } from "@/lib/facts";
import { absolute } from "@/lib/metadata";

const langName: Record<Locale, string> = { "zh-tw": "繁體中文", vi: "Tiếng Việt" };

const englishSummary = [
  "Kieu Tien Nail (嬌仙美甲, Kiều Tiên Nail) is a nail salon in Sanxia District, New Taipei City, Taiwan.",
  "Services: gel manicure, hand-painted nail art, French and cat-eye gel, gel and acrylic nail extensions, pedicure and foot spa, paraffin hand treatment, and gel removal.",
  "Staff speak Mandarin Chinese and Vietnamese. Appointments are required and can be booked via LINE or phone.",
].join(" ");

function factLines(dict: Dictionary): string[] {
  const f = dict.facts;
  return [
    `- ${f.labels.address}: ${dict.contact.address}`,
    `- ${f.labels.phone}: ${site.phone}`,
    `- ${f.labels.line}: ${site.lineUrl}`,
    `- ${f.labels.hours}: ${hoursText(dict)}`,
    `- ${f.labels.languages}: ${f.languages}`,
    `- ${f.labels.price}: ${fillFacts(f.price, dict)}`,
    `- ${f.labels.booking}: ${f.booking}`,
  ];
}

function pageLinks(locale: Locale, dict: Dictionary): string[] {
  const desc: Record<(typeof pageKeys)[number], string> = {
    home: dict.meta.description,
    about: dict.about.lead,
    services: dict.services.lead,
    gallery: dict.gallery.lead,
    contact: dict.contact.lead,
    faq: dict.faq.lead,
  };
  return pageKeys.map((p) => `- [${dict.nav[p]}](${absolute(href(locale, p))}): ${desc[p]}`);
}

/** /llms.txt：精簡版（摘要＋重要資訊＋頁面連結） */
export async function buildLlmsTxt(): Promise<string> {
  const zh = await getDictionary("zh-tw");
  const out = [
    `# 嬌仙美甲 Kieu Tien Nail`,
    "",
    `> ${fillFacts(zh.facts.summary, zh)}`,
    "",
    englishSummary,
    "",
    "## 店家資訊 / Key facts",
    "",
    ...factLines(zh),
    `- Address (English): ${site.addressEn}`,
    `- Price range: ${priceRange}`,
    `- Google Maps: ${site.mapUrl}`,
  ];
  for (const locale of locales) {
    const dict = await getDictionary(locale);
    out.push("", `## ${langName[locale]}`, "", ...pageLinks(locale, dict));
  }
  out.push("", "## Optional", "", `- [完整內容 Full content](${absolute("/llms-full.txt")}): 價目表、常見問題與店家介紹全文（中文、越南語）`);
  return out.join("\n") + "\n";
}

/** /llms-full.txt：完整版（各語系的店家介紹、價目表、常見問題全文） */
export async function buildLlmsFullTxt(): Promise<string> {
  const out = [`# 嬌仙美甲 Kieu Tien Nail — Full content`, "", englishSummary, "", `- Address (English): ${site.addressEn}`, `- Phone: ${site.phone}`, `- LINE: ${site.lineUrl}`, `- Price range: ${priceRange}`];
  for (const locale of locales) {
    const d = await getDictionary(locale);
    out.push("", `## ${langName[locale]}`, "", fillFacts(d.facts.summary, d), "", ...factLines(d));
    out.push("", `### ${d.about.storyTitle}`, "", ...d.about.story.flatMap((p) => [p, ""]));
    out.push(`### ${d.services.title}`, "", d.services.lead, "", `| ${d.services.table.service} | ${d.services.table.duration} | ${d.services.table.price} |`, "|---|---|---|");
    for (const s of services) {
      const item = d.services.items[s.id];
      const price = `NT$${s.price.toLocaleString("en-US")}${s.from ? d.common.fromSuffix : ""}`;
      out.push(`| ${d.services.categories[s.category].name}／${item.name}：${item.desc} | ${d.common.minutes.replace("{n}", String(s.duration))} | ${price} |`);
    }
    out.push("", d.services.note, "", `### ${d.faq.title}`, "");
    for (const item of d.faq.items) out.push(`**${item.q}**`, "", fillFacts(item.a, d), "");
    out.push(`- ${absolute(href(locale))}`);
  }
  return out.join("\n") + "\n";
}

export const textResponse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
