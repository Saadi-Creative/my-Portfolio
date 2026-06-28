"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Outer ring (trailing)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot (instant)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Smooth spring for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Don't show custom cursor on mobile or if reduced motion is preferred
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of element dimensions to center them
      cursorX.set(e.clientX - 20); // 40px width / 2
      cursorY.set(e.clientY - 20); // 40px height / 2
      
      dotX.set(e.clientX - 4); // 8px width / 2
      dotY.set(e.clientY - 4); // 8px height / 2
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full border-2 border-brand bg-brand/5 shadow-[0_0_15px_var(--brand)] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      
      {/* Inner solid dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[101] h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
