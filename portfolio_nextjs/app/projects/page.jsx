import React from "react";

const Projects = () => {
  const projects = [
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
      title: "Project 3",
      description: "This is a description of project 3",
      image: "https://picsum.photos/200/303",
      link: "https://www.example.com",
    },
    {
      id: 5,
      title: "Project 3",
      description: "This is a description of project 3",
      image: "https://picsum.photos/200/304",
      link: "https://www.example.com",
    },
  ];
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-between lg:grid-cols-3 xl:grid-cols-4  gap-5 space-x-2 px-3">
        {projects.map((project) => (
          <div key={project.id} className="card cursor-pointer">
            <img
              className="h-[300px] w-full"
              src={project.image}
              alt={project.title}
            />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
