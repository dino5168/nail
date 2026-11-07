import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryTile } from "@/components/GalleryGrid";
import { ArrowIcon } from "@/components/icons";
import { HeroNails, LeafDecor } from "@/components/illustrations";
import { CtaBanner, SectionHeading, ServiceRows, WhyChooseUs } from "@/components/sections";
import { gallery } from "@/data/gallery";
import { services } from "@/data/services";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "home", await getDictionary(lang));
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { hero, intro } = dict.home;
  const featured = services.filter((s) => s.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow -left-40 top-1/3 h-96 w-96" />
        <div className="container-page grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="order-2 pb-16 lg:order-1 lg:py-28">
            <h1 className="heading-display text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 text-lg">{hero.subtitle}</p>
            <Link href={href(lang, "services")} className="btn-primary mt-9 max-sm:w-full">
              {hero.cta}
            </Link>
          </div>
          <div className="relative order-1 -mx-5 lg:order-2 lg:mx-0">
            <HeroNails className="relative mx-auto h-auto w-full max-w-[560px] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
          </div>
        </div>
      </section>

      <WhyChooseUs why={dict.home.why} />

      {/* 品牌介紹：後半段文字漸淡（仿參考圖） */}
      <section className="relative overflow-hidden">
        <LeafDecor className="absolute -right-10 bottom-0 h-72 w-72 text-white/70" />
        <div className="container-page relative py-16 md:py-24">
          <p className="text-sm text-muted">{intro.eyebrow}</p>
          <p className="heading-display mt-5 max-w-4xl text-2xl leading-snug md:text-[2.4rem]">
            {intro.strong}
            <span className="text-ink/30">{intro.faded}</span>
          </p>
          <Link
            href={href(lang, "about")}
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-plum-700 hover:gap-3"
          >
            {dict.common.learnMore}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 熱門服務 */}
      <section className="bg-white/70">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            title={dict.home.services.title}
            subtitle={dict.home.services.subtitle}
            action={
              <Link href={href(lang, "services")} className="btn-outline self-start">
                {dict.common.allServices}
              </Link>
            }
          />
          <ServiceRows items={featured} dict={dict} />
        </div>
      </section>

      {/* 作品精選 */}
      <section className="container-page py-20 md:py-28">
        <SectionHeading
          title={dict.home.gallery.title}
          subtitle={dict.home.gallery.subtitle}
          action={
            <Link href={href(lang, "gallery")} className="btn-outline self-start">
              {dict.common.viewGallery}
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {gallery.slice(0, 4).map((item, i) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={i}
              label={dict.gallery.categories[item.category]}
              note={dict.common.placeholderNote}
            />
          ))}
        </div>
      </section>

      <CtaBanner locale={lang} dict={dict} />
    </>
  );
}
