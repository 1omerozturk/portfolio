import { FiAward, FiBookOpen, FiBriefcase, FiCode, FiEdit3, FiFolder, FiGlobe, FiHeart, FiLink, FiMail, FiUser } from "react-icons/fi";
import PublicImage from "./PublicImage";
import { isSafeImageSource } from "../api/urlSafety";
import { DynamicIcon as SkillIcon } from "./SkillProgress";
import { FiGrid, FiShare2 } from "react-icons/fi";
import { FiMusic, FiCamera, FiActivity, FiMap, FiMonitor } from "react-icons/fi";

const icons = { overview: FiGrid, social: FiShare2, certificates: FiAward, educations: FiBookOpen, experiences: FiBriefcase, skills: FiCode, blogs: FiEdit3, projects: FiFolder, languages: FiGlobe, hobbies: FiHeart, contents: FiLink, contacts: FiMail, about: FiUser };
const hobbyIcons: Record<string, typeof FiHeart> = { FiHeart, FiBookOpen, FiMusic, FiCamera, FiActivity, FiMap, FiMonitor, FaHeart: FiHeart, FaBook: FiBookOpen, FaMusic: FiMusic, FaCamera: FiCamera, FaRunning: FiActivity, FaGamepad: FiMonitor };
export default function ContentMark({ kind, image, iconName }: { kind: keyof typeof icons; image?: unknown; iconName?: unknown }) {
  const Icon = kind === "hobbies" && typeof iconName === "string" && Object.hasOwn(hobbyIcons, iconName.trim()) ? hobbyIcons[iconName.trim()] : icons[kind];
  return <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-brand" aria-hidden="true">
    {isSafeImageSource(image) ? <PublicImage src={image} alt="" width={44} height={44} sizes="44px" className="h-full w-full object-contain p-1" /> : kind === "skills" && typeof iconName === "string" && iconName.trim() ? <SkillIcon iconName={iconName} /> : <Icon size={20} strokeWidth={1.75} />}
  </span>;
}
