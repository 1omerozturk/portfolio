"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProjectComponent from "../../components/ProjectComponent";
import { AdminProjectService } from "../../service/projectService";
import { FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  

  const fetchProjects = useCallback(() => {
    try {
      setLoading(true);
      AdminProjectService.getProjects()
        .then((res) => {
          setProjects(res.data);
          console.log(res);
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
  }, []);

  const onAdd = () => {
    navigate.push("/admin/dashboard/projects/add");
  };

  return (
    <div className="grid grid-flow-row">
      <div className="text-end">
        <button
          onClick={onAdd}
          className="btn btn-outline-light w-fit text-center"
        >
          <FaPlusCircle className="md:text-2xl" />
          <div>Ekle</div>
        </button>
      </div>
      <ProjectComponent projects={projects} setProjects={setProjects} />
    </div>
  );
};

export default ProjectsDashboard;
