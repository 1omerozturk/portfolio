import { createEducations, deleteEducations, getEducations, getOneEducations, updateEducations } from "../../api/api";
import Message from "../../components/Message";
import { collectionResponse, recordResponse } from "./recordResponse";
export type EducationInput = { institution: string; degree?: string; fieldOfStudy?: string; startDate?: string | Date; endDate?: string | Date; grade?: string; activities?: string[]; description?: string; institutionLogo?: string };
export class EducationService {
  static async getEducations() {
    try { return collectionResponse(await getEducations()); }
    catch { Message.ToastMessage("error", "Kayıtlar yüklenemedi."); return null; }
  }
  static async getEducation(id: string) {
    try { return recordResponse(await getOneEducations(id)); }
    catch { Message.ToastMessage("error", "Kayıt yüklenemedi."); return null; }
  }
  static async addEducation(data: EducationInput) {
    try { const response = await createEducations(data); Message.ToastMessage("success", "Kayıt eklendi."); return response; }
    catch { Message.ToastMessage("error", "Kayıt eklenemedi."); return null; }
  }
  static async updateEducation(id: string, data: Partial<EducationInput>) {
    try { return await updateEducations(id, data); }
    catch { Message.ToastMessage("error", "Kayıt güncellenemedi."); return null; }
  }
  static async deleteEducation(id: string) {
    try { return await deleteEducations(id); }
    catch { Message.ToastMessage("error", "Kayıt silinemedi."); return null; }
  }
}
