"use client";

import React, { useState } from "react";
import {
  Code,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Zap,
  ShieldCheck,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { FadeIn, TiltCard, FloatingParticles } from "@/components/animations/motion";

interface Project {
  id: string;
  name: string;
  subtitle: string;
  status: string;
  githubUrl: string;
  demoUrl: string;
  description: string;
  whyBuilt: string;
  capabilities: string[];
  engineeringDecision: string;
  metrics: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "writhub",
    name: "WristHub",
    subtitle: "E-Commerce & Secure Firestore Routing",
    status: "Production Ready",
    githubUrl: "https://github.com/Saadi-Creative",
    demoUrl: "#",
    description:
      "A high-performance e-commerce frontend architecture optimized for fast page rendering and enterprise-grade router client validation.",
    whyBuilt:
      "Built to demonstrate how custom React routing controls can secure sensitive admin views on serverless platforms without leaking validation parameters in client-side storage keys.",
    capabilities: [
      "Secured Admin and Client views by routing privileges directly through Firebase Firestore queries, eliminating local storage token bypass vulnerabilities.",
      "Optimized rendering paths using React lazy-loading, asynchronous bundle chunk splits, and dynamic imports.",
      "Engineered a custom OptimizedImage component utilizing pre-calculated skeleton masks and lazy asset queries to prevent cumulative layout shifts (CLS).",
    ],
    engineeringDecision:
      "Securing Firebase Routes: Instead of evaluating temporary authentication tokens locally (which are susceptible to front-end injection), the router intercepts routing requests and performs asynchronous privilege checks directly against Firestore rules, securing the interface at the database layer.",
    metrics: [
      { label: "Lighthouse Score", value: "99" },
      { label: "Asset Load Time", value: "0.4s" },
      { label: "Initial JS Weight", value: "45KB" },
    ],
  },
  {
    id: "spatial-library",
    name: "100-2.5D Web Elements Library",
    subtitle: " tactile Spatial UI Components",
    status: "Open Source",
    githubUrl: "https://github.com/Saadi-Creative",
    demoUrl: "#",
    description:
      "An open-source, hardware-accelerated motion library containing 100+ modular spatial UI components for creative web apps.",
    whyBuilt:
      "Created to provide web developers with high-performance, responsive spatial effects (2.5D hover tilts, spring flips) that maintain high frame rates on lower-powered devices.",
    capabilities: [
      "Isolates visual interactions to the GPU compositor thread using exclusively transform matrices and opacity properties, bypassing layout redraw loops.",
      "Configured spring-physics matrices using Framer Motion constants, creating tactile and natural user gestures.",
      "Packaged as a zero-dependency modules block with a minimal weight footprint of only 12KB.",
    ],
    engineeringDecision:
      "GPU Compositor Isolation: To ensure 60fps animations on target platforms (like integrated mobile graphics chips), layout properties (width, height, top) are never animated. Instead, custom perspective angles are mapped strictly onto 3D CSS transforms.",
    metrics: [
      { label: "Components Built", value: "100+" },
      { label: "Render Frame Rate", value: "60fps" },
      { label: "Library Weight", value: "12KB" },
    ],
  },
  {
    id: "business-hub",
    name: "Freelancers Business Hub",
    status: "Stable Release",
    subtitle: "Standalone Desktop Operations Controller",
    githubUrl: "https://github.com/Saadi-Creative",
    demoUrl: "#",
    description:
      "A native desktop application designed to manage freelancer timesheets, client invoice generations, and local database isolation.",
    whyBuilt:
      "Built to demonstrate native desktop development using Python and PySide6, focusing on asynchronous thread delegation and local file compile operations.",
    capabilities: [
      "Implemented asynchronous client timesheet tracking, ensuring SQLite database writes run in parallel threads without blocking the main event loops.",
      "Engineered an automated invoice compiler that generates clean, metadata-stamped PDF receipts natively on the local filesystem.",
      "Built a secure local Role-Based Access Control (RBAC) layer to enforce complete client data isolation protocols.",
    ],
    engineeringDecision:
      "Asynchronous PySide6 Thread Workers: To prevent UI freezing during bulk local reports compilation or SQLite writes, operations are offloaded from the primary GUI thread onto custom QThread subclasses, preserving fluid 60fps interface updates.",
    metrics: [
      { label: "Timesheet Latency", value: "0ms" },
      { label: "DB Query Time", value: "<1ms" },
      { label: "CPU Thread Usage", value: "Optimized" },
    ],
  },
];

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

function ProjectCard({ project, index, progress, total }: { project: Project, index: number, progress: MotionValue<number>, total: number }) {
  // Peak at 85% scroll so the last card has time to be read before unpinning
  // index 0 -> 0, index 1 -> 0.42, index 2 -> 0.84
  const center = index * 0.42;
  
  // Dynamically build strictly increasing input ranges bounded between 0 and 1 to prevent WAAPI crashes
  const input = [];
  const scaleOutput = [];
  const opacityOutput = [];
  const innerXOutput = [];

  const startVal = Math.max(0, center - 0.35);
  if (startVal < center) {
    input.push(startVal);
    scaleOutput.push(0.85);
    opacityOutput.push(0.3);
    innerXOutput.push(100);
  }
  
  input.push(center);
  scaleOutput.push(1);
  opacityOutput.push(1);
  innerXOutput.push(0);

  const endVal = Math.min(1, center + 0.35);
  if (endVal > center) {
    input.push(endVal);
    scaleOutput.push(0.85);
    opacityOutput.push(0.3);
    innerXOutput.push(-100);
  }
  
  // Cover Flow effect: scale and fade based on distance from center
  const scale = useTransform(progress, input, scaleOutput, { clamp: true });
  const opacity = useTransform(progress, input, opacityOutput, { clamp: true });

  // Inner parallax effect: content slides slightly horizontally
  const innerX = useTransform(progress, input, innerXOutput, { clamp: true });

  return (
    <motion.div 
      style={{ scale, opacity }} 
      className="w-[85vw] max-w-[800px] shrink-0 h-full relative"
    >
      <TiltCard className="w-full h-full">
        <div className="w-full h-full rounded-3xl border border-border/50 bg-background/80 backdrop-blur-md p-6 sm:p-10 shadow-2xl flex flex-col overflow-hidden group">
          
          <motion.div style={{ x: innerX }} className="flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-[var(--section-color)] transition-colors duration-500">{project.name}</h3>
                <p className="text-sm text-section font-medium mt-1">{project.subtitle}</p>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/50 bg-card/40 hover:bg-[var(--section-muted)] hover:border-[var(--section-color)] hover:shadow-[0_0_15px_var(--section-muted)] px-4 text-xs font-semibold text-foreground transition-all duration-300"
              >
                <Code className="h-3.5 w-3.5" />
                GitHub Repo
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <div className="mt-6 flex-1 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Overview</h4>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Key Capabilities</h4>
                  <ul className="space-y-3">
                    {project.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <CheckCircle2 className="h-4 w-4 text-section shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="rounded-xl border border-[var(--section-muted)] bg-[var(--section-muted)]/30 p-5 relative overflow-hidden flex flex-col justify-center group-hover:bg-[var(--section-muted)]/50 transition-colors duration-500">
                  <div className="flex gap-2 items-start text-sm mb-3">
                    <ShieldCheck className="h-5 w-5 text-section shrink-0 mt-0.5" />
                    <h5 className="font-mono text-xs font-bold text-section uppercase tracking-wider mt-1">
                      Architectural Decision Log
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {project.engineeringDecision}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-6 mt-6">
              {project.metrics.map((m, idx) => (
                <div key={m.label} className="text-left border-r border-border/10 last:border-0 pr-4 group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                    {m.label}
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-section block drop-shadow-[0_0_8px_var(--section-muted)]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Translate X based on scroll progress. 
  // We move from 0% to -72% to ensure the last card fully enters the center.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section 
      id="projects" 
      ref={targetRef} 
      className="relative h-[350vh] bg-card/5 border-t border-border/30 section-projects"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <FloatingParticles />
        
        {/* Section Header Fixed inside Sticky */}
        <div className="container-tight mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-section/20 bg-section-muted text-section text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_10px_var(--section-muted)]">
            <Code className="h-3.5 w-3.5" />
            Selected Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-none text-foreground drop-shadow-md">
            Case Studies & Codebases.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground text-base leading-relaxed">
            Scroll to explore the engineering logic behind my projects. Focuses on architecture, security, and performance.
          </p>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-6 sm:px-[10vw] pb-10"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              progress={scrollYProgress} 
              total={PROJECTS.length} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
