"use client";

import { useEffect, useRef, useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

export default function CVSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    closeRef.current?.focus();

    const keepFocusInDialog = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(document.querySelectorAll(
        ".cv-dialog button:not([disabled]), .cv-dialog a[href], .cv-dialog input:not([disabled]), .cv-dialog [tabindex]:not([tabindex='-1'])",
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", keepFocusInDialog);
    return () => {
      document.removeEventListener("keydown", keepFocusInDialog);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen]);

  const download = (language) => {
    const fileName = language === "tr" ? "omer_ozturk_tr.pdf" : "omer_ozturk_en.pdf";
    const link = document.createElement("a");
    link.href = `/CV/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setIsOpen(false);
  };

  return (
    <div className="cv-selector">
      <button type="button" className="button-primary" onClick={() => setIsOpen(true)}>
        Özgeçmişi indir <FaDownload aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="cv-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            className="surface-card cv-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-dialog-title"
          >
            <button
              type="button"
              ref={closeRef}
              onClick={() => setIsOpen(false)}
              className="cv-dialog__close"
              aria-label="Özgeçmiş dil seçimini kapat"
            >
              <FaTimes aria-hidden="true" />
            </button>
            <h2 id="cv-dialog-title" className="mb-3 text-xl font-bold text-ink">
              Özgeçmiş dilini seçin
            </h2>
            <p className="mb-6 text-quiet">İndirmek istediğiniz dil sürümünü seçin.</p>
            <div className="grid gap-3">
              <button type="button" className="button-primary w-full" onClick={() => download("en")}>
                İngilizce sürüm
              </button>
              <button type="button" className="button-secondary w-full" onClick={() => download("tr")}>
                Türkçe sürüm
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
