import { getSocialLinks } from "../api/api";
import Message from "../components/Message";

export class SocialService {
  static async getSocials() {
    try {
      const response = await getSocialLinks().then((res) => {
        return res;
      });
      return response;
    } catch (error) {
      Message.ToastMessage("error", error);
    }
  }
}
