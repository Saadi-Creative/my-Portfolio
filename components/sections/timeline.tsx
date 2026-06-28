"use client";

import React from "react";
import { CalendarDays, Award, GraduationCap, Code2, Sparkles, BookOpen } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, AmbientOrbs, ScrollReveal } from "@/components/animations/motion";

interface TimelineEvent {
  date: string;
  title: string;
  category: "education" | "project" | "certification";
  description: string;
  tech?: string[];
}

const EVENTS: TimelineEvent[] = [
  {
    date: "Sept 2027 (Expected)",
    title: "B.S. Computer Science Graduation",
    category: "education",
    description: "Completing coursework at COMSATS University Islamabad. Core topics: OOP, Data Structures, Database Systems, Machine Learning.",
  },
  {
    date: "Jan 2026",
    title: "100-2.5D Web Elements Library Release",
    category: "project",
    description: "Released open-source library containing hardware-accelerated components and spatial tactile triggers.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
  },
  {
    date: "Aug 2025",
    title: "Vibe Coding Fundamentals Certification",
    category: "certification",
    description: "Completed certification at University of Colorado, learning structured methods for rapid prototyping and AI-assisted scoping.",
  },
  {
    date: "May 2025",
    title: "WristHub E-Commerce Frontend Platform",
    category: "project",
    description: "Built performant storefront, resolving Firebase router token fallback leaks and lazy-loading components.",
    tech: ["React", "Vite", "Firebase"],
  },
  {
    date: "Dec 2024",
    title: "Prompt Engineering for ChatGPT",
    category: "certification",
    description: "Finished certification from Vanderbilt University. Studied prompt patterns, context templates, and few-shot inference.",
  },
  {
    date: "Jul 2024",
    title: "Freelancers Business Hub Launch",
    category: "project",
    description: "Completed desktop utility utilizing PySide6 for async client tracking and SQLite local database operations.",
    tech: ["Python", "PySide6", "SQLite"],
  },
  {
    date: "Jan 2024",
    title: "AI For Everyone Certification",
    category: "certification",
    description: "DeepLearning.AI certification covering foundational machine learning models, parameters, and AI lifecycle concepts.",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="section-timeline py-24 relative overflow-hidden border-t border-border/30">
      <AmbientOrbs />

      <div className="container-tight">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-section/20 bg-section-muted text-section text-xs font-mono uppercase tracking-wider mb-6">
              <CalendarDays className="h-3.5 w-3.5" />
              The Timeline
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-none text-foreground">
              Milestones & History.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-base leading-relaxed">
              Tracing progress across academic projects, open-source libraries, and AI engineering certifications.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Path */}
        <div className="relative border-l border-border/60 ml-4 md:ml-8 pl-8 space-y-12">
          {EVENTS.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Event category indicator dot */}
              <div className="absolute -left-[45px] top-1.5 h-7 w-7 rounded-full border border-border bg-background flex items-center justify-center transition-colors group-hover:border-section/ group-hover:bg-section-muted">
                {event.category === "education" && (
                  <GraduationCap className="h-3.5 w-3.5 text-muted-foreground group-hover:text-section transition-colors" />
                )}
                {event.category === "project" && (
                  <Code2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-section transition-colors" />
                )}
                {event.category === "certification" && (
                  <Award className="h-3.5 w-3.5 text-muted-foreground group-hover:text-section transition-colors" />
                )}
              </div>

              {/* Event card details */}
              <FadeIn delay={idx * 0.05}>
                <div className="rounded-xl border border-border/50 bg-card/20 p-6 hover:border-border hover:bg-card/40 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-section uppercase tracking-wider font-semibold">
                      {event.date}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-border/80 text-muted-foreground/80 bg-background/50">
                      {event.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-gradient-brand transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {event.description}
                  </p>

                  {event.tech && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {event.tech.map((t) => (
                        <span key={t} className="text-[9px] font-mono border border-border bg-background/30 px-2 py-0.5 rounded text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
