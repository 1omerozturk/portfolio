"use client";
import AdminPageHeading from "../../../../components/AdminPageHeading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SkillService } from "../../../../service/skillService";
import Loading from "../../../../components/Loading";
import Add from "../../add/page";

export default function Edit() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    let active = true;
    SkillService.getSkill(id).then(response => {
      if (active) setResult({ id, data: response?.data ?? null });
    }).catch(() => { if (active) setResult({ id, data: null }); });
    return () => { active = false; };
  }, [id]);
  if (result?.id !== id) return <Loading />;
  if (!result.data || typeof result.data.name !== "string" || !result.data._id) return <section className="surface-card p-6"><AdminPageHeading className="text-2xl font-bold">Yetenek yüklenemedi</AdminPageHeading><p className="my-4 text-quiet">Kayıt bulunamıyor veya bağlantı kurulamadı.</p><Link className="button-secondary" href="/admin/dashboard/skills">Yeteneklere dön</Link></section>;
  return <Add key={id} skill={result.data} />;
}
