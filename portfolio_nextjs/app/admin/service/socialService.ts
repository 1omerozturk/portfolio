import { createSocialLinks, deleteSocialLinks, getOneSocialLinks, getSocialLinks, updateSocialLinks } from "../../api/api";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData } from "../../api/payload";
import { isSafeHttpUrl } from "../../api/urlSafety";
import Message from "../../components/Message";

export type SocialInput = { name: string; url: string; icon?: string };

function validate(data: SocialInput) {
  if (!data.name.trim() || !isSafeHttpUrl(data.url)) throw new Error("Geçerli sosyal bağlantı bilgileri girin.");
  return { ...data, name: data.name.trim(), url: data.url.trim() };
}
export class SocialService {
  static async addSocialLink(data: SocialInput) {
    try { const response = await createSocialLinks(validate(data)); Message.ToastMessage("success", "Sosyal bağlantı eklendi."); return response; }
    catch { Message.ToastMessage("error", "Sosyal bağlantı eklenemedi."); return null; }
  }
  static async getSocials() {
    try {
      const response = await getSocialLinks();
      const records = unwrapApiData(response.data);
      if (!Array.isArray(records)) throw new Error("Invalid social collection");
      return { ...response, data: normalizeApiRecords(records) };
    } catch { Message.ToastMessage("error", "Sosyal bağlantılar yüklenemedi."); return null; }
  }
  static async getSocial(id: string) {
    try {
      const response = await getOneSocialLinks(id);
      const record = normalizeApiRecord(unwrapApiData(response.data));
      if (!record) throw new Error("Invalid social record");
      return { ...response, data: record };
    } catch { Message.ToastMessage("error", "Sosyal bağlantı yüklenemedi."); return null; }
  }
  static async updateSocialLink(id: string, data: SocialInput) {
    try { return await updateSocialLinks(id, validate(data)); }
    catch { Message.ToastMessage("error", "Sosyal bağlantı güncellenemedi."); return null; }
  }
  static async deleteSocial(id: string) {
    try { return await deleteSocialLinks(id); }
    catch { Message.ToastMessage("error", "Sosyal bağlantı silinemedi."); return null; }
  }
}
