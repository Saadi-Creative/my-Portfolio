"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, User, Code2, Briefcase, GitCommit, Mail, Menu, X, Terminal } from "lucide-react";
import { Magnetic } from "@/components/animations/motion";

const NAV_ITEMS = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Arsenal", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Timeline", href: "#timeline", icon: GitCommit },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("#hero");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div 
          className={`pointer-events-auto flex items-center p-1.5 rounded-full border transition-all duration-500 max-w-full overflow-x-auto hide-scrollbar ${
            isScrolled 
              ? "bg-background/80 backdrop-blur-xl border-border/60 shadow-[0_8px_32px_rgba(0,0,0,0.6)]" 
              : "bg-background/40 backdrop-blur-md border-border/20 shadow-none"
          }`}
        >
          {/* Logo - left side of dock */}
          <Link
            href="/"
            onClick={() => setActiveSection("#hero")}
            className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full mr-2 transition-colors hover:bg-muted"
            aria-label="Home"
          >
            <Terminal className="h-4 w-4 text-foreground" />
          </Link>

          {/* Dock Items (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Magnetic key={item.href} strength={0.15}>
                <Link
                  href={item.href}
                  onClick={() => setActiveSection(item.href)}
                  className="relative group flex items-center px-4 h-10 rounded-full text-sm font-medium transition-colors"
                >
                  <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                    activeSection === item.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    <item.icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden lg:block tracking-wide">{item.label}</span>
                  </span>

                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeDockPill"
                      className="absolute inset-0 rounded-full bg-muted/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-border/50"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Contact Button & Mobile Toggle */}
          <div className="flex items-center gap-1 ml-2 shrink-0">
            <Link
              href="#contact"
              onClick={() => setActiveSection("#contact")}
              className="hidden md:inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-bold tracking-wide text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--section-color)] hover:bg-[var(--section-color)] hover:text-white active:scale-95"
            >
              Let&apos;s Talk
            </Link>

            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col items-center justify-center h-full gap-4"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 text-3xl font-bold text-foreground transition-all duration-300 hover:text-[var(--section-color)] px-6 py-3 rounded-full hover:bg-muted/50 hover:scale-105 active:scale-95"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="h-8 w-8" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_ITEMS.length * 0.05 }}
                className="mt-8"
              >
                <Link
                  href="#contact"
                  className="inline-flex h-14 items-center rounded-full bg-foreground px-10 text-lg font-bold text-background transition-all duration-300 hover:scale-105 hover:bg-[var(--section-color)] hover:text-white active:scale-95 hover:shadow-[0_0_30px_var(--section-color)]"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
