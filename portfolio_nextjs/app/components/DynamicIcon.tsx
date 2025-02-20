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
    Twitter: <FaTwitter className="text-2xl md:text-4xl text-sky-500" />,
    Facebook: <FaFacebook className="text-2xl md:text-4xl text-blue-500" />,
    Instagram: <FaInstagram className="text-2xl md:text-4xl text-rose-500" />,
    YouTube: <FaYoutube className="text-2xl md:text-4xl text-red-600" />,
    GitHub: <FaGithub className="text-2xl md:text-4xl text-slate-800" />,
    LinkedIn: <FaLinkedin className="text-2xl md:text-4xl text-blue-500" />,
    HackerRank: <FaHackerrank className="text-2xl md:text-4xl text-black" />,
    Medium: <FaMedium className="text-2xl md:text-4xl text-slate-800" />,
  };
  const IconComponent = iconLib[lib];

  return IconComponent ? IconComponent : null;
};
