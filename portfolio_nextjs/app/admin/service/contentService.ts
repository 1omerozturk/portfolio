import {
  createContents,
  deleteContents,
  getContents,
  getOneContent,
  updateContents,
} from "../../api/api";
import Message from "../../components/Message";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData } from "../../api/payload";

export type ContentInput = { name: string; link: string; image?: string };

export class ContentService {
  static async getContents() {
    try {
      const response = await getContents().then((res) => {
        return res;
      });
      if (response) {
        const records = unwrapApiData(response.data);
        if (!Array.isArray(records)) throw new Error("Invalid content collection");
        return { ...response, data: normalizeApiRecords(records) };
      } else {
        return 0;
      }
    } catch {
      Message.ToastMessage("error", "İçerikler yüklenemedi.");
    }
  }

  static async addContent(data: ContentInput) {
    try {
      const response = await createContents(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", data.name + " başarıyla eklendi.");
          return res;
        } else {
          Message.ToastMessage("warning", "Bir hata oluştu tekrar deneyin.");
        }
      });
      return response;
    } catch {
      Message.ToastMessage("error", "İçerik eklenemedi.");
    }
  }

  static async getContent(id: string) {
    try {
      return await getOneContent(id).then((res) => {
        return { ...res, data: normalizeApiRecord(unwrapApiData(res.data)) };
      });
    } catch {
      Message.ToastMessage("error", "İçerik yüklenemedi.");
    }
  }

  static async updateContents(id: string, data: Partial<ContentInput>) {
    try {
      return await updateContents(id, data).then((res) => {
        return res;
      });
    } catch {
      Message.ToastMessage("error", "İçerik güncellenemedi.");
    }
  }

  static async deleteContent(id: string) {
    try {
      return await deleteContents(id).then((res) => {
        return res;
      });
    } catch {
      Message.ToastMessage("error", "İçerik silinemedi.");
    }
  }
}
