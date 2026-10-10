import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";

function formatDate(value, fallback = "—") {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? ""
    : date.toLocaleDateString("tr-TR", { month: "short", year: "numeric", timeZone: "Europe/Istanbul" });
}

export default async function ExperiencesBanner({ size }) {
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList("/user/experiences", ["experiences", "items"]);
  const experiences = result.status === "ok"
    ? result.items.filter((experience) => experience && typeof experience === "object" && typeof experience.company === "string" && experience.company.trim())
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
        <PageHeader title="Deneyim" level={size ? 2 : 1} icon={<FaBuilding />} />

        {displayedExperiences.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {displayedExperiences.map((experience, index) => {
              const responsibilities = Array.isArray(experience.responsibilities)
                ? experience.responsibilities.filter((responsibility) => typeof responsibility === "string")
                : [];
              return (
                <article className="surface-card p-6" key={experience._id ?? experience.id ?? `${experience.company}-${index}`}>
                  <div className="mb-4 flex items-start gap-3">
                    <span className="section-icon"><FaBuilding aria-hidden="true" /></span>
                    <div className="min-w-0 break-words">
                      <CardHeading className="text-xl font-bold text-ink">{typeof experience.position === "string" && experience.position.trim() ? experience.position : "Pozisyon"}</CardHeading>
                      <p className="font-medium text-brand">{experience.company}</p>
                    </div>
                  </div>
                  <p className="mb-4 flex items-center gap-2 text-sm text-quiet">
                    <FaCalendarAlt aria-hidden="true" />
                    {formatDate(experience.startDate)} – {formatDate(experience.endDate, "Devam ediyor")}
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
            {result.status === "unavailable" ? "Deneyim bilgileri şu anda yüklenemiyor." : "Henüz deneyim bilgisi bulunmuyor."}
          </p>
        )}

        {size && experiences.length > size && <div className="mt-8"><SeeMore path="experiences" /></div>}
      </div>
    </section>
  );
}
