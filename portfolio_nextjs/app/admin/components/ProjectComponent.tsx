import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaEdit,
  FaGithub,
  FaGlobe,
  FaMinusCircle,
} from "react-icons/fa"; 
import { ProjectService } from "../service/projectService";
import { useRouter } from "next/navigation";

const ProjectComponent = ({ projects, setProjects }) => {
  const navigate = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const onDelete = (id: any) => {
    ProjectService.deleteProject(id).then((res) => {
      if (res.status === 200) {
        const updatedProjects = projects.filter(
          (project) => project._id !== id
        );
        setProjects(updatedProjects);
      }
    });
  };

  const onEdit = (id: any) => {
    navigate.push(`projects/edit/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:p-6 p-1 rounded-lg shadow-sm">
      {projects.map((project:any, index:any) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex float-right space-x-1 text-xl">
            <button
              title="Düzenle"
              onClick={() => onEdit(project._id)}
              className="btn btn-outline-warning"
            >
              <FaEdit className="text-2xl" />
            </button>
            <button
              title="Sil"
              onClick={() => onDelete(project._id)}
              className="btn btn-outline-danger"
            >
              <FaMinusCircle className="text-2xl" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {project.title}
          </h2>
          {project.type ? (
            <p className="text-slate-400 font-serif text-center">
              ({project.type})
            </p>
          ) : (
            ""
          )}
          <div className="my-4">
            <Slider {...settings}>
              {project.images.map((image: any, imgIndex: any) => (
                <img
                  key={imgIndex}
                  className="h-[450px] w-full object-cover rounded mb-2"
                  src={image}
                  alt={`${project.title} image ${imgIndex + 1}`}
                />
              ))}
            </Slider>
          </div>
          <div className="text-gray-700 mb-4 ">
            {project?.description?.length > 100
              ? project?.description?.slice(0,100)+'...'
              : project?.description}
          </div>
          <div className="flex justify-between items-center">
            <Link
              href={`admin/dashboard/projects/${project._id}`}
              className="text-indigo-600 hover:text-indigo-800 font-bold text-sm"
              style={{ textDecoration: "none" }}
            >
              İncele
            </Link>
            <div className="flex items-center justify-between space-x-4">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-gray-900 text-sm"
                >
                  <FaGithub className="text-lg" />
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sky-500 hover:text-sky-700 text-sm"
                >
                  <FaGlobe className="text-lg" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectComponent;
