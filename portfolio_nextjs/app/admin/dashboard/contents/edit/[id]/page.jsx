"use client";
import AdminPageHeading from "../../../../components/AdminPageHeading";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ContentService } from "../../../../service/contentService";
import Loading from "../../../../components/Loading";
import AddContent from "../../add/page";

export default function ContentEdit() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    let active = true;
    ContentService.getContent(id).then(response => { if (active) setResult({ id, data: response?.data ?? null }); }).catch(() => { if (active) setResult({ id, data: null }); });
    return () => { active = false; };
  }, [id]);
  if (result?.id !== id) return <Loading />;
  if (!result.data?._id || typeof result.data.name !== "string") return <section className="surface-card p-6"><AdminPageHeading className="text-2xl font-bold">İçerik yüklenemedi</AdminPageHeading><p className="my-4 text-quiet">Kayıt bulunamıyor veya bağlantı kurulamadı.</p><Link href="/admin/dashboard/contents" className="button-secondary">İçeriklere dön</Link></section>;
  return <AddContent key={id} content={result.data} />;
}
