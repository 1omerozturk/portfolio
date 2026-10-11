"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "../i18n/config";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const en = localeFromPath(usePathname()) === "en";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible((visible) => visible === shouldShow ? visible : shouldShow);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      aria-label={en ? "Back to top" : "Sayfa başına dön"}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      disabled={!isVisible}
      onClick={() => document.getElementById("top")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      })}
      className="scroll-top-button button-primary"
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default ScrollToTopButton;
