"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../components/Loading";
import { SkillService } from "../../service/skillService";
import AdminSkillProgress from "../../components/AdminSkillProgress";

export default function SkillsDashboard() {
  const [skills, setSkills] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    SkillService.getSkills().then(response => {
      if (!active) return;
      const valid = Array.isArray(response?.data);
      setFailed(!valid);
      setSkills(valid ? response.data : []);
    }).catch(() => { if (active) { setFailed(true); setSkills([]); } });
    return () => { active = false; };
  }, [attempt]);
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-bold">Yetenekler</h1><Link href="/admin/dashboard/skills/add" className="button-primary">Yetenek ekle</Link></div>{skills === null ? <Loading /> : failed ? <div className="surface-card p-6" role="status"><p>Yetenekler yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => { setSkills(null); setAttempt(value => value + 1); }}>Yeniden dene</button></div> : skills.length ? <AdminSkillProgress skills={skills} setSkills={setSkills} /> : <p className="surface-card p-6 text-quiet" role="status">Henüz yetenek eklenmemiş.</p>}</section>;
}
