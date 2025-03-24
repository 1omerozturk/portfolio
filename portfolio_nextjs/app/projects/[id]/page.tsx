"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProjectService } from "../../service/projectService";
import { Skeleton } from "@radix-ui/themes";
import ModalImage from "react-modal-image";

const ProjectDetail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      const res = await ProjectService.getProject(id);
      if (res.data) setProject(res.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      
          <Skeleton className="h-8 w-3/4 mb-4 rounded" />

          <Skeleton className="h-6 w-full mb-4 rounded" />
          <Skeleton className="h-6 w-full mb-4 rounded" />

          <Skeleton className="h-6 w-24 mb-4 rounded" />

          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
          </div>

          <div className="flex gap-4 mb-4">
            <Skeleton className="h-10 w-32 rounded" />
            <Skeleton className="h-10 w-32 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-64 w-full rounded" />
            <Skeleton className="h-64 w-full rounded" />
            <Skeleton className="h-64 w-full rounded" />
          </div>
        </div>
      ) : (
        project && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            {/* Proje Başlığı */}
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {project.title}
            </h2>

            {/* Açıklama */}
            <p className="text-gray-600 mb-6">{project.description}</p>

            {/* Proje Türü */}
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Type:</span>{" "}
              <span
                className={`${
                  project.type === "web"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                } px-2 py-1 rounded-md text-sm`}
              >
                {project.type}
              </span>
            </div>

            {/* Kullanılan Teknolojiler */}
            <div className="mb-6">
              <span className="font-semibold text-gray-700">
                Technologies:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Linkler */}
            <div className="flex gap-4 mb-6">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  aria-label={project.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                  >
                  GitHub Repo
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  aria-label={project.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
                >
                  Live Demo
                </a>
              )}
            </div>

            {/* Görseller */}
            {project.images?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-md"
                  >
                    <ModalImage
                      small={image}
                      large={image}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-64 object-cover cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ProjectDetail;
