import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatIcon, ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { PageHero } from "@/components/sections";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "contact", dict, dict.contact.lead);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.contact;

  // 越南語版把 Zalo 放在前面
  const lineBtn = { label: c.lineButton, url: site.lineUrl, color: "bg-[#06c755]" };
  const zaloBtn = { label: c.zaloButton, url: site.zaloUrl, color: "bg-[#0068ff]" };
  const chatButtons = lang === "vi" ? [zaloBtn, lineBtn] : [lineBtn, zaloBtn];

  return (
    <>
      <PageHero title={c.title} lead={c.lead} />

      <section className="container-page grid gap-12 py-20 md:grid-cols-2 md:py-28">
        {/* 店家資訊 */}
        <div className="space-y-9">
          <div className="flex gap-4">
            <PinIcon className="mt-1 h-6 w-6 shrink-0 text-blush-500" />
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted">{c.addressLabel}</h2>
              <p className="mt-2 text-lg">{c.address}</p>
              <p className="mt-1 text-sm text-muted">{c.transit}</p>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-plum-700 underline underline-offset-4 hover:text-plum-900">
                {c.mapButton}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <PhoneIcon className="mt-1 h-6 w-6 shrink-0 text-blush-500" />
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted">{c.phoneLabel}</h2>
              <a href={site.phoneHref} className="mt-2 block text-lg hover:text-plum-700">{site.phone}</a>
            </div>
          </div>
          <div className="flex gap-4">
            <MailIcon className="mt-1 h-6 w-6 shrink-0 text-blush-500" />
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted">{c.emailLabel}</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block text-lg hover:text-plum-700">{site.email}</a>
            </div>
          </div>
          <div className="flex gap-4">
            <ClockIcon className="mt-1 h-6 w-6 shrink-0 text-blush-500" />
            <div className="flex-1">
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted">{c.hoursLabel}</h2>
              <dl className="mt-2 max-w-sm divide-y divide-blush-200">
                {c.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-2">
                    <dt>{h.days}</dt>
                    <dd className="text-muted">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* 預約方式 */}
        <div className="bg-white p-8 shadow-card md:p-10">
          <h2 className="heading-display text-3xl">{c.bookingTitle}</h2>
          <p className="mt-4 leading-relaxed text-muted">{c.bookingText}</p>
          <div className="mt-8 grid gap-3">
            {chatButtons.map((b) => (
              <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${b.color}`}>
                <ChatIcon className="h-5 w-5" />
                {b.label}
              </a>
            ))}
            <a href={site.phoneHref} className="btn-primary py-4">
              <PhoneIcon className="h-5 w-5" />
              {c.callButton}
            </a>
          </div>
          <div className="mt-10 border-t border-blush-200 pt-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-muted">{c.followTitle}</h3>
            <div className="mt-4 flex gap-3">
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-blush-300 text-plum-700 hover:bg-blush-100">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-blush-300 text-plum-700 hover:bg-blush-100">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
