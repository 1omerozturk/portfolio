import {
  createProject,
  deleteProjects,
  getOneProjects,
  getProjects,
  updateProject,
} from "../../api/api";
import Message from "../../components/Message";

export class ProjectService {
  static async addProject(data: any) {
    try {
      const response = await createProject(data).then((res) => {
        if (res?.status == 201) {
          Message.ToastMessage("success", data.name + " başarıyla eklendi.");
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

  static async getProjects() {
    try {
      const response = await getProjects().then((res) => {
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

  static async getProject(id: any) {
    try {
      return await getOneProjects(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }

  static async updateSkill(id: any, data: any) {
    try {
      return await updateProject(id, data).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
  static async deleteSkill(id: any) {
    try {
      return await deleteProjects(id).then((res) => {
        return res;
      });
    } catch (error) {
      Message.ToastMessage("error", error.response.data.message);
    }
  }
}
