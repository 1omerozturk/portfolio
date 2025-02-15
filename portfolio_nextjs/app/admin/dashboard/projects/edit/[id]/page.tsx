"use client";
import React, { useEffect, useState } from "react";
import { ProjectService } from "../../../../service/projectService";
import Loading from "../../../../components/Loading";
import ProjectAdd from "../../add/page";
import { useParams } from "next/navigation";

const ProjectEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await ProjectService.getProject(id).then((res) => {
      return res.data;
    });
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h3 className="text-center">{data.name}</h3>
          <ProjectAdd project={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProjectEdit;
