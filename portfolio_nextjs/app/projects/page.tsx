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
  size?: number; 
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loading color={"indigo"} />
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {displayedProjects.map((project, key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <Slider {...settings}>
                    {project.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <img
                          className="object-cover h-64 w-full transform transition-transform duration-500 group-hover:scale-110"
                          src={image}
                          alt={`${project.title} image ${imgIndex + 1}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description.length > 100
                      ? project.description.slice(0, 100) + "..."
                      : project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href={`/projects/${project._id}`}>
                      <span className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300">
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                    <div className="flex space-x-4">
                      {project.repoLink && (
                        <a
                          aria-label="github"
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transform hover:scale-110 transition-all duration-300"
                        >
                          <FaGithub className="text-2xl" />
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a
                          aria-label="live demo"
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-700 transform hover:scale-110 transition-all duration-300"
                        >
                          <FaGlobe className="text-2xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {size && projects.length > size && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View More Projects
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
