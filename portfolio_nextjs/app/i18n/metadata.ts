import { createPageMetadata } from "../seo";
import { getLocale } from "./server";
import { localizedPath } from "./config";
import { getDictionary } from "./dictionaries";

export async function createLocalizedPageMetadata(title: string, description: string, path: string, image?: string) {
  const locale = await getLocale();
  const key = (path === "/" ? "home" : path.split(/[/?]/)[1]) as keyof ReturnType<typeof getDictionary>["nav"];
  const tr = getDictionary("tr");
  const en = getDictionary("en");
  const fixedTitle = typeof tr.nav[key] === "string" && title.toLocaleLowerCase("tr-TR") === tr.nav[key].toLocaleLowerCase("tr-TR");
  const localizedTitle = locale === "en" && fixedTitle ? en.nav[key] : title;
  const localizedDescription = locale === "en" && fixedTitle ? `${en.nav[key]} — Ömer Öztürk's software engineering portfolio.` : description;
  const metadata = createPageMetadata(localizedTitle, localizedDescription, localizedPath(path, locale), image);
  return {
    ...metadata,
    alternates: { canonical: localizedPath(path, locale), languages: { "tr-TR": localizedPath(path, "tr"), en: localizedPath(path, "en"), "x-default": localizedPath(path, "tr") } },
    openGraph: { ...metadata.openGraph, locale: locale === "en" ? "en_US" : "tr_TR", alternateLocale: [locale === "en" ? "tr_TR" : "en_US"] },
  };
}
