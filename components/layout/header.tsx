"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Terminal, Menu, X, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Arsenal", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  /* ---- Scroll behavior: hide on down, show on up ---- */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 16);

    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---- Active section observer ---- */
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

  /* ---- Keyboard shortcut: Cmd+K placeholder ---- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Will be wired to CommandPalette in a later phase
        console.log("Command palette triggered");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
            : "bg-transparent"
        }`}
      >
        <nav className="container-tight flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-card transition-colors group-hover:border-brand/50 group-hover:bg-brand-muted">
              <Terminal className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" />
            </div>
            <span className="hidden font-semibold tracking-tight sm:inline-block text-sm">
              saad.dev
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm transition-colors rounded-md ${
                  activeSection === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-md bg-muted/50"
                    style={{ zIndex: -1 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Command palette trigger */}
            <button
              className="hidden sm:inline-flex items-center gap-2 px-3 h-8 rounded-lg border border-border/50 bg-card/50 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-all cursor-pointer"
              onClick={() => console.log("Command palette")}
            >
              <span>Search</span>
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium hidden sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Contact CTA */}
            <Link
              href="#contact"
              className="hidden md:inline-flex h-8 items-center rounded-lg bg-foreground px-4 text-xs font-medium text-background transition-all hover:opacity-90"
            >
              Let&apos;s Talk
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 transition-colors hover:bg-muted cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className="text-2xl font-medium text-foreground transition-colors hover:text-brand"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://github.com/Saadi-Creative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <GitHubIcon size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/muhammad-saad-ullah-527705303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={20} />
                </a>
                <a
                  href="mailto:muhammdsaad8374@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
