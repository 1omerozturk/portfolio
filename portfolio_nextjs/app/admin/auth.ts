// Localstorage and api calls for authentication and authorization of the admin

import { login } from "../api/api";

export class AdminAuth {
  static async login(username: string, password: string) {
    const admin = await login(username, password).then((data)=>{return data.data});
    if (admin) {
      localStorage.setItem("admin", admin);
      console.log(admin)
      return admin;
    }
    return null;
  }

  static async logout() {
    localStorage.removeItem("admin");
  }

  static async getAdmin() {
    return localStorage.getItem("admin");
  }

  static isLoggedIn() {
    localStorage.getItem("admin") ? true : false;
  }
}
