"use client";

import { motion } from "framer-motion";

/**
 * Laboratory — The warm science lab environment that serves as the visual world.
 * Rendered as layered CSS/SVG elements creating depth and atmosphere.
 * Features ambient floating bubbles and beaker sparkles for children.
 */
export function Laboratory({ 
  children, 
  variant = "full" 
}: { 
  children: React.ReactNode;
  variant?: "full" | "workbench" | "minimal";
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Warm ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-lab-cream" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-hint-yellow/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-lab-wood/8 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-pip-blue/6 blur-3xl" />
      </div>

      {/* Floating Animated Beaker Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[
          { x: "15%", y: "75%", size: 10, delay: 0, dur: 7 },
          { x: "22%", y: "85%", size: 14, delay: 2, dur: 8 },
          { x: "78%", y: "80%", size: 12, delay: 1, dur: 9 },
          { x: "85%", y: "70%", size: 8, delay: 3.5, dur: 6.5 },
          { x: "48%", y: "90%", size: 16, delay: 4, dur: 10 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pip-blue/15 border border-pip-blue/30 backdrop-blur-xs"
            style={{ left: b.x, top: b.y, width: b.size, height: b.size }}
            animate={{
              y: [0, -180, -320],
              opacity: [0, 0.7, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {variant === "full" && <LabShelf />}
      {variant === "workbench" && <Workbench />}

      {/* Main content area */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/** Top shelf with bottles and equipment silhouettes */
function LabShelf() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-[1] pointer-events-none">
      {/* Shelf board */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-lab-wood to-lab-wood-dark" />
      
      {/* Shelf items - equipment silhouettes */}
      <div className="absolute bottom-3 left-8 flex items-end gap-6 opacity-25">
        {/* Flask with bubbling effect */}
        <div className="relative">
          <svg width="28" height="36" viewBox="0 0 28 36" fill="currentColor" className="text-lab-wood-dark">
            <path d="M11 0h6v14l8 16a4 4 0 01-3.5 6H6.5A4 4 0 013 30L11 14V0z" />
          </svg>
          <motion.div
            className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-pip-blue"
            animate={{ y: [0, -12], opacity: [1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>

        {/* Test tube */}
        <svg width="12" height="40" viewBox="0 0 12 40" fill="currentColor" className="text-lab-wood-dark">
          <rect x="2" width="8" height="32" rx="1" />
          <ellipse cx="6" cy="36" rx="6" ry="4" />
        </svg>

        {/* Book */}
        <svg width="24" height="30" viewBox="0 0 24 30" fill="currentColor" className="text-lab-wood-dark">
          <rect x="0" y="2" width="22" height="28" rx="2" />
          <rect x="2" y="0" width="22" height="28" rx="2" opacity="0.7" />
        </svg>

        {/* Magnifying glass */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" className="text-lab-wood-dark">
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="16" y1="16" x2="24" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Right side items */}
      <div className="absolute bottom-3 right-12 flex items-end gap-5 opacity-25">
        {/* Plant */}
        <svg width="20" height="34" viewBox="0 0 20 34" fill="currentColor" className="text-nature-green">
          <rect x="6" y="20" width="8" height="14" rx="2" className="text-lab-wood" fill="currentColor" />
          <ellipse cx="10" cy="16" rx="8" ry="10" />
        </svg>

        {/* Jar */}
        <svg width="22" height="28" viewBox="0 0 22 28" fill="currentColor" className="text-lab-wood-dark">
          <rect x="3" y="4" width="16" height="24" rx="3" />
          <rect x="5" y="0" width="12" height="6" rx="1" />
        </svg>
      </div>
    </div>
  );
}

/** Workbench surface at the bottom */
function Workbench() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[1] pointer-events-none"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Wood grain surface */}
      <div className="h-4 bg-gradient-to-b from-lab-wood-light to-lab-wood" />
      <div className="h-20 bg-gradient-to-b from-lab-wood to-lab-wood-dark" />
      
      {/* Edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-lab-wood-light/50" />
    </motion.div>
  );
}
