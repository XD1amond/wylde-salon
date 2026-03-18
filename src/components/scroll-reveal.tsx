"use client";

import { useEffect, useRef } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** "up" | "left" | "scale" — matches .reveal / .reveal-left / .reveal-scale */
  direction?: "up" | "left" | "scale";
  /** Extra Tailwind / utility classes added to the wrapper */
  wrapperClass?: string;
  /** Intersection threshold 0–1 */
  threshold?: number;
};

/**
 * Wraps children in a div that fades into view when scrolled into the viewport.
 * Uses CSS classes defined in globals.css (.reveal, .reveal-left, .reveal-scale).
 */
export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  wrapperClass = "",
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const baseClass =
    direction === "left"
      ? "reveal-left"
      : direction === "scale"
        ? "reveal-scale"
        : "reveal";

  return (
    <div ref={ref} className={`${baseClass} ${wrapperClass} ${className}`}>
      {children}
    </div>
  );
}
