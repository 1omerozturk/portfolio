"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CertificationService } from "../../../../service/certificationsService";
import AddCertification from "../../add/page";
import Loading from "../../../../components/Loading";
export default function EditCertification() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    let active = true;
    CertificationService.getCertification(id).then(response => { if (active) setResult({ id, data: response.data }); }).catch(() => { if (active) setResult({ id, data: null }); });
    return () => { active = false; };
  }, [id]);
  if (result?.id !== id) return <Loading />;
  if (!result.data?._id) return <section className="surface-card p-6"><h1 className="text-2xl font-bold">Sertifika yüklenemedi</h1><Link className="button-secondary mt-4" href="/admin/dashboard/certificates">Sertifikalara dön</Link></section>;
  return <AddCertification key={id} certification={result.data} />;
}
