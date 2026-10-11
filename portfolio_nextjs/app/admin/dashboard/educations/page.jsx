"use client";
import TimelineList from "../../components/TimelineList";
import { EducationService } from "../../service/educationService";
export default function EducationsDashboard() {
  return (
    <TimelineList
      title="Eğitim"
      path="/admin/dashboard/educations"
      titleField="institution"
      subtitleField="degree"
      load={EducationService.getEducations}
      remove={EducationService.deleteEducation}
    />
  );
}
