"use client";

import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";
import { localeFromPath } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const locale = localeFromPath(usePathname());
  const dictionary = getDictionary(locale);
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = locale === "en" ? `Switch to ${nextTheme} theme` : `${nextTheme === "dark" ? "Koyu" : "Açık"} temaya geç`;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span className="theme-toggle__label">{theme === "dark" ? dictionary.common.light : dictionary.common.dark}</span>
    </button>
  );
}
