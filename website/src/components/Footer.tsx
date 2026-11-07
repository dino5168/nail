import Link from "next/link";
import { site } from "@/config/site";
import { href, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { FacebookIcon, InstagramIcon } from "./icons";
import { Logo } from "./Logo";

const links: PageKey[] = ["about", "services", "gallery", "contact", "faq"];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-plum-900 text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo brand={dict.brand} light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{dict.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 hover:bg-white/10">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 hover:bg-white/10">
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-blush-300">{dict.footer.quickLinks}</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {links.map((page) => (
              <li key={page}>
                <Link href={href(locale, page)} className="hover:text-white">
                  {dict.nav[page]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.25em] text-blush-300">{dict.footer.contactTitle}</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>{dict.contact.address}</li>
            <li>
              <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
            </li>
            {dict.contact.hours.map((h) => (
              <li key={h.days}>
                {h.days}　{h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-xs text-white/50">
          © {year} {dict.meta.siteName}　{dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
