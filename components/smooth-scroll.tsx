"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
      wheelMultiplier: 1.1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
