import { postMessagesApi } from "../api/api";
import type { ContactMessage } from "../models/contact";

export class MessageService {
  static async postMessage(data: ContactMessage) {
    return postMessagesApi(data);
  }
}
