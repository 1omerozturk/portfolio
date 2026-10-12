"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiGitBranch, FiRefreshCw, FiX } from "react-icons/fi";
import { localeFromPath } from "../i18n/config";
import { createPointNetwork, type NetworkControls } from "./pointNetwork";

export default function InteractiveBackdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef<NetworkControls | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState({ selected: 0, connections: 0 });
  const en = localeFromPath(usePathname()) === "en";
  useEffect(() => {
    if (!canvas.current) return;
    controls.current = createPointNetwork(canvas.current, (selected, connections) => setCounts(previous => previous.selected === selected && previous.connections === connections ? previous : { selected, connections }));
    return () => { controls.current?.destroy(); controls.current = null; };
  }, []);
  return <>
    <canvas ref={canvas} className="interactive-backdrop" aria-hidden="true" />
    <div className="network-controls" role="group" aria-label={en ? "Interactive background" : "Etkileşimli arka plan"} onKeyDown={event => {
      const directions: Record<string, [number, number]> = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] };
      if (open && directions[event.key]) { event.preventDefault(); controls.current?.move(...directions[event.key]); }
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }}>
      <button ref={toggle} type="button" className="network-controls__toggle" aria-expanded={open} aria-controls="network-help" onClick={() => setOpen(value => !value)}><FiGitBranch aria-hidden="true" />{en ? "Play with points" : "Noktalarla oyna"}{open && <FiX aria-hidden="true" />}</button>
      {open && <div id="network-help" className="network-controls__panel">
        <p>{en ? "Click two points to connect. Drag to move. Shift + drag empty space to select a group." : "İki noktaya tıkla: bağla. Sürükle: taşı. Boş alanda Shift + sürükle: grup seç."}</p>
        <p>{en ? "Select with the buttons; use arrow keys to move." : "Düğmelerle nokta seç; yön tuşlarıyla taşı."}</p>
        <div className="flex flex-wrap gap-2"><button type="button" onClick={() => controls.current?.next(-1)}>{en ? "Previous" : "Önceki"}</button><button type="button" onClick={() => controls.current?.next(1)}>{en ? "Next" : "Sonraki"}</button><button type="button" onClick={() => controls.current?.connect()}>{en ? "Connect" : "Bağla"}</button><button type="button" onClick={() => controls.current?.reset()}><FiRefreshCw aria-hidden="true" />{en ? "Reset" : "Sıfırla"}</button></div>
        <p role="status" aria-live="polite">{counts.selected} {en ? "selected" : "seçili"} · {counts.connections} {en ? "connections" : "bağlantı"}</p>
      </div>}
    </div>
  </>;
}
