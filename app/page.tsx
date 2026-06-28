import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills-lab";
import { ProjectsSection } from "@/components/sections/projects";
import { TimelineSection } from "@/components/sections/timeline";
import { ContactSection } from "@/components/sections/contact";

// Force Next.js to prerender this page perfectly static and aggressively cache it on the Edge CDN.
export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24 hours

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
