"use client";

import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const observerEntry = useIntersectionObserver(canvasRef, { threshold: 0.05 });
  const isVisible = observerEntry ? observerEntry.isIntersecting : true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const gridSize = 64;
      const cols = Math.ceil(w / gridSize) + 1;
      const rows = Math.ceil(h / gridSize) + 1;

      // Draw grid lines
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        const y = j * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        // Draw intersection dots with mouse proximity glow
        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            const x = i * gridSize;
            const y = j * gridSize;

            // Distance from mouse
            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 200;
            const intensity = Math.max(0, 1 - dist / maxDist);

            // Subtle pulsing animation
            const pulse = Math.sin(time * 0.002 + i * 0.5 + j * 0.3) * 0.3 + 0.7;

            if (intensity > 0) {
              // Glow dot near cursor
              const radius = 1.5 + intensity * 2.5;
              const alpha = intensity * 0.6 * pulse;
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(120, 160, 255, ${alpha})`;
              ctx.fill();

              // Subtle glow ring
              if (intensity > 0.3) {
                ctx.beginPath();
                ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(120, 160, 255, ${intensity * 0.08})`;
                ctx.fill();
              }
            } else {
              // Static subtle dot
              ctx.beginPath();
              ctx.arc(x, y, 0.5, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
              ctx.fill();
            }
          }
        }
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
