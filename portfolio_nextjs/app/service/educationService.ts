import { getEducations, getOneEducations } from "./../api/api";

export class EducationService {
  static async getEducations() {
    const education = await getEducations().then((res) => {
      return res;
    });
    return education;
  }

  static async getEducation(id: string) {
    const education = await getOneEducations(id).then((res) => {
      return res;
    });
    return education;
  }
}
