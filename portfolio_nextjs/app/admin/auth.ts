// Localstorage and api calls for authentication and authorization of the admin

import { login } from "../api/api";

export class AdminAuth {
  static async login(username: string, password: string) {
    const admin = await login(username, password);
    if (admin) {
      localStorage.setItem("admin", admin);
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
