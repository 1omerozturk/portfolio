import Link from "next/link";
import { FaLanguage, FaHeart } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import PageHeader from "./PageHeader";
import { getLocale } from "../i18n/server";
import { getDictionary } from "../i18n/dictionaries";
import { localizedPath, translatedText } from "../i18n/config";
import ContentMark from "./ContentMark";

export default async function InterestsSection({ kind }: { kind: "languages" | "hobbies" }) {
  const languages = kind === "languages";
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const result = await fetchPublicList(`/user/${kind}`, [kind]);
  const items = result.status === "ok" ? result.items.filter(item => typeof item.name === "string" && item.name.trim()) : [];
  const title = dictionary.nav[kind];
  return <main className="surface-page min-h-[70vh] px-4 py-12 sm:px-6">
    <div className="mx-auto max-w-5xl">
      <PageHeader title={title} eyebrow={dictionary.interests.eyebrow} description={languages ? dictionary.interests.languagesDescription : dictionary.interests.hobbiesDescription} icon={languages ? <FaLanguage /> : <FaHeart />} />
      {items.length ? <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <li className="surface-card p-6" key={String(item._id)}>
        <div className="mb-4"><ContentMark kind={kind} iconName={item.icon} /></div>
        <h2 className="break-words text-xl font-bold text-ink">{translatedText(item, "name", locale)}</h2>
        {languages ? <p className="mt-3 text-quiet">{translatedText(item, "proficiency", locale) || (locale === "en" ? "No proficiency level has been added yet." : "Seviye bilgisi henüz eklenmedi.")}</p> : <p className="mt-3 whitespace-pre-line break-words leading-relaxed text-quiet">{translatedText(item, "description", locale) || (locale === "en" ? "No description has been added yet." : "Bu ilgi alanına ilişkin açıklama henüz eklenmedi.")}</p>}
      </li>)}</ul> : <p className="surface-card p-8 text-center text-quiet" role="status">{result.status === "unavailable" ? (locale === "en" ? "Information is currently unavailable. Please try again later." : `${title} şu anda yüklenemiyor. Lütfen biraz sonra yeniden deneyin.`) : languages ? dictionary.interests.noLanguages : dictionary.interests.noHobbies}</p>}
      <nav aria-label={locale === "en" ? "Personal information" : "Kişisel bilgiler"} className="mt-8 flex flex-wrap justify-center gap-3"><Link className="button-secondary" href={localizedPath("/about", locale)}>{dictionary.nav.about}</Link><Link className="button-secondary" href={localizedPath(languages ? "/hobbies" : "/languages", locale)}>{languages ? dictionary.nav.hobbies : dictionary.nav.languages}</Link></nav>
    </div>
  </main>;
}
