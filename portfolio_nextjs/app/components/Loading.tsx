"use client";
import { usePathname } from "next/navigation";
import { localeFromPath } from "../i18n/config";
const Loading = () => {
  const label = localeFromPath(usePathname()) === "en" ? "Loading" : "Yükleniyor";

  return (
    <div
      className="loading-spinner mx-auto"
      role="status"
      aria-label={label}
    ><span className="sr-only">{label}</span></div>
  );
};

export default Loading;
