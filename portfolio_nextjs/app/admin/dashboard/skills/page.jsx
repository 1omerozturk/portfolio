"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getSkills } from "../../../api/api";
import Loading from "../../components/Loading";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
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
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div onClick={newSkill} className="btn btn-outline-dark float-right">
            <div className="flex items-center justify-between gap-x-2">
              <FaIcons.FaPlusCircle />
              Ekle
            </div>
          </div>
          <div>{<AdminSkillProgress skills={skills} />}</div>
        </div>
      )}
    </div>
  );
};

export default SkillsDashboard;
