"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress({ targetId, en = false }: { targetId: string; en?: boolean }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;
    let frame = 0;
    function draw() {
      frame = 0;
      if (!article || !bar.current) return;
      const rect = article.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const progress = range <= 0 ? (rect.bottom <= window.innerHeight ? 1 : 0) : Math.min(1, Math.max(0, -rect.top / range));
      bar.current.style.transform = `scaleX(${progress})`;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    draw();
    return () => { observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, [targetId]);
  return <div className="reading-progress" role="img" aria-label={en ? "Article reading progress" : "Yazı okuma ilerlemesi"}><div ref={bar} className="reading-progress__fill" /></div>;
}
