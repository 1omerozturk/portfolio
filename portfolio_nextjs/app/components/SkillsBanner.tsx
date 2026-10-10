import { FaCode } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import PageHeader from "./PageHeader";
import SkillProgress from "./SkillProgress";
import SeeMore from "./SeeMore";
import { normalizeSkill } from "../api/profilePayload";

type Skill = {
  _id?: string;
  name: string;
  percentage?: number;
  icon?: string;
  color?: string;
};

interface PageProps {
  size?: number;
}

export default async function SkillsBanner({ size }: PageProps) {
  const result = await fetchPublicList<Skill>("/user/skills", ["skills", "items"]);
  const skills = result.status === "ok"
    ? result.items.map(normalizeSkill).filter(skill => skill !== null)
    : [];
  const displayedSkills = size ? skills.slice(0, size) : skills;

  return (
    <section id="skillsBanner" className="surface-page skills-banner px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <PageHeader title="Yetenekler" level={size ? 2 : 1} icon={<FaCode />} />
        {displayedSkills.length ? (
          <SkillProgress skills={displayedSkills} headingLevel={size ? 3 : 2} />
        ) : (
          <div className="surface-card p-6 text-center text-quiet" role="status">
            {result.status === "unavailable" ? "Yetenekler şu anda yüklenemiyor." : "Henüz gösterilecek yetenek yok."}
          </div>
        )}
        {size && skills.length > size && <div className="mt-8"><SeeMore path="skills" /></div>}
      </div>
    </section>
  );
}
