export const locales = ["tr", "en"] as const;
export type Locale = typeof locales[number];

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = path.replace(/^\/en(?=\/|\?|#|$)/, "") || "/";
  if (/^\/admin(?:\/|\?|#|$)/.test(base)) return base;
  return locale === "en" ? `/en${base === "/" ? "" : base}` : base;
}

export function preferredLocale(acceptLanguage: string | null): Locale {
  const preferences = (acceptLanguage || "").split(",").map((entry, index) => {
    const [language, ...options] = entry.trim().split(";");
    const weight = options.find(option => option.trim().startsWith("q="));
    const quality = weight ? Number(weight.trim().slice(2)) : 1;
    return { language: language.toLowerCase().split("-")[0], quality, index };
  }).filter(item => Number.isFinite(item.quality) && item.quality > 0 && item.quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  return preferences.find(item => item.language === "tr" || item.language === "en")?.language === "en" ? "en" : "tr";
}

export function translatedText(record: Record<string, unknown>, field: string, locale: Locale): string {
  const value = locale === "en" ? record[`${field}En`] : undefined;
  return typeof value === "string" && value.trim() ? value : typeof record[field] === "string" ? record[field] as string : "";
}
