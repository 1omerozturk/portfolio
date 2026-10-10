import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import SocialBanner from "./SocialBanner";

const navigation = [
  { href: "/about", label: "Hakkımda" },
  { href: "/skills", label: "Yetenekler" },
  { href: "/projects", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link href="/" className="site-footer__brand">Ömer Öztürk</Link>
          <p className="mt-2 max-w-sm text-sm text-quiet">
            Web ve mobil uygulamalar geliştiren yazılım mühendisi.
          </p>
        </div>

        <nav className="site-footer__links" aria-label="Alt menü">
          {navigation.map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
        </nav>

        <div className="site-footer__social" aria-label="İletişim ve sosyal medya bağlantıları">
          <a href="mailto:omer.ozturk.or.ok@gmail.com" aria-label="Ömer Öztürk'e e-posta gönder"><FaRegEnvelope /></a>
          <SocialBanner />
        </div>
      </div>
      <div className="site-footer__copyright">
        © {new Date().getFullYear()} Ömer Öztürk
      </div>
    </footer>
  );
}
