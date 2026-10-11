import { createProject, deleteProjects, getOneProjects, getProjects, updateProject } from "../../api/api";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData } from "../../api/payload";
import Message from "../../components/Message";

type ProjectInput = {
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  type?: string;
  technologies?: string[];
  images?: string[];
  repoLink?: string;
  liveDemoLink?: string;
  isShowcasing?: boolean | string;
};

export class AdminProjectService {
  static async addProject(data: ProjectInput) {
    try {
      const response = await createProject(data);
      Message.ToastMessage("success", `${data.title} başarıyla eklendi.`);
      return { ...response, data: normalizeApiRecord(unwrapApiData(response.data)) };
    } catch {
      Message.ToastMessage("error", "Proje eklenemedi. Lütfen yeniden deneyin.");
      return null;
    }
  }

  static async getProjects() {
    try {
      const response = await getProjects();
      const payload = unwrapApiData(response.data);
      const records = Array.isArray(payload) ? payload : typeof payload === "object" && payload !== null && "projects" in payload ? payload.projects : null;
      if (!Array.isArray(records)) throw new Error("Invalid project collection");
      return { ...response, data: normalizeApiRecords(records) };
    } catch {
      Message.ToastMessage("error", "Projeler yüklenemedi. Lütfen yeniden deneyin.");
      return null;
    }
  }

  static async getProject(id: string) {
    try {
      const response = await getOneProjects(id);
      const record = normalizeApiRecord(unwrapApiData(response.data));
      if (!record) throw new Error("Invalid project record");
      return { ...response, data: record };
    } catch {
      Message.ToastMessage("error", "Proje yüklenemedi. Lütfen yeniden deneyin.");
      return null;
    }
  }

  static async updateProject(id: string, data: Partial<ProjectInput>) {
    try {
      const response = await updateProject(id, data);
      return { ...response, data: normalizeApiRecord(unwrapApiData(response.data)) };
    } catch {
      Message.ToastMessage("error", "Proje güncellenemedi. Lütfen yeniden deneyin.");
      return null;
    }
  }

  static async deleteProject(id: string) {
    try {
      return await deleteProjects(id);
    } catch {
      Message.ToastMessage("error", "Proje silinemedi. Lütfen yeniden deneyin.");
      return null;
    }
  }
}
