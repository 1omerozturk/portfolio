import Message from "../../components/Message";
import {
  deleteMessageApi,
  getMessagesApi,
  markMessageApi,
} from "./../../api/api";
export class MessageService {
  static async getMessages() {
    try {
      const response = await getMessagesApi().then((res) => {
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
      const response = await deleteMessageApi(id).then((res) => {
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

  static async markMessage(id: any, isRead: any) {
    try {
      const response = await markMessageApi(id, isRead);
      console.log(response);

      const statusMessage = isRead
        ? "Message marked as read."
        : "Message marked as unread.";
      const messageType = isRead ? "success" : "info";

      if (response.status === 200) {
        Message.ToastMessage(messageType, statusMessage);
        return response.data;
      }

      Message.ToastMessage("error", "An unexpected response occurred.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      Message.ToastMessage("error", errorMessage);
      throw error;
    }
  }
}
