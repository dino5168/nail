import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PersonAvatar } from "@/components/illustrations";
import { asset } from "@/config/site";
import { CtaBanner, PageHero, SectionHeading } from "@/components/sections";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "about", dict, dict.about.lead);
}

// 人物圖示配色：[人形, 背景]
const avatarColors: [string, string][] = [
  ["#8e2a6e", "#f6c9dc"],
  ["#b23a7a", "#fbe3ea"],
  ["#9b6bb5", "#efe3f6"],
];

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const a = dict.about;

  return (
    <>
      <PageHero title={a.title} lead={a.lead} />

      <section className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        <div data-reveal className="relative">
          <figure className="relative">
            {/* Pexels 圖庫照片（RDNE Stock project，https://www.pexels.com/photo/7755182/），換成店內照片後拿掉「示意圖」 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/about-story.webp")}
              alt={a.storyImageAlt}
              title="Photo: RDNE Stock project / Pexels"
              width={900}
              height={900}
              className="aspect-square w-full object-cover"
            />
            <figcaption className="absolute bottom-3 right-4 text-[0.65rem] uppercase tracking-widest text-white/80 drop-shadow">
              {dict.common.placeholderNote}
            </figcaption>
          </figure>
          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-blush-400" />
        </div>
        <div data-reveal="1">
          <h2 className="heading-display text-3xl md:text-4xl">{a.storyTitle}</h2>
          <div className="mt-8 space-y-5 leading-relaxed text-ink/85">
            {a.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/70">
        <div className="container-page py-20 md:py-28">
          <SectionHeading title={a.valuesTitle} />
          <ul className="grid gap-6 md:grid-cols-3">
            {a.values.map((v, i) => (
              <li key={v.title} data-reveal={String(i + 1)} className="border-t-2 border-blush-400 pt-6">
                <span className="font-display text-4xl text-blush-400">0{i + 1}</span>
                <h3 className="heading-display mt-3 text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <SectionHeading title={a.teamTitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {a.team.map((m, i) => (
            <li key={m.name} data-reveal={String(i + 1)} className="bg-blush-50 p-6">
              <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-card">
                <PersonAvatar colors={avatarColors[i % avatarColors.length]} className="h-full w-full" />
              </div>
              <h3 className="heading-display mt-6 text-center text-2xl">{m.name}</h3>
              <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-plum-500">{m.role}</p>
              <p className="mt-4 text-center text-sm leading-relaxed text-muted">{m.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner locale={lang} dict={dict} />
    </>
  );
}
