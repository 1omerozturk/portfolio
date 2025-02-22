"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import SkillProgress from "./SkillProgress";
import Link from "next/link";
import { SkillService } from "../service/skillService";
import { defaultSkillsData } from "../models/skills";
import Loading from "./Loading";

interface PageProps {
  size?: number;
}

const SkillsBanner: React.FC<PageProps> = ({ size }) => {
  const [skills, setSkills] = useState(defaultSkillsData);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await SkillService.getSkills();
      setSkills(res.data);
    } catch (error) {
      console.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div id="skillsBanner" className="skills-banner">
      <div className="px-5 bg-slate-300 mx-auto p-4">
        <FaCode className="text-4xl mx-auto mb-3 text-slate-700" />
        <div className="space-y-2 gap-4">
          {loading ? (
            <Loading color={"pink"} />
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
