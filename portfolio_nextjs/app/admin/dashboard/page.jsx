"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@radix-ui/themes";
import DonutChartCard from "../components/DonutChart";
import { SkillService } from "../service/skillService";
import { ProjectService } from "../../service/projectService";
import { ContentService } from "../service/contentService";

const Dashboard = () => {
  const [skills, setSkills] = useState(null);
  const [projects, setProjects] = useState(null);
  const [contents, setContents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const skillData = await SkillService.getSkills();
      const projectData = await ProjectService.getProjects();
      const contentData = await ContentService.getContents();

      setSkills(skillData.data);
      setProjects(projectData.data);
      setContents(contentData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="text-center">Dashboard</h2>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
        {isLoading ? (
          <>
            <div style={{ width: "250px", height: "250px" }}>
              <Skeleton />
            </div>
            <div style={{ width: "250px", height: "250px" }}>
              <Skeleton />
            </div>
            <div style={{ width: "250px", height: "250px" }}>
              <Skeleton />
            </div>
          </>
        ) : (
          <>
            {projects && (
              <DonutChartCard
                title="Projects"
                data={[
                  projects.filter((p) => p.type === "mobile").length,
                  projects.filter((p) => p.type === "web").length,
                ]} // Backend'den gelen veri
                labels={["Mobile", "Web"]}
                colors={["#FF2453FF", "#0099FFFF"]}
                hoverColors={["#EF9CAEFF", "#A4D3F1FF"]}
              />
            )}
            {skills && (
              <DonutChartCard
                title="Skills"
                labels={["Skills"]}
                data={[skills.length]} // Backend'den gelen veri
                colors={["#00FFFFFF"]}
                hoverColors={["#A2E2E2FF"]}
              />
            )}
            {contents && (
              <DonutChartCard
                title="Contents"
                labels={["Contents"]}
                data={[contents.length]} // Backend'den gelen veri
                colors={["#FF8000FF"]}
                hoverColors={["#D79F66FF"]}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
