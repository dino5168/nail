import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "faq", dict, dict.faq.lead);
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const f = dict.faq;

  return (
    <>
      <PageHero title={f.title} lead={f.lead} />
      <section className="container-page max-w-3xl py-16 md:py-24">
        <div className="divide-y divide-blush-200 border-y border-blush-200">
          {f.items.map((item, i) => (
            <details key={item.q} className="group py-2" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-plum-700 after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-plum-700 after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="pb-5 pr-10 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 text-center shadow-card">
          <h2 className="heading-display text-2xl">{f.moreTitle}</h2>
          <p className="mt-3 text-muted">{f.moreText}</p>
          <Link href={href(lang, "contact")} className="btn-primary mt-6">
            {dict.nav.contact}
          </Link>
        </div>
      </section>
    </>
  );
}
