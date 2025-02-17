"use client";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import * as FaIcons from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SkillService } from "../../service/skillService";
import AdminSkillProgress from "../../components/AdminSkillProgress"

const SkillsDashboard = () => {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const newSkill = () => {
    router.push("/admin/dashboard/skills/add");
  };

  const fetchSkills = useCallback(() => {
    try {
      setLoading(true);
      SkillService.getSkills()
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
    fetchSkills();
  }, [skills.length]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-flow-row" >
            <div onClick={newSkill} className="flex items-center justify-end gap-x-2">
              <button className="btn btn-outline-light flex items-center justify-center">
              <FaIcons.FaPlusCircle />
              Ekle
              </button>
            </div>
         <AdminSkillProgress skills={skills} setSkills={setSkills} />
        </div>
      )}
    </div>
  );
};

export default SkillsDashboard;
