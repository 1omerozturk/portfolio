"use client";

import { useState } from "react";
import { isSafeHttpUrl } from "../api/urlSafety";

export default function CertificatePdf({ url, name, en = false }: { url: string; name: string; en?: boolean }) {
  const [open, setOpen] = useState(false);
  if (!isSafeHttpUrl(url)) return null;
  return <div className="mt-4 w-full">
    <div className="flex flex-wrap justify-center gap-3">
      <button type="button" className="button-secondary" aria-expanded={open} onClick={() => setOpen(value => !value)}>
        {open ? (en ? "Close PDF" : "PDF’yi kapat") : (en ? "View PDF" : "PDF’yi görüntüle")}
      </button>
      <a href={url} target="_blank" rel="noopener noreferrer" className="button-secondary">{en ? "Open PDF ↗" : "PDF’yi aç ↗"}</a>
    </div>
    {open && <div className="mt-4">
      <iframe src={url} title={`${name} — PDF`} loading="lazy" referrerPolicy="no-referrer" className="h-[28rem] w-full rounded-xl border border-line bg-white" />
      <p className="mt-2 text-sm text-quiet">{en ? "If the preview is unavailable, use Open PDF." : "Önizleme açılmazsa PDF’yi aç bağlantısını kullanabilirsiniz."}</p>
    </div>}
  </div>;
}
