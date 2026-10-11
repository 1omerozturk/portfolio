"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "../i18n/config";

export default function CopyLinkButton({ url }: { url: string }) {
  const en = localeFromPath(usePathname()) === "en";
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button type="button" onClick={copyLink} className="button-secondary">
        {status === "success" ? (en ? "Copied" : "Kopyalandı") : (en ? "Copy link" : "Bağlantıyı kopyala")}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{status === "success" ? (en ? "Link copied." : "Bağlantı kopyalandı.") : status === "error" ? (en ? "Link could not be copied." : "Bağlantı kopyalanamadı.") : ""}</span>
    </>
  );
}
