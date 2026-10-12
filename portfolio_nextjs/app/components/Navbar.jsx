"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary } from "../i18n/dictionaries";
import { localeFromPath, localizedPath } from "../i18n/config";
import { FiCode, FiFolder, FiBookOpen, FiBriefcase, FiAward, FiEdit3, FiUser, FiGlobe, FiHeart, FiMail, FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "/skills", label: "Yetenekler", icon: FiCode },
  { href: "/projects", label: "Projeler", icon: FiFolder },
  { href: "/educations", label: "Eğitim", icon: FiBookOpen },
  { href: "/experiences", label: "Deneyim", icon: FiBriefcase },
  { href: "/certificates", label: "Sertifikalar", icon: FiAward },
  { href: "/blog", label: "Blog", icon: FiEdit3 },
  { href: "/about", label: "Hakkımda", icon: FiUser },
  { href: "/languages", label: "Diller", icon: FiGlobe },
  { href: "/hobbies", label: "Hobiler", icon: FiHeart },
  { href: "/contact", label: "İletişim", icon: FiMail },
];

export default function Navbar() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const dictionary = getDictionary(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const position = Math.max(0, window.scrollY);
      const difference = position - previous;
      if (position <= 20) {
        previous = position;
        setIsHidden(false);
      } else if (Math.abs(difference) >= 12) {
        previous = position;
        setIsHidden(difference > 0);
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const renderLinks = (mobile = false) =>
    links.map(({ href, label, icon: Icon }, index) => {
      const localizedHref = localizedPath(href, locale);
      const isActive = pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
      return (
        <Link
          key={href}
          href={localizedHref}
          className="site-nav__link"
          style={{ "--nav-index": index }}
          aria-current={isActive ? "page" : undefined}
          onClick={() => mobile && setIsOpen(false)}
        >
          <Icon className="site-nav__link-icon" aria-hidden="true" />
          <span>{dictionary.nav[href.slice(1)] || label}</span>
        </Link>
      );
    });

  return (
    <header className={`site-nav${isHidden && !isOpen ? " site-nav--hidden" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <nav className="site-nav__inner" aria-label={locale === "en" ? "Main navigation" : "Ana menü"}>
        <Link
          href={localizedPath("/", locale)}
          className="site-brand"
          aria-label={locale === "en" ? "Ömer Öztürk home" : "Ömer Öztürk ana sayfa"}
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/ozturkomer.webp"
            alt=""
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="site-brand__copy"><span>Ömer Öztürk</span><span className="site-brand__hint" aria-hidden="true">&lt;/&gt; portfolio</span></span>
        </Link>

        <div className="site-nav__links">{renderLinks()}</div>

        <div className="site-nav__actions">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            ref={menuButton}
            type="button"
            className="site-nav__menu-button"
            aria-label={locale === "en" ? (isOpen ? "Close menu" : "Open menu") : (isOpen ? "Menüyü kapat" : "Menüyü aç")}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => { setIsHidden(false); setIsOpen((open) => !open); }}
          >
            {isOpen ? <FiX aria-hidden="true" size={18} /> : <FiMenu aria-hidden="true" size={18} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="site-nav__mobile-links">
          {renderLinks(true)}
        </div>
      )}
    </header>
  );
}
