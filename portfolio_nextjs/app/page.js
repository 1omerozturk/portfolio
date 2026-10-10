import { Suspense } from "react";
import Loading from "./components/Loading";
import AboutSection from "./components/AboutSection";
import YoutubeSection from "./components/YouTubeSection";
import EducationsBanner from "./components/EducationsBanner";
import ExperiencesBanner from "./components/ExperiencesBanner";
import SkillsBanner from "./components/SkillsBanner";
import ProjectsSection from "./components/ProjectsSection";
import CertificatesSection from "./components/CertificatesSection";
import BlogsSection from "./components/BlogsSection";
import { createPageMetadata } from "./seo";
import "./styles/youtube-section.css";

export const metadata = createPageMetadata(
  "Ana Sayfa",
  "Ömer Öztürk'ün yazılım projeleri, yetkinlikleri, deneyimleri ve teknik yazıları.",
  "/",
);

export default function Home() {
  return (
    <main className="surface-page min-h-dvh">
      <AboutSection />
      <YoutubeSection />
      <Suspense fallback={<Loading />}><EducationsBanner size={4} /></Suspense>
      <Suspense fallback={<Loading />}><ExperiencesBanner size={2} /></Suspense>
      <Suspense fallback={<Loading />}><SkillsBanner size={4} /></Suspense>
      <Suspense fallback={<Loading />}><ProjectsSection size={4} /></Suspense>
      <Suspense fallback={<Loading />}><CertificatesSection size={3} /></Suspense>
      <Suspense fallback={<Loading />}><BlogsSection /></Suspense>
    </main>
  );
}
