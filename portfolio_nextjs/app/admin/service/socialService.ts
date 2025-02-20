import {
  createSocialLinks,
  deleteSocialLinks,
  getOneSocialLinks,
  getSocialLinks,
  updateSocialLinks,
} from "../../api/api";
import Message from "../../components/Message";

export class SocialService {
  static async addSocialLink(data: any) {
    try {
      const response = await createSocialLinks(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", data.name + " eklendi.");
          return res;
        } else {
          Message.ToastMessage("warning", "Bir hata oluştu tekrar deneyin.");
          return res;
        }
      });
      return response;
    } catch (error) {
      Message.ToastMessage("error", error);
    }
  }

  static async getSocials() {
    try {
      const response = await getSocialLinks().then((res) => {
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
  static async getSocial(id: any) {
    try {
      const response = await getOneSocialLinks(id).then((res) => {
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
  static async updateSocialLink(id:any, data:any) {
    try {
      return await updateSocialLinks(id, data).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }

  static async deleteSocial(id: any) {
    try {
      return await deleteSocialLinks(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
