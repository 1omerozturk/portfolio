import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const pageNames = {
  blog: "yazıları",
  certificates: "sertifikaları",
  contents: "içerikleri",
  educations: "eğitim bilgilerini",
  experiences: "deneyimleri",
  projects: "projeleri",
  skills: "yetenekleri",
};

const SeeMore = ({ path }) => {
  if (!path) return null;

  const label = pageNames[path];
  if (!label) return null;

  return (
    <div className="text-center">
      <Link href={`/${path}`} className="button-secondary">
        <span>
          <span>Tüm {label} gör</span>
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
