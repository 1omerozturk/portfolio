"use client";
import TimelineForm, { type TimelineField } from "../../../components/TimelineForm";
import { ExperienceService } from "../../../service/experienceService";
const fields: TimelineField[] = [
  { name: "companyEn", label: "İngilizce şirket adı (isteğe bağlı)" }, { name: "positionEn", label: "İngilizce pozisyon (isteğe bağlı)" },
  { name: "company", label: "Şirket", required: true }, { name: "position", label: "Pozisyon", required: true },
  { name: "startDate", label: "Başlangıç tarihi", type: "date", required: true }, { name: "endDate", label: "Bitiş tarihi", type: "date" },
  { name: "companyLogo", label: "Şirket görseli", image: true },
];
export default function AddExperience({ experience }: { experience?: Record<string, unknown> & { _id: string } }) {
  return <TimelineForm title={experience ? "Deneyimi düzenle" : "Deneyim ekle"} returnPath="/admin/dashboard/experiences" fields={fields} record={experience} listName="responsibilities" listLabel="Sorumluluklar" save={(values, responsibilities, responsibilitiesEn) => {
    const payload = { ...values, company: values.company, responsibilities, responsibilitiesEn };
    return experience ? ExperienceService.updateExperience(experience._id, payload) : ExperienceService.addExperience(payload);
  }} />;
}
