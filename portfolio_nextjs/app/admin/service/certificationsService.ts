import { createCertifications, deleteCertifications, getCertifications as fetchCertifications, getOneCertifications, updateCertifications } from "../../api/api";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData } from "../../api/payload";

export type CertificationInput = { name: string; issuingOrganization?: string; issueDate?: string; certificateLink?: string; certificateImage?: string; type?: string };

export class CertificationService {
  static async getCertifications() {
    const response = await fetchCertifications();
    const payload = unwrapApiData(response.data);
    const records = Array.isArray(payload) ? payload : typeof payload === "object" && payload !== null && "certifications" in payload ? payload.certifications : null;
    if (!Array.isArray(records)) throw new Error("Sertifika listesi yüklenemedi.");
    return normalizeApiRecords(records);
  }
  static async getCertification(id: string) {
    const response = await getOneCertifications(id);
    const record = normalizeApiRecord(unwrapApiData(response.data));
    if (!record) throw new Error("Sertifika yüklenemedi.");
    return { ...response, data: record };
  }
  static async createCertification(data: CertificationInput) { return createCertifications(data); }
  static async updateCertification(id: string, data: Partial<CertificationInput>) { return updateCertifications(id, data); }
  static async deleteCertification(id: string) { return deleteCertifications(id); }
}
