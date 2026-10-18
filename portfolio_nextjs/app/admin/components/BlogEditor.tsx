"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { prepareBlogMarkdown } from "../../blogMarkdown";
import dynamic from "next/dynamic";

const Preview = dynamic(() => import("../../components/ArticleBody"), { loading: () => <p role="status">Önizleme hazırlanıyor…</p> });
const LIMIT = 100000;
const tools = [
  ["Başlık", "## ", "", "Bölüm başlığı"],
  ["Kalın", "**", "**", "Vurgulu metin"],
  ["İtalik", "*", "*", "Metin"],
  ["Liste", "- ", "", "Liste öğesi"],
  ["Alıntı", "> ", "", "Alıntı"],
  ["Bağlantı", "[", "](https://example.com)", "Bağlantı metni"],
  ["Kod", "\n```js\n", "\n```\n", "// Kodunuz"],
  ["Tablo", "\n| Başlık | Açıklama |\n| --- | --- |\n| ", " | İçerik |\n", "Öğe"],
] as const;

export default function BlogEditor({ id, label, value, onChange, required = false }: { id: string; label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  const input = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState<{ name: string; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  function insert(before: string, after: string, placeholder: string) {
    const start = input.current?.selectionStart ?? value.length;
    const end = input.current?.selectionEnd ?? value.length;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    if (next.length > LIMIT) { setNotice("İçerik 100.000 karakteri aşamaz."); return; }
    onChange(next);
    requestAnimationFrame(() => { input.current?.focus(); input.current?.setSelectionRange(start + before.length, start + before.length + selected.length); });
  }
  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;
    setNotice("");
    if (!/\.(md|markdown|txt)$/i.test(selected.name) || selected.size > 400000) { setNotice("En fazla 400 KB boyutunda bir .md, .markdown veya .txt dosyası seçin."); return; }
    setLoading(true);
    try {
      const text = (await selected.text()).replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
      if (!text.trim() || text.length > LIMIT || text.includes("\0")) { setNotice("Dosya boş, metin biçiminde değil veya 100.000 karakteri aşıyor."); return; }
      if (value.trim()) setPending({ name: selected.name, text });
      else { onChange(text); setMode("write"); setNotice(`${selected.name} içe aktarıldı.`); }
    } catch { setNotice("Dosya okunamadı. Yeniden deneyin."); }
    finally { setLoading(false); }
  }
  const words = value.trim().split(/\s+/).filter(Boolean).length;
  return <section className="blog-editor" aria-label={label}>
    <div className="blog-editor__heading"><label htmlFor={id} className="font-semibold">{label}</label><span className="text-sm text-quiet">{words} kelime · {Math.max(1, Math.ceil(words / 200))} dk</span></div>
    <div className="blog-editor__modes" role="group" aria-label="Editör görünümü">
      <button type="button" className="button-secondary" aria-pressed={mode === "write"} onClick={() => setMode("write")}>Yaz / düzenle</button>
      <button type="button" className="button-secondary" aria-pressed={mode === "preview"} onClick={() => setMode("preview")}>Okuyucu önizlemesi</button>
      <button type="button" className="button-secondary" disabled={loading} onClick={() => file.current?.click()}>{loading ? "Okunuyor…" : "Dosya ekle"}</button>
      <input ref={file} type="file" accept=".md,.markdown,.txt,text/plain,text/markdown" className="sr-only" aria-label={`${label} dosyası`} onChange={importFile} />
    </div>
    <button type="button" className="text-sm text-brand underline justify-self-start" onClick={() => { const next = prepareBlogMarkdown(value); if (next.length > LIMIT) { setNotice("Düzenlenen içerik karakter sınırını aşıyor."); return; } onChange(next); setNotice(next === value ? "İçerik zaten Markdown biçiminde veya otomatik düzenlenecek yapı bulunamadı." : "Numaralı başlıklar, tablolar ve kod örnekleri Markdown biçimine çevrildi. Önizlemeden kontrol edin."); }}>Yapıştırılmış metni Markdown olarak düzenle</button>
    <p id={`${id}-help`} className="text-sm text-quiet">Markdown veya düz metin yazın; .md / .txt dosyası da ekleyebilirsiniz. Görseller için herkese açık adres kullanın. HTML çalıştırılmaz.</p>
    {pending && <div className="blog-editor__import"><p><strong>{pending.name}</strong> hazır. Mevcut içerikle ne yapılsın?</p><div className="flex flex-wrap gap-2 mt-3"><button type="button" className="button-secondary" onClick={() => { onChange(pending.text); setPending(null); setMode("write"); }}>İçeriği değiştir</button><button type="button" className="button-secondary" onClick={() => { const next = value + "\n\n" + pending.text; if (next.length > LIMIT) { setNotice("Birleşen içerik 100.000 karakteri aşıyor."); return; } onChange(next); setPending(null); setMode("write"); }}>Sonuna ekle</button><button type="button" className="button-secondary" onClick={() => setPending(null)}>Vazgeç</button></div></div>}
    <div hidden={mode !== "write"}>
      <div className="blog-editor__tools" role="group" aria-label="Metin biçimlendirme">{tools.map(([name, before, after, placeholder]) => <button type="button" key={name} onClick={() => insert(before, after, placeholder)}>{name}</button>)}</div>
      <textarea ref={input} id={id} className="form-field blog-editor__input" rows={20} maxLength={LIMIT} required={required && mode === "write"} value={value} aria-describedby={`${id}-help`} onChange={event => onChange(event.target.value)} onInvalid={() => setMode("write")} />
    </div>
    {mode === "preview" && <div className="blog-editor__preview">{value.trim() ? <Preview content={value} /> : <p className="text-quiet">Yazmaya başlayınca önizleme burada görünecek.</p>}</div>}
    <div className="text-sm text-quiet" role="status">{notice || `${value.length.toLocaleString("tr-TR")} / 100.000 karakter`}</div>
  </section>;
}
