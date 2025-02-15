import { login, getAdminAuth } from "../api/api";
import Message from "../components/Message";

export class AdminAuth {
  static async login(username: string, password: string) {
    try {
      const response = await login(username, password);
      console.log(response);
      const admin = response.data;
      if (admin) {
        // login message
        Message.ToastMessage("success", "Giriş Başarılı");
        localStorage.setItem("token", admin.token);
        localStorage.setItem("admin", JSON.stringify(admin));
        console.log(admin);
        return response;
      }
      return null;
    } catch (error) {
      // login failed message
      Message.ToastMessage("error", error.response.data.message);
      return null;
    }
  }
  static async logout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    // Logout Message
    Message.ToastMessage("warning", "Çıkış Başarılı");
  }
  static async getAdmin() {
    const response = await getAdminAuth();
    const admin = response.data;
    if (admin) {
      return admin;
    }
    return null;
  }
  static async isLoggedIn() {
    return localStorage.getItem("token") ? true : false;
  }
}
