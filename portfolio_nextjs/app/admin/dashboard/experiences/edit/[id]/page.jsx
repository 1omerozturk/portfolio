"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import AddExperience from "../../add/page";
import { ExperienceService } from "../../../../service/experienceService";
import Loading from "../../../../components/Loading";


const EditExperience = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    const response = await ExperienceService.getExperience(id).then((res) => {
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
          <AddExperience experience={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EditExperience;
