"use client";

import { useState, type FormEvent } from "react";
import { SkillService, type SkillInput } from "../../../service/skillService";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SkillAddProps { skill?: SkillInput & { _id: string } }

export default function SkillAdd({ skill }: SkillAddProps) {
  const router = useRouter();
  const [data, setData] = useState<SkillInput>({ name: skill?.name ?? "", level: skill?.level ?? "", percentage: skill?.percentage ?? 0, icon: skill?.icon ?? "", color: skill?.color ?? "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const update = (name: keyof SkillInput, value: string) => setData(previous => ({ ...previous, [name]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const percentage = Number(data.percentage);
    if (!data.name.trim() || !Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      setError("Yetenek adı ve 0–100 arasında bir yüzde girin.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = { ...data, name: data.name.trim(), percentage };
      const result = skill ? await SkillService.updateSkill(skill._id, payload) : await SkillService.addSkill(payload);
      const status = typeof result === "number" ? result : result?.status;
      if (status === 200 || status === 201) {
        router.push("/admin/dashboard/skills");
        router.refresh();
      } else setError("Yetenek kaydedilemedi. Lütfen yeniden deneyin.");
    } catch {
      setError("Yetenek kaydedilemedi. Lütfen yeniden deneyin.");
    } finally { setSaving(false); }
  }

  return (
    <section className="mx-auto max-w-2xl">
      <Link href="/admin/dashboard/skills" className="button-secondary mb-6">Yeteneklere dön</Link>
      <h1 className="mb-6 text-3xl font-bold text-ink">{skill ? "Yeteneği düzenle" : "Yetenek ekle"}</h1>
      <form onSubmit={submit} className="surface-card grid gap-5 p-5 sm:p-8" aria-busy={saving}>
        <fieldset disabled={saving} className="grid min-w-0 gap-5">
          <legend className="sr-only">Yetenek bilgileri</legend>
          <div><label htmlFor="skill-name" className="mb-2 block font-semibold">Yetenek adı</label><input id="skill-name" className="form-field" value={data.name} onChange={event => update("name", event.target.value)} required maxLength={100} /></div>
          <div><label htmlFor="skill-level" className="mb-2 block font-semibold">Seviye</label><select id="skill-level" className="form-field" value={data.level} onChange={event => update("level", event.target.value)} required><option value="">Seviye seçin</option><option value="Beginner">Başlangıç</option><option value="Intermediate">Orta</option><option value="Advanced">İleri</option><option value="Expert">Uzman</option></select></div>
          <div><label htmlFor="skill-percentage" className="mb-2 block font-semibold">Yetkinlik yüzdesi</label><input id="skill-percentage" className="form-field" type="number" min={0} max={100} step={1} value={data.percentage} onChange={event => update("percentage", event.target.value)} required /></div>
          <div><label htmlFor="skill-icon" className="mb-2 block font-semibold">İkon</label><input id="skill-icon" className="form-field" value={data.icon} onChange={event => update("icon", event.target.value)} list="skill-icons" /><datalist id="skill-icons">{["SiJavascript", "SiTypescript", "FaReact", "FaJava", "FaCss3Alt", "FaHtml5", "FaNodeJs", "SiNextdotjs", "SiDotnet", "SiKotlin", "FaPython", "FaPhp", "SiFirebase", "SiMongodb", "SiExpress"].map(icon => <option key={icon} value={icon} />)}</datalist></div>
        </fieldset>
        {error && <p role="alert" className="text-danger">{error}</p>}
        <button className="button-primary" type="submit" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button>
      </form>
    </section>
  );
}
