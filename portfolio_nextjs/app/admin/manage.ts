import { createPersonalInfo, createSocialLinks } from "../api/api";


export class Manage{
    static async addPersonalInfo(data: any) {
        return createPersonalInfo(data);
        }

    static async addSocialLinks(data: any) {
        return createSocialLinks(data);
    }

}