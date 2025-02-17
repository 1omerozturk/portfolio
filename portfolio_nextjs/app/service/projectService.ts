import { getProjects } from "../api/api";
import Message from "../components/Message";

export class ProjectService {
  static async getProjects() {
    try {
      const response = await getProjects().then((res) => {
        return res;
      });
      if (response) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
