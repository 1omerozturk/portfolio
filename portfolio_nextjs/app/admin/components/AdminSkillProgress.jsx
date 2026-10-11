"use client";
import { useState } from "react";
import Link from "next/link";
import AdminContentIcon from "./AdminContentIcon";
import { SkillService } from "../service/skillService";

export default function AdminSkillProgress({ skills, setSkills }) {
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  async function remove(skill) {
    if (deleting || !window.confirm(`${skill.name} yeteneği silinsin mi?`)) return;
    setDeleting(skill._id);
    setError("");
    try {
      const response = await SkillService.deleteSkill(skill._id);
      if (response?.status === 200) setSkills(previous => previous.filter(item => item._id !== skill._id));
      else setError("Yetenek silinemedi. Lütfen yeniden deneyin.");
    } catch { setError("Yetenek silinemedi. Lütfen yeniden deneyin."); }
    finally { setDeleting(null); }
  }
  return <>{error && <p role="alert" className="mb-4 text-danger">{error}</p>}<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{skills.map(skill => {
    const raw = Number(skill.percentage);
    const percentage = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;
    return <article key={skill._id} className="surface-card min-w-0 p-5"><div className="mb-3"><AdminContentIcon kind="skills" iconName={skill.icon} /></div><h2 className="break-words text-xl font-bold">{skill.name}</h2><p className="my-4 text-quiet">Yetkinlik: %{percentage}</p><progress className="h-3 w-full accent-brand" value={percentage} max={100} aria-label={`${skill.name} yetkinliği`} /><div className="mt-5 flex flex-wrap gap-3"><Link className="button-secondary" href={`/admin/dashboard/skills/edit/${encodeURIComponent(skill._id)}`} aria-label={`${skill.name} düzenle`}>Düzenle</Link><button className="button-secondary" disabled={deleting !== null} onClick={() => remove(skill)} aria-label={`${skill.name} sil`}>{deleting === skill._id ? "Siliniyor…" : "Sil"}</button></div></article>;
  })}</div></>;
}

