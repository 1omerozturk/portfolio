"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`${nextTheme === "dark" ? "Koyu" : "Açık"} temaya geç`}
      title={`${nextTheme === "dark" ? "Koyu" : "Açık"} temaya geç`}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span className="theme-toggle__label">{theme === "dark" ? "Açık" : "Koyu"}</span>
    </button>
  );
}
