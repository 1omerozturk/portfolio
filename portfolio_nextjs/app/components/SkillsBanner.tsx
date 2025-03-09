"use client";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
const SkillProgress = React.lazy(() => import("./SkillProgress")); // Lazy yükleme
import Link from "next/link";
import { SkillService } from "../service/skillService";
import { defaultSkillsData } from "../models/skills";
import Loading from "./Loading";

interface PageProps {
  size?: number;
}

const SkillsBanner: React.FC<PageProps> = ({ size }) => {
  const [skills, setSkills] = useState(defaultSkillsData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await SkillService.getSkills();
      setSkills(res.data); // Gelen verilerle güncelle
      setIsLoading(false); // Yükleme durumunu kaldır
    } catch (error) {
      console.error(error?.message);
      setIsLoading(false); // Yükleme durumunu kaldır
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Gösterilecek verileri boyutlandır
  const displayedSkills = size ? skills.slice(0, size) : skills;

  return (
    <div id="skillsBanner" className="skills-banner drop-shadow-lg">
      <div className="px-5 mx-auto p-4">
        <FaCode className="text-4xl mx-auto mb-3 text-slate-700" />
        <div className="space-y-2 gap-4">
          <React.Suspense fallback={<Loading color={"lime"} />}>
            {isLoading ? (
              <Loading color={"lime"} /> // Veriler yüklenirken gösterilecek
            ) : (
              <SkillProgress skills={displayedSkills} /> // Veriler yüklendiğinde gösterilecek
            )}
          </React.Suspense>
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
