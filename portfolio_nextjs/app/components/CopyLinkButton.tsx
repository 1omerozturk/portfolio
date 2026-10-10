"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [status, setStatus] = useState("");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Bağlantı kopyalandı.");
    } catch {
      setStatus("Bağlantı kopyalanamadı.");
    }
  };

  return (
    <>
      <button type="button" onClick={copyLink} className="button-secondary">
        {status === "Bağlantı kopyalandı." ? "Kopyalandı" : "Bağlantıyı kopyala"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </>
  );
}
