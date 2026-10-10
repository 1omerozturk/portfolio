import Message from "../../components/Message";
import { deleteMessageApi, getMessagesApi, markMessageApi } from "../../api/api";
import { collectionResponse, recordResponse } from "./recordResponse";

export class MessageService {
  static async getMessages() {
    try { return collectionResponse(await getMessagesApi()); }
    catch { Message.ToastMessage("error", "Mesajlar yüklenemedi."); throw new Error("Mesajlar yüklenemedi."); }
  }
  static async deleteMessage(id: string) {
    try {
      const response = await deleteMessageApi(id);
      if (response.status < 200 || response.status >= 300) throw new Error("Unexpected delete response");
      Message.ToastMessage("success", "Mesaj silindi.");
      return response;
    } catch { Message.ToastMessage("error", "Mesaj silinemedi."); throw new Error("Mesaj silinemedi."); }
  }
  static async markMessage(id: string, isRead: boolean) {
    try {
      const response = recordResponse(await markMessageApi(id, isRead));
      Message.ToastMessage("success", isRead ? "Mesaj okundu olarak işaretlendi." : "Mesaj okunmadı olarak işaretlendi.");
      return response.data;
    } catch { Message.ToastMessage("error", "Mesaj durumu güncellenemedi."); throw new Error("Mesaj durumu güncellenemedi."); }
  }
}
