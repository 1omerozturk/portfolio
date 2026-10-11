"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary } from "../i18n/dictionaries";
import { localeFromPath, localizedPath } from "../i18n/config";

const links = [
  { href: "/skills", label: "Yetenekler" },
  { href: "/projects", label: "Projeler" },
  { href: "/educations", label: "Eğitim" },
  { href: "/experiences", label: "Deneyim" },
  { href: "/certificates", label: "Sertifikalar" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Hakkımda" },
  { href: "/languages", label: "Diller" },
  { href: "/hobbies", label: "Hobiler" },
  { href: "/contact", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const dictionary = getDictionary(locale);
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef(null);

  const renderLinks = (mobile = false) =>
    links.map(({ href, label }) => {
      const localizedHref = localizedPath(href, locale);
      const isActive = pathname === localizedHref || pathname.startsWith(`${localizedHref}/`);
      return (
        <Link
          key={href}
          href={localizedHref}
          className="site-nav__link"
          aria-current={isActive ? "page" : undefined}
          onClick={() => mobile && setIsOpen(false)}
        >
          {dictionary.nav[href.slice(1)] || label}
        </Link>
      );
    });

  return (
    <header className="site-nav" onKeyDown={(event) => {
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
          <span>Ömer Öztürk</span>
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
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
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
