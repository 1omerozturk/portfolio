import { API_BASE_URL, PUBLIC_API_TIMEOUT_MS } from "../api/config";
import type { ContactMessage } from "../models/contact";

export class MessageService {
  static async postMessage(data: ContactMessage) {
    return fetch(`${API_BASE_URL}/user/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(PUBLIC_API_TIMEOUT_MS),
    });
  }
}
