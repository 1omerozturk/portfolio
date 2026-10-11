import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { getLocale } from "../i18n/server";
import { getDictionary } from "../i18n/dictionaries";
import { localizedPath } from "../i18n/config";

const pageNames = {
  blog: "yazıları",
  certificates: "sertifikaları",
  contents: "içerikleri",
  educations: "eğitim bilgilerini",
  experiences: "deneyimleri",
  projects: "projeleri",
  skills: "yetenekleri",
};

const SeeMore = async ({ path }) => {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  if (!path) return null;

  const label = pageNames[path];
  if (!label) return null;

  return (
    <div className="text-center">
      <Link href={localizedPath(`/${path}`, locale)} className="button-secondary">
        <span>
          <span>{locale === "en" ? `View all ${dictionary.nav[path].toLowerCase()}` : `Tüm ${label} gör`}</span>
          <MdArrowForward
            size={18}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          />
        </span>
      </Link>
    </div>
  );
};

export default SeeMore;
