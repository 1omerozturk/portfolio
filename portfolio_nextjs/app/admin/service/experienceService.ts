import { createExperiences, deleteExperiences, getExperiences, getOneExperiences, updateExperiences } from "../../api/api";
import Message from "../../components/Message";
import { collectionResponse, recordResponse } from "./recordResponse";
export type ExperienceInput = { company: string; position?: string; startDate?: string | Date; endDate?: string | Date; responsibilities?: string[]; companyLogo?: string };
export class ExperienceService {
  static async getExperiences() {
    try { return collectionResponse(await getExperiences()); }
    catch { Message.ToastMessage("error", "Kayıtlar yüklenemedi."); return null; }
  }
  static async getExperience(id: string) {
    try { return recordResponse(await getOneExperiences(id)); }
    catch { Message.ToastMessage("error", "Kayıt yüklenemedi."); return null; }
  }
  static async addExperience(data: ExperienceInput) {
    try { const response = await createExperiences(data); Message.ToastMessage("success", "Kayıt eklendi."); return response; }
    catch { Message.ToastMessage("error", "Kayıt eklenemedi."); return null; }
  }
  static async updateExperience(id: string, data: Partial<ExperienceInput>) {
    try { return await updateExperiences(id, data); }
    catch { Message.ToastMessage("error", "Kayıt güncellenemedi."); return null; }
  }
  static async deleteExperience(id: string) {
    try { return await deleteExperiences(id); }
    catch { Message.ToastMessage("error", "Kayıt silinemedi."); return null; }
  }
}
