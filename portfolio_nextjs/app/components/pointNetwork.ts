type Point = { x: number; y: number };
const protectedArea = "a,button,input,textarea,select,label,summary,article,p,h1,h2,h3,h4,nav,.site-nav,.site-footer,.surface-card,.network-controls,[role='dialog']";
export type NetworkControls = { reset: () => void; next: (step: number) => void; connect: () => void; move: (dx: number, dy: number) => void; destroy: () => void };
export function createPointNetwork(canvas: HTMLCanvasElement, announce: (selected: number, connections: number) => void): NetworkControls | null {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;
  const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  let points: Point[] = [], selected = new Set<number>();
  const edges = new Set<string>();
  let pending: number | null = null, keyboardPoint = 0, frame = 0, width = 0, height = 0, color = "";
  let pointer: Point | null = null;
  let gesture: { start: Point; last: Point; node: number; marquee: boolean; moved: boolean } | null = null;
  const clamp = (value: number, max: number) => Math.max(12, Math.min(max - 12, value));
  const available = (point: Point) => !document.elementFromPoint?.(point.x, point.y)?.closest(protectedArea);
  const report = () => announce(selected.size, edges.size);
  const draw = () => {
    frame = 0; ctx.clearRect(0, 0, width, height);
    if (!media.matches || document.hidden) return;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = .25;
    edges.forEach(edge => {
      const [a, b] = edge.split(":").map(Number);
      if (!points[a] || !points[b]) return;
      ctx.beginPath(); ctx.moveTo(points[a].x, points[a].y); ctx.lineTo(points[b].x, points[b].y); ctx.stroke();
    });
    if (pending !== null && pointer && points[pending]) {
      ctx.globalAlpha = .4; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(points[pending].x, points[pending].y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke(); ctx.setLineDash([]);
    }
    points.forEach((point, index) => {
      const distance = pointer ? Math.hypot(point.x - pointer.x, point.y - pointer.y) : Infinity;
      const active = selected.has(index) || pending === index || distance < 12;
      ctx.globalAlpha = active ? .85 : .12 + Math.max(0, 1 - distance / 180) * .5;
      ctx.beginPath(); ctx.arc(point.x, point.y, active ? 3.5 : 1.7, 0, Math.PI * 2); ctx.fill();
      if (active) { ctx.beginPath(); ctx.arc(point.x, point.y, 8, 0, Math.PI * 2); ctx.stroke(); }
    });
    if (gesture?.marquee) {
      ctx.globalAlpha = .5; ctx.setLineDash([4, 4]); ctx.strokeRect(gesture.start.x, gesture.start.y, gesture.last.x - gesture.start.x, gesture.last.y - gesture.start.y); ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
  const reset = () => {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    color = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
    const baseColumns = Math.ceil(width / 64), baseRows = Math.ceil(height / 64);
    const scale = Math.max(1, Math.sqrt(baseColumns * baseRows / 420));
    const columns = Math.max(1, Math.floor(baseColumns / scale)), rows = Math.max(1, Math.floor(baseRows / scale));
    const stepX = scale > 1 ? width / columns : 64, stepY = scale > 1 ? height / rows : 64;
    points = Array.from({ length: columns * rows }, (_, index) => ({ x: clamp((scale > 1 ? stepX / 2 : 24) + index % columns * stepX, width), y: clamp((scale > 1 ? stepY / 2 : 24) + Math.floor(index / columns) * stepY, height) }));
    selected.clear(); edges.clear(); pending = null; keyboardPoint = Math.max(0, points.findIndex(available)); gesture = null; report(); schedule();
  };
  const pick = (point: Point) => points.findIndex(node => Math.hypot(node.x - point.x, node.y - point.y) < 12);
  const connect = (index: number) => {
    selected = new Set([index]); keyboardPoint = index;
    if (pending !== null && pending !== index) {
      const key = [pending, index].sort((a, b) => a - b).join(":");
      if (edges.has(key)) edges.delete(key); else if (edges.size < 150) edges.add(key);
      pending = null;
    } else pending = index;
    report(); schedule();
  };
  const moveSelected = (dx: number, dy: number) => {
    selected.forEach(index => { points[index].x = clamp(points[index].x + dx, width); points[index].y = clamp(points[index].y + dy, height); }); schedule();
  };
  const down = (event: PointerEvent) => {
    if (!media.matches || event.button !== 0 || event.pointerType === "touch") return;
    if (event.target instanceof Element && event.target.closest(protectedArea)) return;
    const start = { x: event.clientX, y: event.clientY }, node = pick(start);
    if (node < 0 && !event.shiftKey) return;
    event.preventDefault();
    if (node >= 0 && !selected.has(node)) selected = new Set([node]);
    gesture = { start, last: start, node, marquee: node < 0 && event.shiftKey, moved: false }; schedule();
  };
  const move = (event: PointerEvent) => {
    if (!media.matches || event.pointerType === "touch") return;
    pointer = { x: event.clientX, y: event.clientY };
    if (gesture) {
      if (Math.hypot(pointer.x - gesture.start.x, pointer.y - gesture.start.y) > 4) gesture.moved = true;
      if (gesture.node >= 0 && gesture.moved) { pending = null; moveSelected(pointer.x - gesture.last.x, pointer.y - gesture.last.y); }
      gesture.last = pointer;
    }
    schedule();
  };
  const up = () => {
    if (!gesture) return;
    if (gesture.marquee) {
      const { start, last } = gesture;
      selected = new Set(points.flatMap((point, index) => point.x >= Math.min(start.x, last.x) && point.x <= Math.max(start.x, last.x) && point.y >= Math.min(start.y, last.y) && point.y <= Math.max(start.y, last.y) ? [index] : []));
      pending = null; report();
    } else if (gesture.node >= 0 && !gesture.moved) connect(gesture.node);
    gesture = null; report(); schedule();
  };
  const clearPointer = () => { pointer = null; gesture = null; report(); schedule(); };
  const leave = (event: PointerEvent) => { if (!event.relatedTarget) clearPointer(); };
  const configure = () => {
    window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); clearPointer();
    if (media.matches) { window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerdown", down); window.addEventListener("pointerup", up); }
  };
  reset(); configure();
  const theme = new MutationObserver(() => { color = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim(); schedule(); });
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", configure); window.addEventListener("resize", reset); window.addEventListener("blur", clearPointer); window.addEventListener("pointerout", leave); document.addEventListener("visibilitychange", clearPointer);
  return {
    reset,
    next: step => {
      for (let attempts = 0; attempts < points.length; attempts++) {
        keyboardPoint = (keyboardPoint + step + points.length) % points.length;
        if (available(points[keyboardPoint])) break;
      }
      selected = new Set([keyboardPoint]); report(); schedule();
    },
    connect: () => connect(keyboardPoint), move: moveSelected,
    destroy: () => {
      theme.disconnect(); media.removeEventListener("change", configure);
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up);
      window.removeEventListener("resize", reset); window.removeEventListener("blur", clearPointer); window.removeEventListener("pointerout", leave); document.removeEventListener("visibilitychange", clearPointer);
      if (frame) cancelAnimationFrame(frame);
    },
  };
}
