"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { SkillService } from "../service/skillService";
import Message from "@/app/components/Message";

const AdminSkillProgress = ({ skills, setSkills }) => {
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

  const onDelete = async (id) => {
    await SkillService.deleteSkill(id).then((res) => {
      if (res.status === 200) {
        const updatedSkills = skills.filter((skill) => skill._id !== id);
        setSkills(updatedSkills);
      } else {
        Message.ToastMessage("error", "Bir hata oluştu.");
      }
    });
  };

  const DynamicIcon = ({ iconName }) => {
    if (!iconName) return null;

    const [lib, icon] = iconName.match(/[A-Z][a-z]+|[0-9]+/g);
    const iconLib = lib === "Fa" ? FaIcons : SiIcons;
    const IconComponent = iconLib[iconName];

    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <>
      <h2 className="text-center">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-2 space-y-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-indigo-400 to-white p-4 rounded-lg shadow-md space-y-6"
          >
            <div className=" float-right flex items-center justify-between space-x-2">
              <div className="text-sm">
                <button
                  title="Düzenle"
                  onClick={() => onEdit(skill._id)}
                  className="btn btn-outline-warning"
                >
                  <FaIcons.FaEdit />
                </button>
              </div>
              <div className="">
                <button
                  title="Sil"
                  onClick={() => onDelete(skill._id)}
                  className="btn btn-outline-danger"
                >
                  <FaIcons.FaMinusCircle />
                </button>
              </div>
            </div>
            <div className="md:text-2xl text-sm sm:text-xl flex text-center mt-5 gap-x-3 font-semibold">
              {skill.name}
              <div
                className="bg-gradient-to-b from-white to-slate-500 flex items-center justify-center text-3xl rounded-full h-10 w-10"
                style={{ color: skill.color }}
              >
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
    </>
  );
};

export default AdminSkillProgress;
