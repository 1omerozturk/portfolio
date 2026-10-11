import { FiAward, FiBookOpen, FiBriefcase, FiCode, FiEdit3, FiFolder, FiGlobe, FiHeart, FiLink, FiMail, FiUser } from "react-icons/fi";
import PublicImage from "../../components/PublicImage";
import { isSafeImageSource } from "../../api/urlSafety";
import { DynamicIcon as SkillIcon } from "../../components/SkillProgress";
import { FiGrid, FiShare2 } from "react-icons/fi";

const icons = { overview: FiGrid, social: FiShare2, certificates: FiAward, educations: FiBookOpen, experiences: FiBriefcase, skills: FiCode, blogs: FiEdit3, projects: FiFolder, languages: FiGlobe, hobbies: FiHeart, contents: FiLink, contacts: FiMail, about: FiUser };
export default function AdminContentIcon({ kind, image, iconName }: { kind: keyof typeof icons; image?: unknown; iconName?: unknown }) {
  const Icon = icons[kind];
  return <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-brand" aria-hidden="true">
    {isSafeImageSource(image) ? <PublicImage src={image} alt="" width={44} height={44} sizes="44px" className="h-full w-full object-contain p-1" /> : kind === "skills" && typeof iconName === "string" && iconName.trim() ? <SkillIcon iconName={iconName} /> : <Icon size={20} strokeWidth={1.75} />}
  </span>;
}
