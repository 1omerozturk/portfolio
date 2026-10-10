import { fetchPublicList } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import { DynamicIcon } from "./DynamicIcon";

export default async function SocialBanner() {
  const result = await fetchPublicList("/user/social-links", ["socialLinks", "items"]);
  const records = result.status === "ok" ? result.items : [];
  const socialLinks = records.filter((social) => social && isSafeHttpUrl(social.url));

  return (
    <ul className="social-links" aria-label="Sosyal medya profilleri">
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
