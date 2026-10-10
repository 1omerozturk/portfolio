"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const storageKey = "portfolio-theme";
let sessionTheme: Theme | null = null;

function parseTheme(value: string | null): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

function readStoredTheme(): Theme | null {
  try {
    return parseTheme(window.localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(onChange: () => void) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  const syncPreference = () => {
    const theme = sessionTheme ?? readStoredTheme() ?? (preference.matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    sessionTheme = parseTheme(event.newValue);
    syncPreference();
  };
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  preference.addEventListener("change", syncPreference);
  window.addEventListener("storage", syncStorage);

  return () => {
    observer.disconnect();
    preference.removeEventListener("change", syncPreference);
    window.removeEventListener("storage", syncStorage);
  };
}

export function ThemeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggleTheme = useCallback(() => {
    const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
    sessionTheme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The selected theme still applies for this session when storage is unavailable.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
