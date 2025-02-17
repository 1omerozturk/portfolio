import { getOneSkills, getSkills } from "../api/api";
import Message from "../components/Message";

export class SkillService {
  static async getSkills() {
    try {
      const response = await getSkills().then((res) => {
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

  static async getSkill(id: any) {
    try {
      return await getOneSkills(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
