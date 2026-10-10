import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaHackerrank,
  FaMedium,
} from "react-icons/fa";


export const DynamicIcon = ({ iconName }) => {
  if (!iconName) return null;

  const lib = iconName.trim();
  const iconLib = {
    Twitter: <FaTwitter aria-hidden="true" className="social-icon social-icon--twitter" />,
    Facebook: <FaFacebook aria-hidden="true" className="social-icon social-icon--facebook" />,
    Instagram: <FaInstagram aria-hidden="true" className="social-icon social-icon--instagram" />,
    YouTube: <FaYoutube aria-hidden="true" className="social-icon social-icon--youtube" />,
    GitHub: <FaGithub aria-hidden="true" className="social-icon social-icon--github" />,
    LinkedIn: <FaLinkedin aria-hidden="true" className="social-icon social-icon--linkedin" />,
    LınkedIn: <FaLinkedin aria-hidden="true" className="social-icon social-icon--linkedin" />,
    HackerRank: <FaHackerrank aria-hidden="true" className="social-icon social-icon--hackerrank" />,
    Medium: <FaMedium aria-hidden="true" className="social-icon social-icon--medium" />,
  };
  const IconComponent = iconLib[lib];

  return IconComponent ? IconComponent : null;
};
