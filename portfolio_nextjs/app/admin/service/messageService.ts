import Message from "../../components/Message";
import { deleteMessage, getMessages } from "./../../api/api";
export class MessageService {
  static async getMessages() {
    try {
      const response = await getMessages().then((res) => {
        return res;
      });
      if (response) {
        return response;
      } else {
        return 0;
      }
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
  static async deleteMessage(id: any) {
    try {
      const response = await deleteMessage(id).then((res) => {
        return res;
      });
      if (response.status == 200) {
        Message.ToastMessage("info", "Message deleted successfully.");
      } else {
        Message.ToastMessage("error", "An error occured.");
      }
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
