"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Code2,
  Sparkles,
  Zap,
  RotateCcw,
  MousePointerClick,
  CheckCircle,
  HelpCircle,
  Activity,
  Server,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { FadeIn, ScrollReveal } from "@/components/animations/motion";

/* ========================================
   AI WORKFLOW DATA
   ======================================== */

const PIPELINE_STEPS = [
  {
    id: "idea",
    label: "Technical Scoping",
    icon: HelpCircle,
    description: "Defining constraints, architecture patterns, and success criteria before writing any code.",
    details: ["UX Flowcharts", "Database Schema", "API Route Planning"],
  },
  {
    id: "prompt",
    label: "Prompt Engineering",
    icon: Sparkles,
    description: "Context injection and constraint setup to guide the AI model towards the desired architecture.",
    details: ["Few-shot Examples", "System Prompts", "Style Enforcement"],
  },
  {
    id: "reasoning",
    label: "AI Reasoning",
    icon: Cpu,
    description: "AI-assisted brainstorming to detect edge cases and analyze architectural trade-offs.",
    details: ["Edge-case Detection", "Security Protocols", "Performance Profiling"],
  },
  {
    id: "code",
    label: "Code Generation",
    icon: Code2,
    description: "Generating typed, modular code using modern frameworks and best practices.",
    details: ["TypeScript Structuring", "Tailwind styling scaffold", "Custom hooks blueprint"],
  },
  {
    id: "review",
    label: "Human Verification",
    icon: CheckCircle,
    description: "Manual code review, accessibility audits, and performance tuning.",
    details: ["Lighthouse Audits", "Accessibility Checks", "Bundle Size Optimization"],
  },
];

/* ========================================
   PERFORMANCE DASHBOARD
   ======================================== */

function CircularProgress({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <ScrollReveal delay={delay} className="flex flex-col items-center gap-2">
      <div className="relative h-16 w-16">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            className="stroke-section-muted"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeDasharray="283"
            strokeLinecap="round"
            className="stroke-section drop-shadow-[0_0_8px_var(--section-color)]"
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 283 - (283 * value) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">{value}</span>
        </div>
      </div>
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider text-center">{label}</span>
    </ScrollReveal>
  );
}

function PerformanceDashboard() {
  return (
    <div className="bg-card/20 border border-border/40 rounded-2xl p-6 lg:p-8 backdrop-blur-xl">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-section" />
          <h3 className="text-lg font-bold text-foreground tracking-tight">Verified Lighthouse Scores</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          These metrics represent real-world diagnostic scores audited via Google Lighthouse, reflecting the architecture's commitment to accessibility and speed.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <CircularProgress value={92} label="Performance" delay={0.1} />
        <CircularProgress value={96} label="Accessibility" delay={0.2} />
        <CircularProgress value={96} label="Best Practices" delay={0.3} />
        <CircularProgress value={100} label="SEO" delay={0.4} />
      </div>

      <div className="space-y-4">
        <h4 className="font-mono text-xs text-section uppercase tracking-wider mb-2">Core Web Vitals</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-card/40 border border-border/50">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-foreground">LCP (Largest Contentful Paint)</div>
                <div className="text-[10px] text-muted-foreground">Load performance</div>
              </div>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-400">0.8s</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-card/40 border border-border/50">
            <div className="flex items-center gap-3">
              <MousePointerClick className="h-4 w-4 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-foreground">FID (First Input Delay)</div>
                <div className="text-[10px] text-muted-foreground">Interactivity</div>
              </div>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-400">2ms</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-card/40 border border-border/50">
            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-foreground">CLS (Cumulative Layout Shift)</div>
                <div className="text-[10px] text-muted-foreground">Visual stability</div>
              </div>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-400">0.00</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/40">
        <h4 className="font-mono text-xs text-section uppercase tracking-wider mb-4">Build Output Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-section-muted border border-section/20">
            <div className="text-[10px] text-section uppercase tracking-wider mb-1">First Load JS</div>
            <div className="text-lg font-bold text-foreground">~82 kB</div>
          </div>
          <div className="p-3 rounded-lg bg-section-muted border border-section/20">
            <div className="text-[10px] text-section uppercase tracking-wider mb-1">Architecture</div>
            <div className="text-xs font-bold text-foreground mt-1">RSC + Static</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   MAIN SECTION
   ======================================== */

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="skills" ref={containerRef} className="section-skills py-24 relative border-t border-border/30">
      <div className="container-tight">
        
        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-section/20 bg-section-muted text-section text-xs font-mono uppercase tracking-wider mb-6">
              <Zap className="h-3.5 w-3.5" />
              The Laboratory
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-none text-foreground">
              Skills & Engineering.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-base leading-relaxed">
              Explore my AI-assisted development workflow and real-time performance metrics.
              This site is an interactive demonstration of modern web engineering.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative">
          
          {/* LEFT: Vertical Pipeline */}
          <div className="lg:col-span-7 relative">
            <h3 className="text-xl font-bold text-foreground mb-8">AI-Assisted Workflow</h3>
            
            <div className="relative pl-8 md:pl-12 pb-10">
              {/* Background track */}
              <div className="absolute left-[11px] md:left-[15px] top-4 bottom-0 w-1 bg-border/40 rounded-full" />
              
              {/* Animated track */}
              <motion.div 
                className="absolute left-[11px] md:left-[15px] top-4 w-1 bg-section rounded-full origin-top drop-shadow-[0_0_8px_var(--section-color)]"
                style={{ height: "100%", scaleY: lineHeight }}
              />

              <div className="space-y-16">
                {PIPELINE_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  // Calculate trigger point for this specific step based on index
                  const triggerPoint = index / (PIPELINE_STEPS.length - 1);
                  
                  // When the scroll progress reaches this step, it lights up
                  const opacity = useTransform(scrollYProgress, 
                    [triggerPoint - 0.2, triggerPoint], 
                    [0.4, 1]
                  );
                  
                  const scale = useTransform(scrollYProgress, 
                    [triggerPoint - 0.2, triggerPoint], 
                    [0.8, 1]
                  );

                  return (
                    <div key={step.id} className="relative group">
                      {/* Step Node */}
                      <motion.div 
                        className="absolute -left-[32px] md:-left-[48px] top-0 h-8 w-8 rounded-full border-2 border-background bg-section flex items-center justify-center z-10 drop-shadow-[0_0_10px_var(--section-color)]"
                        style={{ scale }}
                      >
                        <Icon className="h-4 w-4 text-background" />
                      </motion.div>

                      {/* Step Content */}
                      <motion.div 
                        style={{ opacity }} 
                        className="bg-card/20 border border-border/40 rounded-xl p-5 md:p-6 backdrop-blur-sm transition-all hover:border-section/40 hover:bg-card/40"
                      >
                        <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                          <span className="text-section font-mono text-sm">0{index + 1}.</span> {step.label}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {step.details.map((detail) => (
                            <span key={detail} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-section-muted border border-section/20 text-[10px] text-foreground font-mono uppercase">
                              <ArrowRight className="h-3 w-3 text-section" />
                              {detail}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Performance Dashboard (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <PerformanceDashboard />
          </div>

        </div>
      </div>
    </section>
  );
}
