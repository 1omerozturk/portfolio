import { login } from "../api/api";
export class AdminAuth {
  static async login(username:string, password:string) {
    try {
      const response = await login(username, password);
      console.log(response);
      const admin = response.data;
      if (admin) {
        localStorage.setItem("token", admin.token);
        localStorage.setItem("admin", JSON.stringify(admin));
        console.log(admin);
        return admin;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  }
  static logout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  }
  static getAdmin() {
    const admin = localStorage.getItem("admin");
    return admin ? JSON.parse(admin) : null;
  }
  static async isLoggedIn() {
    return (localStorage.getItem("token") ? true : false);
  }
}
