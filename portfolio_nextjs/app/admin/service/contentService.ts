import {
  createContents,
  deleteContents,
  getContents,
  getOneContent,
  updateContents,
} from "../../api/api";
import Message from "../../components/Message";

export class ContentService {
  static async getContents() {
    try {
      const response = await getContents().then((res) => {
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

  static async addContent(data: any) {
    try {
      const response = await createContents(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", data.title + " başarıyla eklendi.");
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

  static async getContent(id: any) {
    try {
      return await getOneContent(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error);
    }
  }

  static async updateContents(id: any, data: any) {
    try {
      return await updateContents(id, data).then((res) => {
        console.log(res)
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error);
    }
  }

  static async deleteContent(id: any) {
    try {
      return await deleteContents(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
