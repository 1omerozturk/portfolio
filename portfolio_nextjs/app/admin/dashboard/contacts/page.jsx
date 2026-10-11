"use client";
import AdminPageHeading from "../../components/AdminPageHeading";
import AdminContentIcon from "../../components/AdminContentIcon";
import { useEffect, useState } from "react";
import { MessageService } from "../../service/messageService";
import Loading from "../../components/Loading";
import { normalizeApiDate } from "../../../api/payload";

const text = value => typeof value === "string" ? value : "";
export default function AdminContacts() {
  const [messages, setMessages] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const selected = messages?.find(item => item._id === selectedId);
  const sentAt = normalizeApiDate(selected?.sentAt ?? selected?.createdAt);
  useEffect(() => {
    let active = true;
    MessageService.getMessages().then(response => { if (active) { setMessages(response.data.filter(item => typeof item._id === "string")); setFailed(false); } }).catch(() => { if (active) { setMessages([]); setFailed(true); } });
    return () => { active = false; };
  }, [attempt]);
  async function mark(id, isRead) {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const updated = await MessageService.markMessage(id, isRead);
      setMessages(previous => previous.map(item => item._id === id ? updated : item));
    } catch { setError("Mesaj durumu güncellenemedi."); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (busy || !selected || !window.confirm("Bu mesaj silinsin mi?")) return;
    const id = selected._id;
    setBusy(true); setError("");
    try { await MessageService.deleteMessage(id); setMessages(previous => previous.filter(item => item._id !== id)); setSelectedId(null); }
    catch { setError("Mesaj silinemedi. Lütfen yeniden deneyin."); }
    finally { setBusy(false); }
  }
  return <section><AdminPageHeading className="mb-6 text-3xl font-bold">Mesajlar</AdminPageHeading>{error && <p className="mb-4 text-danger" role="alert">{error}</p>}{messages === null ? <Loading /> : failed ? <div className="surface-card p-6" role="status"><p>Mesajlar yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => { setMessages(null); setAttempt(value => value + 1); }}>Yeniden dene</button></div> : messages.length === 0 ? <p className="surface-card p-6 text-quiet" role="status">Henüz mesaj bulunmuyor.</p> : <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"><ul aria-label="Gelen mesajlar" className="grid content-start gap-3">{messages.map(item => <li key={item._id}><button type="button" className="surface-card w-full p-4 text-left" aria-pressed={selectedId === item._id} disabled={busy} onClick={() => { setSelectedId(item._id); if (item.isRead !== true) mark(item._id, true); }}><span className="mb-3 block"><AdminContentIcon kind="contacts" /></span><span className="block break-all font-semibold">{text(item.email) || "Mesaj"}</span><span className="mt-1 block break-words text-sm text-quiet">{text(item.name)} {text(item.lastName)}</span><span className="mt-2 block text-sm text-brand">{item.isRead === true ? "Okundu" : "Okunmadı"}</span></button></li>)}</ul>{selected ? <article className="surface-card min-w-0 p-6" aria-busy={busy}><h2 className="break-words text-xl font-bold">{text(selected.name)} {text(selected.lastName)}</h2><p className="mt-2 break-all text-quiet">{text(selected.email)}</p>{text(selected.phone) && <p className="mt-2 break-words text-quiet">{selected.phone}</p>}{sentAt && <time className="mt-3 block text-sm text-quiet" dateTime={sentAt}>{new Date(sentAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}</time>}<p className="my-6 whitespace-pre-wrap break-words">{text(selected.message)}</p><div className="flex flex-wrap gap-3"><button type="button" className="button-secondary" disabled={busy} onClick={() => mark(selected._id, selected.isRead !== true)}>{selected.isRead === true ? "Okunmadı işaretle" : "Okundu işaretle"}</button><button className="button-secondary" disabled={busy} onClick={() => setSelectedId(null)}>Kapat</button><button className="button-secondary" disabled={busy} onClick={remove}>{busy ? "İşleniyor…" : "Sil"}</button></div></article> : <p className="surface-card p-6 text-quiet">Okumak için bir mesaj seçin.</p>}</div>}</section>;
}



