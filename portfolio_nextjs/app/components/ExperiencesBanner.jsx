import ContentMark from "./ContentMark";
import { getLocale } from "../i18n/server";
import { translatedText } from "../i18n/config";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import { normalizeExperience } from "../api/profilePayload";

function formatDate(value, en, fallback = "—") {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? ""
    : date.toLocaleDateString(en ? "en-GB" : "tr-TR", { month: "short", year: "numeric", timeZone: "Europe/Istanbul" });
}

export default async function ExperiencesBanner({ size }) {
  const locale = await getLocale();
  const en = locale === "en";
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList("/user/experiences", ["experiences", "items"]);
  const experiences = result.status === "ok"
    ? result.items.map(normalizeExperience).filter(experience => experience !== null)
    : [];
  experiences.sort((first, second) => {
    const firstDate = Date.parse(first.startDate);
    const secondDate = Date.parse(second.startDate);
    return (Number.isFinite(secondDate) ? secondDate : 0) - (Number.isFinite(firstDate) ? firstDate : 0);
  });
  const displayedExperiences = size ? experiences.slice(0, size) : experiences;

  return (
    <section className="surface-page mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <PageHeader title={en ? "Experience" : "Deneyim"} level={size ? 2 : 1} icon={<FaBuilding />} />

        {displayedExperiences.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {displayedExperiences.map((experience, index) => {
              const localizedResponsibilities = en && experience.responsibilitiesEn.length ? experience.responsibilitiesEn : experience.responsibilities;
              const responsibilities = Array.isArray(localizedResponsibilities)
                ? localizedResponsibilities.filter((responsibility) => typeof responsibility === "string")
                : [];
              return (
                <article className="surface-card p-6" key={experience._id ?? experience.id ?? `${translatedText(experience, "company", locale)}-${index}`}>
                  <div className="mb-4 flex items-start gap-3">
                    <ContentMark kind="experiences" image={experience.companyLogo} />
                    <div className="min-w-0 break-words">
                      <CardHeading className="text-xl font-bold text-ink">{translatedText(experience, "position", locale) || (en ? "Position" : "Pozisyon")}</CardHeading>
                      <p className="font-medium text-brand">{translatedText(experience, "company", locale)}</p>
                    </div>
                  </div>
                  <p className="mb-4 flex items-center gap-2 text-sm text-quiet">
                    <FaCalendarAlt aria-hidden="true" />
                    {formatDate(experience.startDate, en)} – {formatDate(experience.endDate, en, en ? "Present" : "Devam ediyor")}
                  </p>
                  {responsibilities.length > 0 && (
                    <ul className="space-y-2 pl-5 text-quiet">
                      {responsibilities.map((responsibility, itemIndex) => <li className="list-disc" key={`${index}-${itemIndex}`}>{responsibility}</li>)}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="surface-card p-8 text-center text-quiet" role="status">
            {result.status === "unavailable" ? (en ? "Experience could not be loaded." : "Deneyim bilgileri şu anda yüklenemiyor.") : (en ? "No experience records yet." : "Henüz deneyim bilgisi bulunmuyor.")}
          </p>
        )}

        {size && experiences.length > size && <div className="mt-8"><SeeMore path="experiences" /></div>}
      </div>
    </section>
  );
}



