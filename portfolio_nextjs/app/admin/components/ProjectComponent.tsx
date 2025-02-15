"use client"
import Link from 'next/link';
import React from 'react'

const ProjectComponent = ({projects}) => {
/*     const projects = [
        {
          title: "Project 1",
          description: "Description 1",
        },
        {
          title: "Project 2",
          description: "Description 2",
        },
        {
          title: "Project 3",
          description: "Description 3",
        },
        {
          title: "Project 4",
          description: "Description 4",
        },
      ]; */
    
      return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-4 p-4 bg-slate-200 rounded-lg">
         
          {projects.map((project, index) => (
            <div key={index} className="animate-border">
              <h2 className="text-lg font-bold">{project.title}</h2>
              <img
                className="w-full h-32 object-cover"
                src="https://via.placeholder.com/300"
                alt={project.title}
              />
              <p className="text-sm">{project.description}</p>
              <div className="text-center">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-sky-500 hover:text-sky-700 font-bold text-sm"
                  href="/projects/[id]"
                  as={`/projects/${index}`}
                >
                  Inspect
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
}

export default ProjectComponent