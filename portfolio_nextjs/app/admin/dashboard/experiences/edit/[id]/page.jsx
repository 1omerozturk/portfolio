"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ExperienceService } from "../../../../service/experienceService";
import Add from "../../add/page";
import Loading from "../../../../components/Loading";

export default function Edit() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const key = `${id}:${attempt}`;
  useEffect(() => {
    let active = true;
    ExperienceService.getExperience(id).then(response => { if (active) setResult({ key, data: response?.data ?? null }); }).catch(() => { if (active) setResult({ key, data: null }); });
    return () => { active = false; };
  }, [id, key]);
  if (result?.key !== key) return <Loading />;
  if (!result.data?._id || typeof result.data.company !== "string") return <section className="surface-card p-6"><h1 className="text-2xl font-bold">Deneyim yüklenemedi</h1><p className="my-4 text-quiet">Kayıt bulunamıyor veya bağlantı kurulamadı.</p><div className="flex flex-wrap gap-3"><button className="button-primary" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button><Link className="button-secondary" href="/admin/dashboard/experiences">Listeye dön</Link></div></section>;
  return <Add key={id} experience={result.data} />;
}
