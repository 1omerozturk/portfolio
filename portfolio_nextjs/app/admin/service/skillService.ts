import {
  createSkills,
  getOneSkills,
  getSkills,
  updateSkills,
} from "../../api/api";
import Message from "../../components/Message";

export class SkillService {
  static async addSkill(data: any) {
    try {
      const response = await createSkills(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", data.name + " eklendi.");
          return res?.status;
        } else {
          Message.ToastMessage("warning", "Bir hata oluştu tekrar deneyin.");
        }
      });
      console.log(response);
      return response;
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }

  static async getSkills() {
    try {
      const response = await getSkills().then((res) => {
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

  static async getSkill(id: any) {
    try {
      return await getOneSkills(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }

  static async updateSkill(id: any, data: any) {
    try {
      return await updateSkills(id, data).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
