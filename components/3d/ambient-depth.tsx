"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Lightweight, CSS/SVG-based ambient depth effect for the hero — layered
 * translucent forms with slow parallax drift. No WebGL, so it renders
 * instantly on low-power devices and is inert (a single static frame) for
 * prefers-reduced-motion users, per ARCHITECTURE.md's 3D guidance.
 */
export function AmbientDepth() {
  const shouldReduceMotion = useReducedMotion();

  const orbs = [
    {
      className: "left-[-10%] top-[8%] h-72 w-72 bg-teal-500/25",
      duration: 22,
      x: [0, 30, 0],
      y: [0, 20, 0],
    },
    {
      className: "right-[-6%] top-[30%] h-96 w-96 bg-teal-400/15",
      duration: 28,
      x: [0, -24, 0],
      y: [0, -18, 0],
    },
    {
      className: "left-[20%] bottom-[-10%] h-80 w-80 bg-gold-500/10",
      duration: 26,
      x: [0, 16, 0],
      y: [0, -24, 0],
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,171,159,0.18),transparent_60%)]" />
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={{ willChange: "transform" }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: orb.x, y: orb.y, rotate: [0, 6, 0] }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
