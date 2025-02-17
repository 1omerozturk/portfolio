"use client";
import React, { useEffect, useState } from "react";
import { AdminProjectService } from "../../../../service/projectService";
import Loading from "../../../../components/Loading";
import ProjectAdd from "../../add/page";
import { useParams } from "next/navigation";

const ProjectEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await AdminProjectService.getProject(id).then((res) => {
      return res.data;
    });
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <h3 className="text-center">{data.name}</h3>
          <ProjectAdd project={data} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProjectEdit;
