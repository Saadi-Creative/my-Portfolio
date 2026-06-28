"use client";

import { Mail, Heart, Terminal, Code2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const NAV_LINKS = [
  { label: "Hero",     href: "#hero" },
  { label: "About",   href: "#about" },
  { label: "Skills",  href: "#skills" },
  { label: "Projects",href: "#projects" },
  { label: "Timeline",href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/Saadi-Creative",   Icon: GitHubIcon,   isLucide: false },
  { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-saad-ullah-527705303", Icon: LinkedInIcon, isLucide: false },
  { label: "Email",    href: "mailto:muhammdsaad8374@gmail.com",     Icon: Mail,         isLucide: true },
];

const STACK_BADGES = [
  { label: "Next.js 16",      color: "border-[oklch(0.68_0.17_155/40%)] text-[oklch(0.68_0.17_155)]" },
  { label: "React 19",        color: "border-[oklch(0.72_0.18_220/40%)] text-[oklch(0.72_0.18_220)]" },
  { label: "TypeScript",      color: "border-[oklch(0.72_0.22_285/40%)] text-[oklch(0.72_0.22_285)]" },
  { label: "Framer Motion",   color: "border-[oklch(0.72_0.22_12/40%)]  text-[oklch(0.72_0.22_12)]"  },
  { label: "Tailwind v4",     color: "border-[oklch(0.80_0.17_75/40%)]  text-[oklch(0.80_0.17_75)]"  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-card/30">
      {/* Ambient rose glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[oklch(0.72_0.22_12/8%)] blur-[80px]" />
      </div>

      <div className="container-tight relative z-10 py-16 md:py-20">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-border/40">
          
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.72_0.22_12/15%)] border border-[oklch(0.72_0.22_12/30%)]">
                <Code2 className="h-4 w-4 text-[oklch(0.72_0.22_12)]" />
              </div>
              <span className="font-bold text-foreground tracking-tight">Muhammad Saad</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              AI-Assisted Full Stack Developer building performant, accessible, and visually premium web experiences.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map(({ label, href, Icon, isLucide }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/40 text-muted-foreground transition-all hover:text-[oklch(0.72_0.22_12)] hover:border-[oklch(0.72_0.22_12/40%)] hover:bg-[oklch(0.72_0.22_12/8%)]"
                >
                  {isLucide ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <Icon size={16} className="h-4 w-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="h-px w-3 bg-muted-foreground/40 group-hover:w-5 group-hover:bg-[oklch(0.72_0.22_12)] transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Built With */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {STACK_BADGES.map(({ label, color }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-mono font-medium ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-2">
              Crafted with AI-assisted workflows — Gemini & GitHub Copilot as engineering co-pilots.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-[oklch(0.72_0.22_12)] fill-[oklch(0.72_0.22_12)]" />
            <span>by</span>
            <span className="font-semibold text-foreground">Muhammad Saad</span>
            <span className="text-border mx-1">·</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground/60">
            <Terminal className="h-3 w-3" />
            <span>next.js + framer-motion + tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
