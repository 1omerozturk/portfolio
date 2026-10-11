"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";
import { FiGrid, FiUser, FiShare2, FiBookOpen, FiBriefcase, FiFolder, FiCode, FiLink, FiAward, FiEdit3, FiGlobe, FiHeart, FiMail, FiExternalLink, FiLogOut } from "react-icons/fi";

const links = [
  ["Genel bakış", "", FiGrid], ["Hakkımda", "/about", FiUser], ["Sosyal bağlantılar", "/social", FiShare2],
  ["Eğitim", "/educations", FiBookOpen], ["Deneyim", "/experiences", FiBriefcase], ["Projeler", "/projects", FiFolder],
  ["Yetenekler", "/skills", FiCode], ["İçerikler", "/contents", FiLink], ["Sertifikalar", "/certificates", FiAward],
  ["Blog", "/blogs", FiEdit3], ["Diller", "/languages", FiGlobe], ["Hobiler", "/hobbies", FiHeart], ["Mesajlar", "/contacts", FiMail],
];

export default function AdminSideBar({ onLogout }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  return <aside className="admin-navigation" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); } }}>
    <div className="admin-navigation__header"><Link href="/admin/dashboard" className="font-bold text-ink">İçerik yönetimi</Link><ThemeToggle /><button ref={button} type="button" className="button-secondary md:hidden" aria-expanded={open} aria-controls="admin-menu" onClick={() => setOpen(value => !value)}>{open ? "Kapat" : "Menü"}</button></div>
    <nav id="admin-menu" aria-label="Yönetim menüsü" className={`admin-navigation__links ${open ? "admin-navigation__links--open" : ""}`}>{links.map(([name, suffix, Icon]) => {
      const href = `/admin/dashboard${suffix}`;
      const active = pathname === href || Boolean(suffix && pathname.startsWith(`${href}/`));
      return <Link key={href} href={href} className={`admin-navigation__link ${active ? "admin-navigation__link--active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><Icon className="admin-navigation__icon" aria-hidden="true" /><span>{name}</span></Link>;
    })}<Link href="/" className="admin-navigation__link"><FiExternalLink className="admin-navigation__icon" aria-hidden="true" /><span>Siteyi görüntüle</span></Link><button type="button" className="button-secondary mt-3" onClick={onLogout}><FiLogOut aria-hidden="true" />Çıkış yap</button></nav>
  </aside>;
}

