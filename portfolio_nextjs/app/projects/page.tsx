"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub, FaGlobe, FaProjectDiagram } from "react-icons/fa";
import { ProjectService } from "../service/projectService";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Loading from "../components/Loading";
import { defaultProjects } from "../models/projects";

interface ProjectsProps {
  size?: number; // İhtiyaca göre uygun türü belirleyin
}

const Projects: React.FC<ProjectsProps> = ({ size }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true); // setLoading(false) yerine true olmalı
    try {
      setProjects(defaultProjects);
      const res = await ProjectService.getProjects();
      setProjects(res.data);
    } catch (error) {
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const displayedProjects = size ? projects.slice(0, size) : projects;

  return (
    <div className="p-8 shadow-lg">
      <div className="flex items-center justify-center text-4xl text-white mb-8 mt-2">
        <FaProjectDiagram className="text-black" />
      </div>
      {loading ? (
        <Loading color={"orange"} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-3">
            {displayedProjects.map((project, key) => (
              <motion.div
                key={key}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.2 }}
              >
                <div className="relative">
                  <Slider {...settings}>
                    {project.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        className="object-cover h-60 w-full"
                        src={image}
                        alt={`${project.title} image ${imgIndex + 1}`}
                      />
                    ))}
                  </Slider>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {project.description.length > 100
                      ? project.description.slice(0, 100) + "..."
                      : project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href={`/projects/${project._id}`}>
                      <p className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">
                        İncele
                      </p>
                    </Link>
                    <div className="flex space-x-4">
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          <FaGithub className="text-2xl" />
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-700"
                        >
                          <FaGlobe className="text-2xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {size && projects.length > size && (
            <div className="text-center my-5">
              <Link href="/projects">
                <p className="bg-white text-indigo-800 font-bold py-2 px-6 rounded-full shadow-md hover:bg-indigo-800 hover:text-white transition duration-300">
                  Tüm Projeleri Gör
                </p>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
