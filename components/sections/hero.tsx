"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import {
  Mail,
  ArrowDown,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { TextReveal, Magnetic, FadeIn, FloatingParticles } from "@/components/animations/motion";

/* ========================================
   AVAILABILITY BADGE
   ======================================== */

function AvailabilityBadge() {
  return (
    <FadeIn delay={0.8}>
      <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Available for internship &amp; entry-level roles
      </div>
    </FadeIn>
  );
}

/* ========================================
   SCROLL INDICATOR
   ======================================== */

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em]">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
      </motion.div>
    </motion.div>
  );
}

/* ========================================
   SOCIAL LINKS
   ======================================== */

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Saadi-Creative",
    icon: GitHubIcon,
    isLucide: false,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammad-saad-ullah-527705303",
    icon: LinkedInIcon,
    isLucide: false,
  },
  {
    label: "Email",
    href: "mailto:muhammdsaad8374@gmail.com",
    icon: Mail,
    isLucide: true,
  },
];

function SocialLinks() {
  return (
    <FadeIn delay={1.2}>
      <div className="flex items-center gap-3">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={
              social.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            aria-label={social.label}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/30 text-muted-foreground transition-all hover:text-foreground hover:border-border hover:bg-card/60"
          >
            {social.isLucide ? (
              <social.icon className="h-4 w-4" />
            ) : (
              <social.icon size={16} className="h-4 w-4" />
            )}
          </a>
        ))}
      </div>
    </FadeIn>
  );
}


export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex items-center justify-center min-h-[100dvh] overflow-hidden"
    >
      {/* Background layers (Parallax) */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,var(--section-muted),transparent_70%)]" />
        <FloatingParticles />
      </motion.div>
      
      {/* Bottom fade (Fixed so it overlaps properly) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Content (Scales and fades on scroll) */}
      <motion.div 
        style={{ scale: textScale, opacity: textOpacity }}
        className="relative z-10 container-tight flex flex-col items-center text-center pt-24 pb-32"
      >
        {/* Availability */}
        <AvailabilityBadge />

        <div className="h-8" />

        {/* Name */}
        <TextReveal
          text="Muhammad Saad"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9]"
          delay={0.2}
        />

        <div className="h-5" />

        {/* Title */}
        <FadeIn delay={0.6}>
          <div className="flex items-center gap-2 text-lg sm:text-xl text-muted-foreground">
            <Sparkles className="h-4 w-4 text-section" />
            <span className="font-mono text-sm sm:text-base tracking-wide">
              AI-Assisted Full Stack Developer
            </span>
          </div>
        </FadeIn>

        <div className="h-8" />

        {/* Value proposition */}
        <FadeIn delay={0.7}>
          <p className="max-w-[52ch] text-base sm:text-lg text-muted-foreground/80 leading-relaxed text-balance">
            I build intelligent web applications that combine modern engineering
            with AI-assisted development. Architecture, performance, and
            craftsmanship — accelerated by AI.
          </p>
        </FadeIn>

        <div className="h-10" />

        {/* CTA Buttons */}
        <FadeIn delay={0.9}>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Magnetic strength={0.15}>
              <a
                href="#projects"
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 hover:shadow-lg"
              >
                View Projects
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="https://github.com/Saadi-Creative"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-xl border border-border/50 bg-card/30 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-border hover:bg-card/60"
              >
                <GitHubIcon size={16} className="h-4 w-4" />
                GitHub
              </a>
            </Magnetic>
          </div>
        </FadeIn>

        <div className="h-10" />

        {/* Social links */}
        <SocialLinks />
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
