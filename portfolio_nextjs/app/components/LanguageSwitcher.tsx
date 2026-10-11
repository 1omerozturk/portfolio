"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { localeFromPath, localizedPath } from "../i18n/config";
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = localeFromPath(pathname);
  const next = locale === "en" ? "tr" : "en";
  const query = new URLSearchParams(searchParams.toString());
  query.set("lang", next);
  return <a className="button-secondary px-3 text-sm" href={`${localizedPath(pathname, next)}?${query}`} lang={next} aria-label={next === "en" ? "Switch to English" : "Türkçeye geç"}>{next.toUpperCase()}</a>;
}
