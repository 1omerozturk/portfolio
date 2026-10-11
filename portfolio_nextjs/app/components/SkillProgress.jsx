import {
  FaCode,
  FaCss3Alt,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiDotnet, SiKotlin, SiNextdotjs, SiJavascript, SiTypescript, SiFirebase, SiMongodb, SiExpress } from "react-icons/si";

const icons = {
  FaCss3Alt,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  SiDotnet,
  SiKotlin,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiFirebase,
  SiMongodb,
  SiExpress,
  javascript: SiJavascript,
  FaCss3: FaCss3Alt,
};

export function DynamicIcon({ iconName }) {
  const Icon = Object.hasOwn(icons, iconName) ? icons[iconName] : FaCode;
  return <Icon aria-hidden="true" />;
}

function CircularProgress({ name, value }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));
  const offset = circumference * (1 - safeValue / 100);

  return (
    <svg
      className="skill-progress__circle"
      viewBox="0 0 112 112"
      role="img"
      aria-label={`${name}: ${safeValue}%`}
    >
      <circle className="skill-progress__track" cx="56" cy="56" r={radius} />
      <circle
        className="skill-progress__value"
        cx="56"
        cy="56"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text className="skill-progress__label" x="56" y="56" textAnchor="middle" dy=".35em">
        {safeValue}%
      </text>
    </svg>
  );
}

export default function SkillProgress({ skills = [], headingLevel = 3 }) {
  const CardHeading = headingLevel === 2 ? "h2" : "h3";
  if (!skills.length) {
    return (
      <div className="surface-card p-6 text-center text-quiet" role="status">
        Henüz gösterilecek yetenek yok.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skills.map((skill, index) => (
        <article className="skill-card" key={skill._id ?? `${skill.name}-${index}`}>
          <div className="flex items-center justify-between gap-3">
            <CardHeading className="min-w-0 break-words text-lg font-bold text-ink">{skill.name}</CardHeading>
            <span className="skill-card__icon" aria-hidden="true">
              <DynamicIcon iconName={skill.icon} />
            </span>
          </div>
          <CircularProgress name={skill.name} value={skill.percentage} />
        </article>
      ))}
    </div>
  );
}
