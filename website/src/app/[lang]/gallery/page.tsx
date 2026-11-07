import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CtaBanner, PageHero } from "@/components/sections";
import { gallery } from "@/data/gallery";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "gallery", dict, dict.gallery.lead);
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHero title={dict.gallery.title} lead={dict.gallery.lead} />
      <section className="container-page py-16 md:py-24">
        <GalleryGrid items={gallery} dict={dict} />
      </section>
      <CtaBanner locale={lang} dict={dict} />
    </>
  );
}
