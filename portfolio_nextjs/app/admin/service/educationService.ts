import {
  createEducations,
  deleteEducations,
  getEducations,
  getOneEducations,
  updateEducations,
} from "../../api/api";
import Message from "../../components/Message";

export class EducationService {
  static async getEducations() {
    try {
      return await getEducations().then((res) => {
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async getEducation(id: any) {
    try {
      return await getOneEducations(id).then((res) => {
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async addEducation(data: any) {
    try {
      return await createEducations(data).then((res) => {
        if (Number(res.status) === 201) {
          Message.ToastMessage(
            "success",
            data.institution + " successfull added."
          );
        } else {
          Message.ToastMessage("error", "Bir hata oluştu");
        }
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteEducation(id: any) {
    try {
      return await deleteEducations(id).then((res) => {
        if (Number(res.status) === 200) {
          Message.ToastMessage("success", res.data.institution + " successfull deleted.");
        } else {
          Message.ToastMessage("error", " An error ocurred.");
        }
        return res;
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async updateEducation(id: any, data: any) {
    try {
      return await updateEducations(id, data).then((res) => {
        if (Number(res.status) === 200) {
          Message.ToastMessage(
            "success",
            data.institution + " successfull updated."
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
}
