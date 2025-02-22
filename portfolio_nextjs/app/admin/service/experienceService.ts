import {
  createExperiences,
  deleteExperiences,
  getExperiences,
  getOneExperiences,
  updateExperiences,
} from "../../api/api";
import Message from "../../components/Message";

export class ExperienceService {
  static async getExperiences() {
    try {
      return await getExperiences().then((res) => {
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async getExperience(id: any) {
    try {
      return await getOneExperiences(id).then((res) => {
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async addExperience(data: any) {
    try {
      return await createExperiences(data).then((res) => {
        if (Number(res.status) === 201) {
          Message.ToastMessage(
            "success",
            data.company + " successfully added."
          );
        } else {
          Message.ToastMessage("error", "An error ocurred.");
        }
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteExperience(id: any) {
    try {
      return await deleteExperiences(id).then((res) => {
        if (Number(res.status) === 200) {
          Message.ToastMessage(
            "success",
            res.data.company + " sucessfully deleted."
          );
        } else {
          Message.ToastMessage("error", "An error occurred");
        }
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async updateExperience(id: any, data: any) {
    try {
      return await updateExperiences(id, data).then((res) => {
        if (Number(res.status) === 200) {
          Message.ToastMessage(
            "success",
            data.company + " successfully updated."
          );
        } else {
          Message.ToastMessage("error", "An error occurred");
        }
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
