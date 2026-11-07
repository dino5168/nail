import { site } from "@/config/site";
import { href, htmlLang, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { absolute } from "@/lib/metadata";

/** schema.org NailSalon 結構化資料，協助 Google 顯示店家資訊 */
export function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "@id": absolute("/#salon"),
    name: dict.meta.siteName,
    description: dict.meta.description,
    url: absolute(href(locale)),
    image: absolute(`/${locale}/og.png`),
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    inLanguage: htmlLang[locale],
    address: { "@type": "PostalAddress", ...site.address },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.instagramUrl, site.facebookUrl],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify 後把 < 轉義，避免字串內容提前結束 <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
