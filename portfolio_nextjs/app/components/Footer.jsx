import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import SocialBanner from "./SocialBanner";
import { getLocale } from "../i18n/server";
import { getDictionary } from "../i18n/dictionaries";
import { localizedPath } from "../i18n/config";

const navigation = [
  { href: "/about", label: "Hakkımda" },
  { href: "/skills", label: "Yetenekler" },
  { href: "/projects", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
];

export default async function Footer() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link href={localizedPath("/", locale)} className="site-footer__brand">Ömer Öztürk</Link>
          <p className="mt-2 max-w-sm text-sm text-quiet">
            {locale === "en" ? "Software engineer building web and mobile applications." : "Web ve mobil uygulamalar geliştiren yazılım mühendisi."}
          </p>
        </div>

        <nav className="site-footer__links" aria-label={locale === "en" ? "Footer navigation" : "Alt menü"}>
          {navigation.map(({ href, label }) => <Link href={localizedPath(href, locale)} key={href}>{dictionary.nav[href.slice(1)] || label}</Link>)}
        </nav>

        <div className="site-footer__social" aria-label={locale === "en" ? "Contact and social profiles" : "İletişim ve sosyal medya bağlantıları"}>
          <a href="mailto:omer.ozturk.or.ok@gmail.com" aria-label={locale === "en" ? "Email Ömer Öztürk" : "Ömer Öztürk'e e-posta gönder"}><FaRegEnvelope /></a>
          <SocialBanner />
        </div>
      </div>
      <div className="site-footer__copyright">
        © {new Date().getFullYear()} Ömer Öztürk
      </div>
    </footer>
  );
}
