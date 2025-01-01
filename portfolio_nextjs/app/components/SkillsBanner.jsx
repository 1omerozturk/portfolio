import React from "react";

const SkillsBanner = () => {
  const skills = [
    { name: "HTML", level: "Intermediate", percentage: 60 },
    { name: "CSS", level: "Intermediate", percentage: 60 },
    { name: "JavaScript", level: "Advanced", percentage: 80 },
    { name: "React", level: "Expert", percentage: 90 },
    { name: "Node.js", level: "Expert", percentage: 90 },
    { name: "Next.js", level: "Basic", percentage: 50 },
  ];

  const getColor = (percentage) => {
    if (percentage >= 80) return "bg-green-600";
    if (percentage >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="skills-banner">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className={`${getColor(skill.percentage)} h-4 rounded-full`}
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBanner;
