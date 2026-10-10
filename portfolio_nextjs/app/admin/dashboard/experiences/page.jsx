"use client";
import TimelineList from "../../components/TimelineList";
import { ExperienceService } from "../../service/experienceService";
export default function Experiences() {
  return <TimelineList title="Deneyim" path="/admin/dashboard/experiences" titleField="company" subtitleField="position" load={ExperienceService.getExperiences} remove={ExperienceService.deleteExperience} />;
}
