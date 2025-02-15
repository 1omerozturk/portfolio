"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProjectComponent from "../../components/ProjectComponent";
import { ProjectService } from "../../service/projectService";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useRouter()

  const fetchProjects = useCallback(() => {
    try {
      setLoading(true);
      ProjectService.getProjects()
        .then((res) => {
          setSkills(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error?.message);
    }
  });

  useEffect(() => {
    fetchProjects();
  }, [projects.length]);

  const onAdd=()=>{
    navigate.push("/admin/dashboard/projects/add");
  }


  return (
    <div>
      <button onClick={onAdd} className="btn btn-outline-light flex items-center justify-center float-right">
        Ekle
          <FaPlusCircle />
      </button>
      <ProjectComponent projects={projects} />
    </div>
  );
};

export default ProjectsDashboard;
