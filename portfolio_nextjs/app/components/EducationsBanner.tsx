import { FaGraduationCap } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";

type Education = {
  _id?: string;
  institution?: string;
  institutionLogo?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  description?: string;
  activities?: string[];
};

interface EducationSizeProps {
  size?: number;
}

function formatDate(value?: string, fallback = "—") {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : date.toLocaleDateString("tr-TR", { month: "short", year: "numeric", timeZone: "Europe/Istanbul" });
}

export default async function EducationsBanner({ size }: EducationSizeProps) {
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList<Education>("/user/educations", ["educations", "items"]);
  const educations = result.status === "ok"
    ? result.items.filter((education) => education && typeof education.institution === "string")
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
        <PageHeader title="Eğitim" level={size ? 2 : 1} icon={<FaGraduationCap />} />

        {displayedEducations.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {displayedEducations.map((education, index) => (
              <article className="surface-card flex flex-col gap-5 p-5 sm:flex-row sm:p-6" key={education._id ?? `${education.institution}-${index}`}>
                {isSafeHttpUrl(education.institutionLogo) && (
                  <img src={education.institutionLogo} alt={`${education.institution} logosu`} width="96" height="96" loading="lazy" decoding="async" className="education-card__logo" />
                )}
                <div className="min-w-0 flex-1">
                  <CardHeading className="text-xl font-bold text-ink">{education.institution}</CardHeading>
                  {education.degree && <p className="mt-1 font-medium text-brand">{education.degree}</p>}
                  {education.fieldOfStudy && <p className="text-quiet">{education.fieldOfStudy}</p>}
                  <p className="mt-3 text-sm text-quiet">
                    {formatDate(education.startDate)} – {formatDate(education.endDate, "Devam ediyor")}
                    {education.grade ? ` · ${education.grade}` : ""}
                  </p>
                  {education.description && <p className="mt-3 leading-relaxed text-quiet">{education.description}</p>}
                  {Array.isArray(education.activities) && education.activities.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Etkinlikler">
                      {education.activities.filter((activity) => typeof activity === "string").map((activity, itemIndex) => <li className="content-tag" key={`${education._id ?? index}-${itemIndex}`}>{activity}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="surface-card p-8 text-center text-quiet" role="status">
            {result.status === "unavailable" ? "Eğitim bilgileri şu anda yüklenemiyor." : "Henüz eğitim bilgisi bulunmuyor."}
          </p>
        )}

        {size && orderedEducations.length > size && <div className="mt-8"><SeeMore path="educations" /></div>}
      </div>
    </section>
  );
}
