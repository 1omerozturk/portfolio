"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

const links = [
  ["Genel bakış", ""], ["Hakkımda", "/about"], ["Sosyal bağlantılar", "/social"],
  ["Eğitim", "/educations"], ["Deneyim", "/experiences"], ["Projeler", "/projects"],
  ["Yetenekler", "/skills"], ["İçerikler", "/contents"], ["Sertifikalar", "/certificates"],
  ["Blog", "/blogs"], ["Diller", "/languages"], ["Hobiler", "/hobbies"], ["Mesajlar", "/contacts"],
];

export default function AdminSideBar({ onLogout }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  return <aside className="admin-navigation" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); } }}>
    <div className="admin-navigation__header"><Link href="/admin/dashboard" className="font-bold text-ink">İçerik yönetimi</Link><ThemeToggle /><button ref={button} type="button" className="button-secondary md:hidden" aria-expanded={open} aria-controls="admin-menu" onClick={() => setOpen(value => !value)}>{open ? "Kapat" : "Menü"}</button></div>
    <nav id="admin-menu" aria-label="Yönetim menüsü" className={`admin-navigation__links ${open ? "admin-navigation__links--open" : ""}`}>{links.map(([name, suffix]) => {
      const href = `/admin/dashboard${suffix}`;
      const active = pathname === href || Boolean(suffix && pathname.startsWith(`${href}/`));
      return <Link key={href} href={href} className={`admin-navigation__link ${active ? "admin-navigation__link--active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{name}</Link>;
    })}<Link href="/" className="admin-navigation__link">Siteyi görüntüle ↗</Link><button type="button" className="button-secondary mt-3" onClick={onLogout}>Çıkış yap</button></nav>
  </aside>;
}

