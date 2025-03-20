import { deleteMessage, postMessages } from "../api/api";
import Message from "../components/Message";

export class MessageService {
  static async postMessage(data: any) {
    try {
      const response = await postMessages(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", "Message sent successfully");
          return res;
        } else {
          Message.ToastMessage("warning", "Bir hata oluştu tekrar deneyin.");
        }
      });
      return response;
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }

  static async deleteMessage(id: any) {
    try {
      return await deleteMessage(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", "Bir hata oluştu tekrar deneyin.");
    }
  }
}
