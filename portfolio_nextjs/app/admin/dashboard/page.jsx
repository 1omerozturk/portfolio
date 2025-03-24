"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@radix-ui/themes";
import DonutChartCard from "../components/DonutChart";
import { SkillService } from "../service/skillService";
import { ProjectService } from "../../service/projectService";
import { ContentService } from "../service/contentService";
import { MessageService } from "../service/messageService";
import { CertificationService } from "../service/certificationsService";

const Dashboard = () => {
  const [skills, setSkills] = useState(null);
  const [projects, setProjects] = useState(null);
  const [contents, setContents] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const skillData = await SkillService.getSkills();
      const projectData = await ProjectService.getProjects();
      const contentData = await ContentService.getContents();
      const certificateData = await CertificationService.getCertifications();
      const messageData = await MessageService.getMessages();

      setSkills(skillData.data);
      setProjects(projectData.data);
      setContents(contentData.data);
      setCertificates(certificateData);
      setMessages(messageData.data);
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
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
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
                colors={["#FF0037FF", "#0099FFFF"]}
                hoverColors={["#B20027FF", "#00588FFF"]}
              />
            )}
            {skills && (
              <DonutChartCard
                title="Skills"
                labels={["Skills"]}
                data={[skills.length]} // Backend'den gelen veri
                colors={["#00FFFFFF"]}
                hoverColors={["#009898FF"]}
              />
            )}
            {contents && (
              <DonutChartCard
                title="Contents"
                labels={["Contents"]}
                data={[contents.length]} // Backend'den gelen veri
                colors={["#FF8000FF"]}
                hoverColors={["#A05000FF"]}
              />
            )}
            {certificates && (
              <DonutChartCard
                title="Certificates"
                labels={["Certificates"]}
                data={[certificates.length]} // Backend'den gelen veri
                colors={["#00B7FFFF"]}
                hoverColors={["#002A5BFF"]}
              />
            )}
            {messages && (
              <DonutChartCard
                title="Messages"
                labels={["Unread", "Read"]}
                data={[
                  messages.filter((msg) => msg.isRead === false).length,
                  messages.filter((msg) => msg.isRead === true).length,
                ]} // Backend'den gelen veri
                colors={["#0DFE00FF", "#F86B00FF"]}
                hoverColors={["#078900FF", "#A50101FF"]}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
