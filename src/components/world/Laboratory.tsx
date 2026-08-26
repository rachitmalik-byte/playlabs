"use client";

import { motion } from "framer-motion";

/**
 * Laboratory — The warm science lab environment that serves as the visual world.
 * Rendered as layered CSS/SVG elements creating depth and atmosphere.
 * NOT a flat background — it has shelves, equipment silhouettes, and warm lighting.
 */
export function Laboratory({ children, variant = "full" }: { 
  children: React.ReactNode;
  variant?: "full" | "workbench" | "minimal";
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Warm ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-lab-cream" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-hint-yellow/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-lab-wood/6 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-pip-blue/4 blur-3xl" />
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
      
      {/* Shelf items - subtle equipment silhouettes */}
      <div className="absolute bottom-3 left-8 flex items-end gap-6 opacity-20">
        {/* Flask */}
        <svg width="28" height="36" viewBox="0 0 28 36" fill="currentColor" className="text-lab-wood-dark">
          <path d="M11 0h6v14l8 16a4 4 0 01-3.5 6H6.5A4 4 0 013 30L11 14V0z" />
        </svg>
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
      <div className="absolute bottom-3 right-12 flex items-end gap-5 opacity-20">
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

/**
 * WorkbenchSurface — A wooden surface for placing objects on.
 * Used as the main experiment/interaction area.
 */
export function WorkbenchSurface({ children, className = "" }: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative bg-gradient-to-b from-lab-wood-light/20 to-lab-wood/10 rounded-xl border border-lab-wood/20 p-6 ${className}`}>
      {/* Wood grain texture lines */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-lab-wood-dark"
            style={{ top: `${12 + i * 12}%` }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * SceneBackground — A full illustration background for specific scenes
 */
export function SceneBackground({ scene, children }: {
  scene: "nature" | "factory" | "festival" | "summer" | "winter" | "underground";
  children: React.ReactNode;
}) {
  const sceneStyles = {
    nature: "from-nature-green/10 via-lab-cream to-nature-green/5",
    factory: "from-factory-orange/8 via-lab-cream to-factory-orange/5",
    festival: "from-hint-yellow/10 via-lab-cream to-factory-orange/5",
    summer: "from-hint-yellow/15 via-lab-cream to-water-blue/5",
    winter: "from-water-blue/8 via-lab-cream to-pip-blue/5",
    underground: "from-earth-brown/15 via-earth-brown/5 to-lab-cream",
  };

  return (
    <div className={`relative min-h-[60vh] bg-gradient-to-b ${sceneStyles[scene]} rounded-2xl overflow-hidden`}>
      {children}
    </div>
  );
}
