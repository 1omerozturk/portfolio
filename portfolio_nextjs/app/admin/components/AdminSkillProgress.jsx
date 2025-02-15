"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const AdminSkillProgress = ({ skills }) => {
  const navigate = useRouter();

  const [progress, setProgress] = useState(
    skills.map((skill) => ({ name: skill.name, value: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress.map((p, index) => {
          const targetPercentage = skills[index].percentage;
          if (p.value < targetPercentage) {
            return { ...p, value: Math.min(p.value + 1, targetPercentage) };
          }
          return p; // Eğer hedef değere ulaşılmışsa olduğu gibi bırak
        })
      );
    }, 50); // Hızını ayarlamak için burayı değiştirebilirsiniz
    return () => clearInterval(interval); // Cleanup
  }, [skills]);

  const getColor = (percentage) => {
    if (percentage >= 85) return "bg-green-700";
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 55) return "bg-orange-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const onEdit = (id) => {
    navigate.push(`skills/edit/${id}`);
  };

  const DynamicIcon = ({ iconName }) => {
    if (!iconName) return null;

    const [lib, icon] = iconName.match(/[A-Z][a-z]+|[0-9]+/g);
    const iconLib = lib === "Fa" ? FaIcons : SiIcons;
    const IconComponent = iconLib[iconName];

    return IconComponent ? <IconComponent size={24} /> : null;
  };


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-2 gap-4">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-indigo-400 to-white p-4 rounded-lg shadow-md"
        >
          <div className="float-right">
            <button
              onClick={() => onEdit(skill._id)}
              className="btn btn-outline-warning"
            >
              <FaIcons.FaEdit />
            </button>
          </div>
          <div className="text-2xl flex items-center justify-center gap-x-3 font-semibold my-3">
            {skill.name}
            <div style={{ color: skill.color, fontSize:"2rem"}}>
              <DynamicIcon iconName={skill.icon} />
            </div>
          </div>
          <div className="w-full bg-gray-400 rounded-full h-4 mb-2">
            <div
              className={`${getColor(
                progress[index].value
              )} h-4 rounded-full transition-all duration-200`}
              style={{ width: `${progress[index].value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSkillProgress;
