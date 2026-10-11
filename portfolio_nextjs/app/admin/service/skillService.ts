import {
  createSkills,
  deleteSkills,
  getOneSkills,
  getSkills,
  updateSkills,
} from "../../api/api";
import Message from "../../components/Message";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData } from "../../api/payload";

export type SkillInput = { name: string; nameEn?: string; level?: string; percentage?: number | string; icon?: string; color?: string };

export class SkillService {
  static async addSkill(data: SkillInput) {
    try {
      const response = await createSkills(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", data.name + " eklendi.");
          return res?.status;
        } else {
          Message.ToastMessage("warning", "Bir hata oluştu tekrar deneyin.");
        }
      });
      return response;
    } catch {
      Message.ToastMessage("error", "Yetenek eklenemedi.");
    }
  }

  static async getSkills() {
    try {
      const response = await getSkills().then((res) => {
        return res;
      });
      if (response) {
        const records = unwrapApiData(response.data);
        if (!Array.isArray(records)) throw new Error("Invalid skill collection");
        return { ...response, data: normalizeApiRecords(records) };
      } else {
        return 0;
      }
    } catch {
      Message.ToastMessage("error", "Yetenekler yüklenemedi.");
    }
  }

  static async getSkill(id: string) {
    try {
      return await getOneSkills(id).then((res) => {
        return { ...res, data: normalizeApiRecord(unwrapApiData(res.data)) };
      });
    } catch {
      Message.ToastMessage("error", "Yetenek yüklenemedi.");
    }
  }

  static async updateSkill(id: string, data: Partial<SkillInput>) {
    try {
      return await updateSkills(id, data).then((res) => {
        return res;
      });
    } catch {
      Message.ToastMessage("error", "Yetenek güncellenemedi.");
    }
  }
  static async deleteSkill(id: string) {
    try {
      return await deleteSkills(id).then((res) => {
        return res;
      });
    } catch {
      Message.ToastMessage("error", "Yetenek silinemedi.");
    }
  }
}

