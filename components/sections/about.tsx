"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  Zap,
  Eye,
  BookOpen,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, AmbientOrbs, ScrollReveal } from "@/components/animations/motion";

const PRINCIPLES = [
  {
    title: "AI as a Collaborative Tool",
    description:
      "Leveraging LLMs to accelerate boilerplate and research, while retaining absolute ownership of code quality, architecture, and security.",
    icon: Cpu,
  },
  {
    title: "Performance First",
    description:
      "Optimizing render paths, asset sizes, and database queries. Designing system behaviors that load instantly and respond in milliseconds.",
    icon: Zap,
  },
  {
    title: "Clean Architecture",
    description:
      "Separating concerns, maintaining strict typing, and building modular systems that remain extensible as requirements evolve.",
    icon: Layers,
  },
  {
    title: "Accessibility & Standards",
    description:
      "Crafting semantic, screen-reader friendly markup. Fully supporting keyboard navigation and respecting user-reduced motion.",
    icon: Eye,
  },
  {
    title: "Readable & Maintainable Code",
    description:
      "Writing self-documenting code with purposeful abstractions. Prioritizing comprehensibility over clever, overly complex logic.",
    icon: GitBranch,
  },
  {
    title: "Continuous Engineering Growth",
    description:
      "Consistently expanding full-stack engineering proficiency and database theory alongside cutting-edge AI orchestration paradigms.",
    icon: BookOpen,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-about py-24 relative overflow-hidden">
      {/* Background decoration */}
      <AmbientOrbs />

      <div className="container-tight relative z-10">
        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col justify-start">
            <FadeIn>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-section/ bg-section-muted text-section text-xs font-mono uppercase tracking-wider mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                The Mindset
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-none">
                Engineering Accelerated by Intelligence.
              </h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-6 text-muted-foreground leading-relaxed text-balance text-lg">
                I am a Computer Science student at COMSATS University Islamabad
                focused on modern full-stack web and desktop architectures. 
                My development style relies on using AI as a cognitive accelerator,
                enabling me to prototype rapidly and design complex features 
                in fraction of the time.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed text-balance">
                AI helps me automate the repetitive, but the core engineering decisions
                — architecture design, security boundaries, performance bottlenecks, 
                and pixel-perfect interactions — are strictly my responsibility.
              </p>
            </FadeIn>
          </div>

          {/* Biography sidebar details */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm relative overflow-hidden group hover:border-border transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 relative z-10">
                <span className="h-1.5 w-1.5 rounded-full bg-section" />
                Academic Timeline
              </h3>
              
              <div className="space-y-6 relative z-10 border-l border-border/80 ml-2 pl-6">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border border-section/ bg-background flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-section" />
                  </div>
                  <span className="text-xs font-mono text-section uppercase tracking-wider">
                    Expected Sept 2027
                  </span>
                  <h4 className="font-medium text-foreground mt-1">
                    B.S. in Computer Science
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    COMSATS University Islamabad. Core focus on Data Structures, Object-Oriented Design, Advanced Databases, and Machine Learning.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border border-border/50 bg-background flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-section" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Active Learning &amp; Certifications
                  </span>
                  <h4 className="font-medium text-foreground mt-1">
                    AI &amp; Prompt Engineering
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    DeepLearning.AI: AI for Everyone • University of Colorado: Vibe Coding Fundamentals • Vanderbilt University: Prompt Engineering for ChatGPT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering principles list */}
        <div className="mt-24">
          <ScrollReveal>
            <h3 className="text-2xl font-semibold tracking-tight text-center mb-12">
              Engineering Principles
            </h3>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle) => (
              <StaggerItem key={principle.title}>
                <div className="h-full rounded-xl border border-border/50 bg-card/25 p-6 hover:border-section/20 hover:bg-card/50 transition-all duration-350 flex flex-col items-start group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card group-hover:border-section/30 group-hover:bg-section-muted transition-colors mb-4">
                    <principle.icon className="h-5 w-5 text-muted-foreground group-hover:text-section transition-colors" />
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-gradient-brand transition-colors">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
