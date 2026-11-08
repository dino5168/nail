import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { fillFacts, hoursText } from "@/lib/facts";
import { SectionHeading } from "./sections";

/**
 * 首頁「店家資訊一覽」：用一段完整句子＋條列，把店名、地點、電話、營業時間、語言、價格寫成純文字。
 * 這是給 AI 搜尋（GEO）直接引用的區塊，資料全部來自 site.ts／services.ts／字典。
 */
export function ShopFacts({ dict }: { dict: Dictionary }) {
  const f = dict.facts;
  const link = "text-plum-700 underline underline-offset-4 hover:text-plum-900";
  const rows: [string, React.ReactNode][] = [
    [f.labels.address, <a key="a" href={site.mapUrl} target="_blank" rel="noopener noreferrer" className={link}>{dict.contact.address}</a>],
    [f.labels.phone, <a key="p" href={site.phoneHref} className={link}>{site.phone}</a>],
    [f.labels.line, <a key="l" href={site.lineUrl} target="_blank" rel="noopener noreferrer" className={link}>{f.lineText} · {site.lineUrl.replace(/^https:\/\//, "")}</a>],
    [f.labels.hours, hoursText(dict)],
    [f.labels.languages, f.languages],
    [f.labels.price, fillFacts(f.price, dict)],
    [f.labels.booking, f.booking],
  ];
  return (
    <section className="container-page py-20 md:py-28" aria-labelledby="shop-facts">
      <SectionHeading title={f.title} />
      <div data-reveal className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
        <p id="shop-facts" className="leading-relaxed text-ink/85">{fillFacts(f.summary, dict)}</p>
        <dl className="divide-y divide-blush-200 border-y border-blush-200 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3">
              <dt className="text-muted">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
