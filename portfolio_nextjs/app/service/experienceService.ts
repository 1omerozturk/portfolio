import { getExperiences, getOneExperiences } from "./../api/api";

export class ExperienceService {
  static async getExperiences() {
    try {
      const response = await getExperiences().then((res) => {
        return res;
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  static async getExperience(id) {
    try {
      const response = await getOneExperiences(id).then((res) => {
        return res;
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
