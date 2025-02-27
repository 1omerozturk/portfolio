import {
  createCertifications,
  deleteCertifications,
  getCertifications,
  getOneCertifications,
  updateCertifications,
} from "./../../api/api";
export class CertificationService {
  static async getCertifications() {
    const response = await getCertifications().then((res) => {
      return res;
    });
    return response;
  }

  static async getCertification(id: any) {
    const response = await getOneCertifications(id).then((res) => {
      return res;
    });
    return response;
  }

  static async createCertification(data: any) {
    const response = await createCertifications(data).then((res) => {
      return res;
    });
    return response;
  }

  static async updateCertification(id: any, data: any) {
    const response = await updateCertifications(id, data).then((res) => {
      return res;
    });
    return response;
  }

  static async deleteCertification(id: any) {
    const response = await deleteCertifications(id).then((res) => {
      return res;
    });
    return response;
  }
}
