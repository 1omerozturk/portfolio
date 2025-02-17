"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub, FaGlobe, FaProjectDiagram } from "react-icons/fa";
import { ProjectService } from "../service/projectService";
import Loading from "../admin/components/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProjectsProps {
  size?: number; // İhtiyaca göre uygun türü belirleyin
}

const Projects: React.FC<ProjectsProps> = ({ size }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      await ProjectService.getProjects()
        .then((res) => {
          setProjects(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error?.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /*   const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "This is a description of project 1",
      image: "https://picsum.photos/200/300",
      link: "https://www.example.com",
    },
    {
      id: 2,
      title: "Project 2",
      description: "This is a description of project 2",
      image: "https://picsum.photos/200/301",
      link: "https://www.example.com",
    },
    {
      id: 3,
      title: "Project 3",
      description: "This is a description of project 3",
      image: "https://picsum.photos/200/302",
      link: "https://www.example.com",
    },
    {
      id: 4,
      title: "Project 4",
      description: "This is a description of project 4",
      image: "https://picsum.photos/200/303",
      link: "https://www.example.com",
    },
    {
      id: 5,
      title: "Project 5",
      description: "This is a description of project 5",
      image: "https://picsum.photos/200/304",
      link: "https://www.example.com",
    },
  ]; */

  return (
    <div>
      <FaProjectDiagram className="text-4xl mx-auto mt-4 text-amber-500" />
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 w-full items-center justify-between lg:grid-cols-3 xl:grid-cols-4  gap-5 space-x-2 px-3">
        {loading ? (
          <Loading />
        ) : (
          <>
            {size &&
              projects.slice(0, size).map((project,key:any) => (
                <div
                  key={key}
                  className="smooth-border text-center cursor-pointer p-2"
                >
                  <h2>{project.title}</h2>
                  <div className="my-4">
                    <Slider {...settings}>
                      {project.images.map((image: any, imgIndex: any) => (
                        <img
                          key={imgIndex}
                          className="object-cover h-[400px] mb-2 p-2 rounded-xl"
                          src={image}
                          alt={`${project.title} image ${imgIndex + 1}`}
                        />
                      ))}
                    </Slider>
                  </div>
                  <p>
                    {project.description.length > 100
                      ? project.description.slice(0, 100) + "..."
                      : project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/projects/${project._id}`}
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

            {!size &&
              projects.map((project) => (
                <div key={project.id} className="card cursor-pointer">
                  <div className="my-4">
                    <Slider {...settings}>
                      {project.images.map((image: any, imgIndex: any) => (
                        <img
                          key={imgIndex}
                          className="w-full h-[300px]  object-cover rounded mb-2"
                          src={image}
                          alt={`${project.title} image ${imgIndex + 1}`}
                        />
                      ))}
                    </Slider>
                  </div>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              ))}
          </>
        )}
      </div>
      {size && (
        <div className="text-center my-5">
          <Link
            href="/projects"
            style={{ textDecoration: "none" }}
            className="bg-gradient-to-r from-indigo-400 to-white p-1 text-indigo-800 border-indigo-800 border-2 rounded-lg hover:text-white"
          >
            View All Projects
          </Link>
        </div>
      )}
    </div>
  );
};

export default Projects;
