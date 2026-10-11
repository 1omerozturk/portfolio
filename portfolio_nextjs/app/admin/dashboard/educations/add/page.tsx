"use client";
import TimelineForm, { type TimelineField } from "../../../components/TimelineForm";
import { EducationService } from "../../../service/educationService";
const fields: TimelineField[] = [
  { name: "institutionEn", label: "İngilizce kurum (isteğe bağlı)" }, { name: "degreeEn", label: "İngilizce derece (isteğe bağlı)" },
  { name: "fieldOfStudyEn", label: "İngilizce bölüm (isteğe bağlı)" }, { name: "descriptionEn", label: "İngilizce açıklama (isteğe bağlı)", type: "textarea" },
  { name: "institution", label: "Kurum", required: true }, { name: "degree", label: "Derece", required: true },
  { name: "fieldOfStudy", label: "Bölüm", required: true }, { name: "startDate", label: "Başlangıç tarihi", type: "date", required: true },
  { name: "endDate", label: "Bitiş tarihi", type: "date" }, { name: "grade", label: "Not ortalaması" },
  { name: "description", label: "Açıklama", type: "textarea" }, { name: "institutionLogo", label: "Kurum görseli", image: true },
];
export default function EducationAdd({ education }: { education?: Record<string, unknown> & { _id: string } }) {
  return <TimelineForm title={education ? "Eğitimi düzenle" : "Eğitim ekle"} returnPath="/admin/dashboard/educations" fields={fields} record={education} listName="activities" listLabel="Etkinlikler" save={(values, activities, activitiesEn) => {
    const payload = { ...values, institution: values.institution, activities, activitiesEn };
    return education ? EducationService.updateEducation(education._id, payload) : EducationService.addEducation(payload);
  }} />;
}
