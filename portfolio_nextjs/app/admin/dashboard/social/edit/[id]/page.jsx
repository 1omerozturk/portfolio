"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SocialService } from "../../../../service/socialService";
import Loading from "../../../../components/Loading";
import SocialAdd from "../../add/page";

export default function SocialEdit() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    let active = true;
    SocialService.getSocial(id).then(response => { if (active) setResult({ id, data: response?.data ?? null }); }).catch(() => { if (active) setResult({ id, data: null }); });
    return () => { active = false; };
  }, [id]);
  if (result?.id !== id) return <Loading />;
  if (!result.data?._id || typeof result.data.name !== "string") return <section className="surface-card p-6"><h1 className="text-2xl font-bold">Sosyal bağlantı yüklenemedi</h1><p className="my-4 text-quiet">Kayıt bulunamıyor veya bağlantı kurulamadı.</p><Link href="/admin/dashboard/social" className="button-secondary">Sosyal bağlantılara dön</Link></section>;
  return <SocialAdd key={id} social={result.data} />;
}

