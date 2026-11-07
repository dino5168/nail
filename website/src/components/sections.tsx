import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { formatPrice, type Service } from "@/data/services";
import { CertificateIcon, PerfumeIcon, PolishIcon, SpaIcon } from "./icons";
import { LeafDecor } from "./illustrations";

/** 內頁頂部標題區 */
export function PageHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="relative overflow-hidden border-b border-blush-200 bg-blush-50">
      <div className="glow -left-24 -top-24 h-72 w-72" />
      {/* 下方容器有 relative，文字會疊在光暈之上 */}
      <LeafDecor className="absolute -bottom-6 right-4 h-44 w-44 text-blush-200 md:right-24" />
      <div className="container-page relative py-16 md:py-24">
        <h1 className="heading-display text-4xl md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="heading-display text-3xl md:text-[2.6rem]">{title}</h2>
        {subtitle && <p className="mt-3 max-w-xl text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const whyIcons = [PolishIcon, PerfumeIcon, CertificateIcon, SpaIcon];

/** 為什麼選擇我們：四欄卡片 */
export function WhyChooseUs({ why }: { why: Dictionary["home"]["why"] }) {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading title={why.title} />
      <ul data-reveal="1" className="grid gap-px border border-blush-200 bg-blush-200 sm:grid-cols-2 lg:grid-cols-4">
        {why.items.map((item, i) => {
          const Icon = whyIcons[i % whyIcons.length];
          return (
            <li
              key={item.title}
              className="group relative bg-blush-50 p-8 transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:bg-white hover:shadow-card"
            >
              <Icon className="h-14 w-14 text-blush-400 transition-colors group-hover:text-blush-500" />
              <h3 className="heading-display mt-10 text-xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** 服務列表（名稱、說明、時間、價格） */
export function ServiceRows({ items, dict }: { items: Service[]; dict: Dictionary }) {
  return (
    <ul data-reveal="1" className="divide-y divide-blush-200 border-y border-blush-200">
      {items.map((s) => {
        const text = dict.services.items[s.id];
        return (
          <li key={s.id} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-5">
            <h3 className="font-medium">{text.name}</h3>
            <p className="text-right font-display text-xl text-plum-700">
              {formatPrice(s.price)}
              {s.from && <span className="ml-1 text-sm text-muted">{dict.common.fromSuffix}</span>}
            </p>
            <p className="text-sm text-muted">{text.desc}</p>
            <p className="text-right text-sm text-muted">
              {dict.common.minutes.replace("{n}", String(s.duration))}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/** 預約 CTA 橫幅 */
export function CtaBanner({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const cta = dict.home.cta;
  return (
    <section className="container-page pb-20 md:pb-28">
      <div data-reveal className="relative overflow-hidden bg-blush-400 px-8 py-14 text-center md:px-16 md:py-20">
        <LeafDecor className="absolute -left-6 -top-6 h-40 w-40 text-white/25" />
        <LeafDecor className="absolute -bottom-8 -right-6 h-48 w-48 rotate-180 text-white/25" />
        <h2 className="heading-display relative text-3xl md:text-5xl">{cta.title}</h2>
        <p className="relative mx-auto mt-5 max-w-xl text-ink/80">{cta.text}</p>
        <Link
          href={href(locale, "contact")}
          className="relative mt-8 inline-flex items-center bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-plum-900"
        >
          {cta.button}
        </Link>
      </div>
    </section>
  );
}
