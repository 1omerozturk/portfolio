import { getContents, getOneContent } from "../api/api";

export class ContentService {
  static async getContents() {
    const response = await getContents().then((res) => {
      return res;
    });
    return response;
  }
  
  static async getContent(id: any) {
    const response = await getOneContent(id).then((res) => {
      return res;
    });
    return response;
  }
}
