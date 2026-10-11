import { getLocale } from "../i18n/server";
import { fetchPublicList } from "../api/publicData";
import { normalizeSocial } from "../api/profilePayload";
import { DynamicIcon } from "./DynamicIcon";

export default async function SocialBanner() {
  const en = (await getLocale()) === "en";
  const result = await fetchPublicList("/user/social-links", ["socialLinks", "items"]);
  const records = result.status === "ok" ? result.items : [];
  const socialLinks = records.map(normalizeSocial).filter(social => social !== null);

  return (
    <ul className="social-links" aria-label={en ? "Social profiles" : "Sosyal medya profilleri"}>
      {socialLinks.map((social, index) => (
        <li key={social._id ?? `${social.name}-${index}`}>
          <a title={social.name} aria-label={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
            <DynamicIcon iconName={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
