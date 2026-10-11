import type { Locale } from "./config";

const tr = {
  nav: { home: "Ana sayfa", skills: "Yetenekler", contents: "İçerikler", projects: "Projeler", educations: "Eğitim", experiences: "Deneyim", certificates: "Sertifikalar", blog: "Blog", about: "Hakkımda", contact: "İletişim", languages: "Diller", hobbies: "Hobiler" },
  common: { loading: "Yükleniyor…", retry: "Yeniden dene", back: "Geri", skip: "Ana içeriğe geç", light: "Açık", dark: "Koyu" },
  interests: { eyebrow: "Beni daha yakından tanıyın", languagesDescription: "İletişim kurduğum diller ve yeterlilik seviyelerim.", hobbiesDescription: "İş dışında ilgilendiğim alanlar ve keyif aldığım uğraşlar.", noLanguages: "Henüz dil bilgisi eklenmedi.", noHobbies: "Henüz hobi eklenmedi." },
};
type Dictionary = { [K in keyof typeof tr]: { [P in keyof typeof tr[K]]: string } };
const en: Dictionary = {
  nav: { home: "Home", skills: "Skills", contents: "Contents", projects: "Projects", educations: "Education", experiences: "Experience", certificates: "Certificates", blog: "Blog", about: "About", contact: "Contact", languages: "Languages", hobbies: "Hobbies" },
  common: { loading: "Loading…", retry: "Try again", back: "Back", skip: "Skip to content", light: "Light", dark: "Dark" },
  interests: { eyebrow: "Get to know me", languagesDescription: "The languages I use and my proficiency levels.", hobbiesDescription: "My interests and the things I enjoy outside work.", noLanguages: "No languages have been added yet.", noHobbies: "No hobbies have been added yet." },
};
export function getDictionary(locale: Locale): Dictionary { return locale === "en" ? en : tr; }
