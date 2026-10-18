"use client";

import { useEffect, useRef, useState } from "react";
import { FiHeart, FiShare2, FiLink, FiCheck, FiLinkedin, FiTwitter, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { API_BASE_URL } from "../api/config";

type Reaction = { liked: boolean; count: number };
const visitorKey = "portfolio-blog-visitor";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function ArticleEngagement({ blogId, url, title, en = false }: { blogId: string; url: string; title: string; en?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const visitor = useRef("");
  const lock = useRef(false);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [nativeShare, setNativeShare] = useState(false);
  const [retry, setRetry] = useState(0);
  const endpoint = `${API_BASE_URL}/user/blogs/${encodeURIComponent(blogId)}/likes`;

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    async function load() {
      if (lock.current) return;
      lock.current = true;
      setBusy(true); setError("");
      try {
        let identity = localStorage.getItem(visitorKey);
        if (!identity || !uuid.test(identity)) { identity = crypto.randomUUID(); localStorage.setItem(visitorKey, identity); }
        visitor.current = identity;
        const response = await fetch(`${endpoint}/status`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId: identity }), cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) });
        if (!response.ok) throw new Error("UNAVAILABLE");
        const result: Reaction = await response.json();
        if (typeof result.liked !== "boolean" || !Number.isSafeInteger(result.count) || result.count < 0) throw new Error("INVALID");
        if (active) { setReaction(result); setError(""); }
      } catch { if (active) setError(en ? "Likes could not be loaded. Check browser storage permissions and try again." : "Beğeniler yüklenemedi. Tarayıcı depolama iznini kontrol edip yeniden deneyin."); }
      finally { lock.current = false; if (active) setBusy(false); }
    }
    setNativeShare(typeof navigator.share === "function");
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); void load(); } }, { rootMargin: "300px" });
    if (section.current) observer.observe(section.current);
    return () => { active = false; controller.abort(); observer.disconnect(); };
  }, [endpoint, en, retry]);

  async function like() {
    if (!reaction || !visitor.current || lock.current) return;
    lock.current = true; setBusy(true); setError("");
    try {
      const response = await fetch(endpoint, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId: visitor.current, liked: !reaction.liked }), cache: "no-store", signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("UNAVAILABLE");
      const result: Reaction = await response.json();
      if (typeof result.liked !== "boolean" || !Number.isSafeInteger(result.count) || result.count < 0) throw new Error("INVALID");
      setReaction(result);
    } catch { setError(en ? "Your like could not be saved. Please try again." : "Beğenin kaydedilemedi. Lütfen yeniden dene."); }
    finally { lock.current = false; setBusy(false); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); setShareStatus(en ? "Link copied." : "Bağlantı kopyalandı."); }
    catch { setShareStatus(en ? "Could not copy. You can select the address below." : "Kopyalanamadı. Aşağıdaki adresi seçip kopyalayabilirsin."); }
  }
  async function share() {
    try { await navigator.share({ title, url }); setShareStatus(""); }
    catch (error) { if (!(error instanceof Error && error.name === "AbortError")) await copy(); }
  }
  const links = [
    { name: "LinkedIn", icon: FiLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "X", icon: FiTwitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: "WhatsApp", icon: FaWhatsapp, href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
  ];
  return <section ref={section} className="article-engagement mb-12" aria-label={en ? "Like and share" : "Beğen ve paylaş"}>
    <div className="article-engagement__appreciation">
      <span className="article-engagement__eyebrow">{en ? "A small gesture, a big motivation" : "Küçük bir dokunuş, büyük bir motivasyon"}</span>
      <h2>{en ? "Did you enjoy this article?" : "Bu yazı sana bir şey kattı mı?"}</h2>
      <p className="text-quiet">{en ? "Leave a like to support more articles like this." : "Beğenerek bu tür yazıların devamına destek olabilirsin."}</p>
      <button type="button" onClick={like} disabled={!reaction || busy} aria-pressed={reaction?.liked ?? false} aria-busy={busy} className="article-like" aria-label={reaction?.liked ? (en ? "Remove like" : "Beğeniyi geri al") : (en ? "Like article" : "Yazıyı beğen")}>
        <FiHeart aria-hidden="true" /><span>{busy ? (en ? "Please wait…" : "Bekle…") : reaction?.liked ? (en ? "Liked" : "Beğendin") : (en ? "Like" : "Beğen")}</span><span className="article-like__count">{reaction ? new Intl.NumberFormat(en ? "en" : "tr").format(reaction.count) : "—"}</span>
      </button>
      <p className="article-engagement__hint">{en ? "One like per browser. Click again to undo." : "Tarayıcı başına bir beğeni. Geri almak için tekrar dokun."}</p>
      {error && <p role="status" className="text-danger text-sm">{error} {!reaction && <button type="button" className="underline" onClick={() => setRetry(value => value + 1)} disabled={busy}>{en ? "Try again" : "Yeniden dene"}</button>}</p>}
      <span className="sr-only" role="status">{reaction ? `${reaction.count} ${en ? "likes" : "beğeni"}. ${reaction.liked ? (en ? "You liked this article." : "Bu yazıyı beğendin.") : ""}` : ""}</span>
    </div>
    <div className="article-engagement__sharing">
      <span className="article-engagement__eyebrow"><FiShare2 aria-hidden="true" /> {en ? "Share an idea" : "Bir fikri paylaş"}</span>
      <h3>{en ? "Good ideas travel." : "Güzel fikirler paylaştıkça yayılır."}</h3>
      <p className="text-quiet">{en ? "Send this article to someone who might find it useful." : "Bu yazıyı faydalı bulabilecek biriyle paylaş."}</p>
      <div className="article-share-links">{links.map(({ name, icon: Icon, href }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} ${en ? "(opens a new tab)" : "(yeni sekmede açılır)"}`}><Icon aria-hidden="true" /><span>{name}</span><FiArrowUpRight className="article-share-links__arrow" aria-hidden="true" /></a>)}</div>
      <div className="article-share-actions"><button type="button" className="button-secondary" onClick={copy}>{copied ? <FiCheck aria-hidden="true" /> : <FiLink aria-hidden="true" />}{copied ? (en ? "Copied" : "Kopyalandı") : (en ? "Copy link" : "Bağlantıyı kopyala")}</button>{nativeShare && <button type="button" className="button-secondary" onClick={share}><FiShare2 aria-hidden="true" />{en ? "More options" : "Diğer seçenekler"}</button>}</div>
      <label className="sr-only" htmlFor="article-share-url">{en ? "Article address" : "Yazı adresi"}</label><input id="article-share-url" className="article-share-url" readOnly value={url} onFocus={event => event.target.select()} />
      <p role="status" className="text-sm text-quiet min-h-5">{shareStatus}</p>
    </div>
  </section>;
}
