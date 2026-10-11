"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "../i18n/config";
import PublicImage from "./PublicImage";

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const english = localeFromPath(usePathname()) === "en";
  const current = Math.min(index, Math.max(0, images.length - 1));
  const move = (step: number) => setIndex(value => Math.max(0, Math.min(images.length - 1, value + step)));
  if (!images.length) return <p className="surface-card p-6 text-quiet">{english ? "No images have been added yet." : "Bu projeye henüz görsel eklenmedi."}</p>;
  return <div className="surface-card overflow-hidden" role="region" aria-roledescription={english ? "carousel" : "slayt gösterisi"} aria-label={english ? "Project images" : "Proje görselleri"} tabIndex={0} onKeyDown={event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
    if (event.key === "Home" || event.key === "End") { event.preventDefault(); setIndex(event.key === "Home" ? 0 : images.length - 1); }
  }}>
    <a href={images[current]} target="_blank" rel="noopener noreferrer" className="block bg-raised" aria-label={english ? `Open ${title} image ${current + 1} in full size` : `${title}, görsel ${current + 1}: tam boyutu aç`}>
      <PublicImage src={images[current]} alt={`${title} — ${current + 1}`} width={1200} height={800} sizes="(max-width: 1023px) 100vw, 800px" loading="eager" className="aspect-[3/2] w-full object-contain" />
    </a>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
      <button type="button" className="button-secondary" onClick={() => move(-1)} disabled={current === 0} aria-label={english ? "Previous image" : "Önceki görsel"}>←</button>
      <p className="text-sm font-semibold text-quiet" aria-live="polite" aria-atomic="true">{current + 1} / {images.length}</p>
      <button type="button" className="button-secondary" onClick={() => move(1)} disabled={current === images.length - 1} aria-label={english ? "Next image" : "Sonraki görsel"}>→</button>
    </div>
  </div>;
}
