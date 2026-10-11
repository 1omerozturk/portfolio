import { login, getAdminAuth, updatePassword, getToken } from "../api/api";
import Message from "../components/Message";
import { isAxiosError } from "axios";

export class AdminAuth {
  // login
  static async login(username: string, password: string) {
    try {
      const response = await login(username, password);
      const admin = response.data;
      if (admin) {
        // login message
        Message.ToastMessage("success", "Giriş Başarılı");
        localStorage.setItem("token", admin.token);
        localStorage.setItem("admin", JSON.stringify(admin));
        return response;
      }
      return null;
    } catch {
      // login failed message
      Message.ToastMessage("error", "İşlem tamamlanamadı. Bilgilerinizi kontrol edin.");
      return null;
    }
  }
  // logout
  static async logout() {
    try { localStorage.removeItem("admin"); localStorage.removeItem("token"); } catch { /* Storage may be disabled. */ }
    // Logout Message
    Message.ToastMessage("warning", "Çıkış Başarılı");
  }

  // resetpassword
  static async resetPassword(
    username: string,
    password: string,
    rePassword: string,
  ) {
    try {
      const response=await updatePassword(username,password,rePassword);
      if (response.status === 200) { localStorage.removeItem("token"); localStorage.removeItem("admin"); }
      return response;
    } catch {
      Message.ToastMessage("error", "İşlem tamamlanamadı. Bilgilerinizi kontrol edin.");
      return null;
    }
  }
  //get Admin
  static async getAdmin() {
    const response = await getAdminAuth();
    const admin = response.data;
    if (admin) {
      return admin;
    }
    return null;
  }
  static async isLoggedIn() {
    if (!getToken()) return false;
    try {
      return (await getAdminAuth()).status === 200;
    } catch (error) {
      if (isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        return false;
      }
      throw error;
    }
  }
}


