import { getLocale } from "../i18n/server";
import { translatedText } from "../i18n/config";
import { FaGraduationCap } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";

import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import ContentMark from "./ContentMark";
import { normalizeEducation } from "../api/profilePayload";

interface EducationSizeProps {
  size?: number;
}

function formatDate(value: string | undefined, en: boolean, fallback = "—") {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : date.toLocaleDateString(en ? "en-GB" : "tr-TR", { month: "short", year: "numeric", timeZone: "Europe/Istanbul" });
}

export default async function EducationsBanner({ size }: EducationSizeProps) {
  const locale = await getLocale();
  const en = locale === "en";
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList("/user/educations", ["educations", "items"]);
  const educations = result.status === "ok"
    ? result.items.map(normalizeEducation).filter(education => education !== null)
    : [];
  const orderedEducations = [...educations].sort((first, second) => {
    const firstDate = new Date(first.startDate || 0).valueOf();
    const secondDate = new Date(second.startDate || 0).valueOf();
    return (Number.isNaN(secondDate) ? 0 : secondDate) - (Number.isNaN(firstDate) ? 0 : firstDate);
  });
  const displayedEducations = size ? orderedEducations.slice(0, size) : orderedEducations;

  return (
    <section className="surface-page px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <PageHeader title={en ? "Education" : "Eğitim"} level={size ? 2 : 1} icon={<FaGraduationCap />} />

        {displayedEducations.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {displayedEducations.map((education, index) => (
              <article className="surface-card flex flex-col gap-5 p-5 sm:flex-row sm:p-6" key={education._id ?? `${translatedText(education, "institution", locale)}-${index}`}>
                <ContentMark kind="educations" image={education.institutionLogo} />
                <div className="min-w-0 flex-1">
                  <CardHeading className="text-xl font-bold text-ink">{translatedText(education, "institution", locale)}</CardHeading>
                  {education.degree && <p className="mt-1 font-medium text-brand">{translatedText(education, "degree", locale)}</p>}
                  {education.fieldOfStudy && <p className="text-quiet">{translatedText(education, "fieldOfStudy", locale)}</p>}
                  <p className="mt-3 text-sm text-quiet">
                    {formatDate(education.startDate, en)} – {formatDate(education.endDate, en, en ? "Present" : "Devam ediyor")}
                    {education.grade ? ` · ${education.grade}` : ""}
                  </p>
                  {education.description && <p className="mt-3 leading-relaxed text-quiet">{translatedText(education, "description", locale)}</p>}
                  {(en && education.activitiesEn.length > 0 || education.activities.length > 0) && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={en ? "Activities" : "Etkinlikler"}>
                      {(en && education.activitiesEn.length ? education.activitiesEn : education.activities).filter((activity) => typeof activity === "string").map((activity, itemIndex) => <li className="content-tag" key={`${education._id ?? index}-${itemIndex}`}>{activity}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="surface-card p-8 text-center text-quiet" role="status">
            {result.status === "unavailable" ? (en ? "Education could not be loaded." : "Eğitim bilgileri şu anda yüklenemiyor.") : (en ? "No education records yet." : "Henüz eğitim bilgisi bulunmuyor.")}
          </p>
        )}

        {size && orderedEducations.length > size && <div className="mt-8"><SeeMore path="educations" /></div>}
      </div>
    </section>
  );
}




