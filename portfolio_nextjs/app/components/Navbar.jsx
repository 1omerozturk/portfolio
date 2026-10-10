"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/skills", label: "Yetenekler" },
  { href: "/projects", label: "Projeler" },
  { href: "/educations", label: "Eğitim" },
  { href: "/experiences", label: "Deneyim" },
  { href: "/certificates", label: "Sertifikalar" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Hakkımda" },
  { href: "/contact", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef(null);

  const renderLinks = (mobile = false) =>
    links.map(({ href, label }) => {
      const isActive = pathname === href || pathname.startsWith(`${href}/`);
      return (
        <Link
          key={href}
          href={href}
          className="site-nav__link"
          aria-current={isActive ? "page" : undefined}
          onClick={() => mobile && setIsOpen(false)}
        >
          {label}
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
      <nav className="site-nav__inner" aria-label="Ana menü">
        <Link
          href="/"
          className="site-brand"
          aria-label="Ömer Öztürk ana sayfa"
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
          <button
            ref={menuButton}
            type="button"
            className="site-nav__menu-button"
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
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
