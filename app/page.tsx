import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";

const AboutSection = dynamic(() => import("@/components/sections/about").then(mod => mod.AboutSection));
const SkillsSection = dynamic(() => import("@/components/sections/skills-lab").then(mod => mod.SkillsSection));
const ProjectsSection = dynamic(() => import("@/components/sections/projects").then(mod => mod.ProjectsSection));
const TimelineSection = dynamic(() => import("@/components/sections/timeline").then(mod => mod.TimelineSection));
const ContactSection = dynamic(() => import("@/components/sections/contact").then(mod => mod.ContactSection));

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
