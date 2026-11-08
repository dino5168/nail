import { site } from "@/config/site";
import { services } from "@/data/services";
import { href, htmlLang, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { fillFacts, phoneE164, priceRange, sameAs } from "@/lib/facts";
import { absolute } from "@/lib/metadata";

const salonId = absolute("/#salon");

/** 輸出 <script type="application/ld+json"> */
function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify 後把 < 轉義，避免字串內容提前結束 <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}

/**
 * 全站共用的 schema.org 結構化資料：NailSalon（店家）＋ WebSite。
 * AI 搜尋與 Google 會用這些欄位理解「這是哪一家店、在哪、怎麼預約、賣什麼、多少錢」。
 */
export function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const founder = dict.about.team[0];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NailSalon",
        "@id": salonId,
        name: dict.meta.siteName,
        alternateName: ["嬌仙美甲", "Kieu Tien Nail", "Kiều Tiên Nail"],
        description: fillFacts(dict.facts.summary, dict),
        url: absolute(href(locale)),
        image: [absolute("/images/home-hero.webp"), absolute(`/${locale}/og.png`)],
        telephone: phoneE164,
        address: { "@type": "PostalAddress", ...site.address },
        hasMap: site.mapUrl,
        areaServed: { "@type": "AdministrativeArea", name: `${site.address.addressRegion}${site.address.addressLocality}` },
        knowsLanguage: ["zh-Hant-TW", "vi"],
        priceRange,
        currenciesAccepted: "TWD",
        openingHoursSpecification: site.openingHours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "reservations",
          telephone: phoneE164,
          url: site.lineUrl,
          availableLanguage: ["zh-Hant", "vi"],
        },
        founder: { "@type": "Person", name: founder.name, jobTitle: founder.role },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.services.title,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: dict.services.items[s.id].name,
              description: dict.services.items[s.id].desc,
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TWD",
              ...(s.from ? { minPrice: s.price } : { price: s.price }),
            },
          })),
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": absolute(`${href(locale)}#website`),
        url: absolute(href(locale)),
        name: dict.meta.siteName,
        inLanguage: htmlLang[locale],
        publisher: { "@id": salonId },
        about: { "@id": salonId },
      },
    ],
  };
  return <JsonLdScript data={data} />;
}

/** 常見問題頁的 FAQPage 結構化資料（AI 摘要最常引用的格式） */
export function FaqJsonLd({ dict }: { dict: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    about: { "@id": salonId },
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: fillFacts(item.a, dict) },
    })),
  };
  return <JsonLdScript data={data} />;
}
