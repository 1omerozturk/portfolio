import { createPersonalInfo, createSocialLinks } from "../api/api";


export class Manage{
    static async addPersonalInfo(data: Record<string, unknown>) {
        return createPersonalInfo(data);
        }

    static async addSocialLinks(data: Record<string, unknown>) {
        return createSocialLinks(data);
    }

}
