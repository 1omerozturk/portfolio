"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SkillService } from "../../../../service/skillService";
import Loading from "../../../../components/Loading";
import Add from "../../add/page";

const Edit = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  /*   const getData = useCallback( async() => {
    await SkillService.getSkill(id).then((res) => {
      setData(res.data)
    });
  }); */
  const getData = async () => {
    const response = await SkillService.getSkill(id).then((res) => {
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
          <p>{data.name}</p>
          <Add skill={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Edit;
