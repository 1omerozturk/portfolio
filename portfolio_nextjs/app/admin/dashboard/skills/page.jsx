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
        <div className="" >
             <div className="text-end">
                    <button
                      onClick={newSkill}
                      className="btn btn-outline-light w-fit text-center"
                    >
                      <FaIcons.FaPlusCircle className="md:text-2xl" />
                      <div>Add</div>
                    </button>
                  </div>
         <AdminSkillProgress skills={skills} setSkills={setSkills} />
        </div>
      )}
    </div>
  );
};

export default SkillsDashboard;
