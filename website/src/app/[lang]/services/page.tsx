import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner, PageHero, ServiceRows } from "@/components/sections";
import { serviceCategories, services } from "@/data/services";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "services", dict, dict.services.lead);
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const s = dict.services;

  return (
    <>
      <PageHero title={s.title} lead={s.lead} />

      {/* 分類快速跳轉 */}
      <nav className="sticky top-[72px] z-20 border-b border-blush-200 bg-blush-100/95 backdrop-blur" aria-label={s.title}>
        <ul className="container-page flex gap-6 overflow-x-auto py-3 text-sm">
          {serviceCategories.map((c) => (
            <li key={c} className="shrink-0">
              <a href={`#${c}`} className="text-muted hover:text-plum-700">
                {s.categories[c].name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-page space-y-20 py-20">
        {serviceCategories.map((c) => (
          <section key={c} id={c} className="scroll-mt-36 grid gap-8 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="heading-display text-3xl">{s.categories[c].name}</h2>
              <p className="mt-3 text-muted">{s.categories[c].desc}</p>
            </div>
            <ServiceRows items={services.filter((x) => x.category === c)} dict={dict} />
          </section>
        ))}
        <p className="text-sm text-muted">{s.note}</p>
      </div>

      <CtaBanner locale={lang} dict={dict} />
    </>
  );
}
