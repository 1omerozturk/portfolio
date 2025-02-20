"use client";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import SkillProgress from "./SkillProgress";
import Link from "next/link";
import { SkillService } from "../service/skillService";
import Loading from "../admin/components/Loading";
import { skillsData } from "../models/skills";

interface PageProps {
  size?: number;
}

const SkillsBanner: React.FC<PageProps> = ({ size }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      await SkillService.getSkills()
        .then((res) => {
          setSkills(res.data);
          console.log(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(skillsData);
    } catch (error) {
      console.error(error?.message);
    }
  };

  useEffect(() => {
    if (loading) {
      setSkills(skillsData);
    } else {
      fetchSkills();
    }
  }, [skills.length]);

  return (
    <div id="skillsBanner" className="skills-banner">
      <div className="px-5 bg-slate-300 mx-auto p-4">
        <FaCode className="text-4xl mx-auto mb-3 text-slate-700" />
        <div className="space-y-2 gap-4">
          {loading ? (
            <Loading />
          ) : (
            <SkillProgress skills={size ? skills.slice(0, size) : skills} />
          )}
          {size && (
            <div className="flex justify-center mt-3">
              <Link
                href="/skills"
                style={{ textDecoration: "none" }}
                className="bg-gradient-to-r from-white to-slate-500 p-1 border-blue-500 border-2 rounded-lg hover:bg-black hover:text-white"
              >
                View More Skills
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsBanner;
