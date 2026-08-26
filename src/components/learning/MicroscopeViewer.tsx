"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Sparkles, Volume2, Lightbulb, Eye } from "lucide-react";
import { playPopSound, playDiscoverySound, speak } from "@/lib/audio-manager";

const SPECIMENS = [
  {
    id: "cotton",
    name: "Natural Cotton",
    emoji: "🌿",
    color: "from-emerald-400 to-green-600",
    description: "Hollow, twisted plant tube made of cellulose.",
    explanation: "At 1000x zoom, you can see cotton is not solid! It is a twisted hollow ribbon with empty internal space (lumen). That is why water and sweat absorb into it instantly and air circulates easily!",
    viewGraphic: "hollow-ribbon",
    structureName: "Plant Cellulose Tubules with Lumen",
    trait: "Breathable & Water Absorbing"
  },
  {
    id: "nylon",
    name: "Synthetic Nylon",
    emoji: "🧵",
    color: "from-blue-400 to-indigo-600",
    description: "Solid, continuous, perfectly smooth chemical polymer filament.",
    explanation: "At 1000x zoom, nylon has zero holes or pores! It is a smooth, continuous plastic wire made of tightly packed polymer chains. Water cannot get inside, and no weak joints exist to snap easily!",
    viewGraphic: "smooth-polymer",
    structureName: "Linear Polyamide Polymer Chains",
    trait: "Super Strong & Quick Drying"
  },
  {
    id: "wool",
    name: "Natural Sheep Wool",
    emoji: "🐑",
    color: "from-amber-400 to-orange-500",
    description: "Rough fiber covered with microscopic overlapping scales.",
    explanation: "At 1000x zoom, wool looks like a pinecone! Millions of microscopic scales overlap along the fiber. These scales trap tiny air pockets that block heat loss, keeping you warm in winter!",
    viewGraphic: "scaly-fiber",
    structureName: "Keratin Protein Fiber with Scales",
    trait: "Thermal Insulator (Traps Air)"
  },
  {
    id: "plastic",
    name: "Synthetic Plastic",
    emoji: "🧴",
    color: "from-purple-400 to-pink-600",
    description: "Dense, tangled synthetic polymer macromolecular grid.",
    explanation: "At 1000x zoom, plastic consists of millions of synthetic monomers chemically bonded in an unbroken web. Because soil bacteria cannot recognize or digest these man-made bonds, plastic lasts for hundreds of years!",
    viewGraphic: "polymer-grid",
    structureName: "Synthetic Polymer Matrix",
    trait: "Non-Biodegradable & Moldable"
  }
];

export function MicroscopeViewer() {
  const [activeSpecimenId, setActiveSpecimenId] = useState("cotton");
  const [zoomLevel, setZoomLevel] = useState<"10x" | "100x" | "1000x">("1000x");

  const currentSpecimen = SPECIMENS.find((s) => s.id === activeSpecimenId) || SPECIMENS[0];

  const handleSelectSpecimen = (specimen: typeof SPECIMENS[0]) => {
    playPopSound();
    setActiveSpecimenId(specimen.id);
    speak(`Inspecting ${specimen.name} under the microscope! ${specimen.explanation}`);
  };

  const handleZoomChange = (level: "10x" | "100x" | "1000x") => {
    playDiscoverySound();
    setZoomLevel(level);
  };

  const handleReadVoice = () => {
    playDiscoverySound();
    speak(currentSpecimen.explanation);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-pip-blue/10 flex items-center justify-center text-2xl shadow-inner shrink-0">
            🔬
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-dark">
              Interactive Microscopic Lab
            </h2>
            <p className="text-xs text-text-muted">
              Zoom in up to 1000x to discover the secret molecular structures of materials!
            </p>
          </div>
        </div>

        {/* Zoom Level Switcher */}
        <div className="flex bg-lab-chalk p-1 rounded-xl border border-lab-wood/20 shadow-xs">
          {(["10x", "100x", "1000x"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleZoomChange(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                zoomLevel === lvl
                  ? "bg-pip-blue text-white shadow-soft"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              {lvl} Zoom
            </button>
          ))}
        </div>
      </div>

      {/* Specimen Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {SPECIMENS.map((spec) => {
          const isSelected = spec.id === currentSpecimen.id;
          return (
            <motion.button
              key={spec.id}
              onClick={() => handleSelectSpecimen(spec)}
              className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "bg-white border-pip-blue shadow-soft scale-102"
                  : "bg-lab-chalk/50 border-lab-wood/15 hover:bg-white hover:border-pip-blue/30"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{spec.emoji}</span>
              <div className="truncate">
                <span className="block text-xs font-extrabold text-text-dark truncate">
                  {spec.name}
                </span>
                <span className="block text-[10px] text-text-muted truncate">
                  {spec.trait}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Microscopic Lens Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* The Lens View */}
        <div className="relative w-full aspect-square max-w-sm mx-auto rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 shadow-warm border-8 border-lab-wood/30 overflow-hidden flex items-center justify-center">
          
          {/* Microscope Glass Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20 rounded-full" />
          <div className="absolute top-4 left-6 w-20 h-8 rounded-full bg-white/15 blur-sm -rotate-45 pointer-events-none z-20" />

          {/* Crosshairs & Scale Grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
            <div className="w-full h-px bg-white" />
            <div className="h-full w-px bg-white absolute" />
            <div className="w-48 h-48 rounded-full border border-dashed border-white absolute" />
          </div>

          {/* Microscopic Visual Art */}
          <motion.div
            key={`${currentSpecimen.id}-${zoomLevel}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: zoomLevel === "10x" ? 1 : zoomLevel === "100x" ? 1.3 : 1.7, 
              opacity: 1 
            }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {currentSpecimen.viewGraphic === "hollow-ribbon" && (
              /* Cotton: Twisted hollow ribbon with lumen */
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                <path
                  d="M30 40 Q80 80 50 140 T90 180"
                  fill="none"
                  stroke="#A7F3D0"
                  strokeWidth="28"
                  strokeLinecap="round"
                />
                <path
                  d="M30 40 Q80 80 50 140 T90 180"
                  fill="none"
                  stroke="#065F46"
                  strokeWidth="10"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
                <path
                  d="M120 20 Q160 90 130 150 T170 190"
                  fill="none"
                  stroke="#6EE7B7"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {currentSpecimen.viewGraphic === "smooth-polymer" && (
              /* Nylon: Perfectly smooth linear polymer wires */
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                <line x1="30" y1="20" x2="30" y2="180" stroke="#60A5FA" strokeWidth="22" strokeLinecap="round" />
                <line x1="80" y1="10" x2="80" y2="190" stroke="#3B82F6" strokeWidth="26" strokeLinecap="round" />
                <line x1="130" y1="30" x2="130" y2="170" stroke="#2563EB" strokeWidth="20" strokeLinecap="round" />
                <line x1="170" y1="20" x2="170" y2="180" stroke="#93C5FD" strokeWidth="18" strokeLinecap="round" />
              </svg>
            )}

            {currentSpecimen.viewGraphic === "scaly-fiber" && (
              /* Wool: Overlapping Keratin Scales */
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                <rect x="75" y="20" width="50" height="160" rx="20" fill="#FDE68A" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M 75 ${35 + i * 18} Q 100 ${45 + i * 18} 125 ${35 + i * 18}`}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            )}

            {currentSpecimen.viewGraphic === "polymer-grid" && (
              /* Plastic: Synthetic monomer grid */
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                <g stroke="#C084FC" strokeWidth="6">
                  <line x1="30" y1="40" x2="170" y2="40" />
                  <line x1="30" y1="100" x2="170" y2="100" />
                  <line x1="30" y1="160" x2="170" y2="160" />
                  <line x1="50" y1="20" x2="50" y2="180" />
                  <line x1="100" y1="20" x2="100" y2="180" />
                  <line x1="150" y1="20" x2="150" y2="180" />
                </g>
                <circle cx="50" cy="40" r="10" fill="#9333EA" />
                <circle cx="100" cy="40" r="10" fill="#9333EA" />
                <circle cx="150" cy="40" r="10" fill="#9333EA" />
                <circle cx="50" cy="100" r="10" fill="#9333EA" />
                <circle cx="100" cy="100" r="10" fill="#9333EA" />
                <circle cx="150" cy="100" r="10" fill="#9333EA" />
                <circle cx="50" cy="160" r="10" fill="#9333EA" />
                <circle cx="100" cy="160" r="10" fill="#9333EA" />
                <circle cx="150" cy="160" r="10" fill="#9333EA" />
              </svg>
            )}
          </motion.div>

          {/* Current Zoom Overlay Badge */}
          <div className="absolute bottom-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-mono font-bold border border-white/20">
            Magnification: {zoomLevel}
          </div>
        </div>

        {/* Structure Insights & Scientific Explanation */}
        <div className="space-y-4 text-left">
          <div className="bg-lab-chalk/80 rounded-2xl p-4 border border-lab-wood/20">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-pip-blue-dark block mb-1">
              Microscopic Structure:
            </span>
            <h3 className="text-lg font-black text-text-dark">
              {currentSpecimen.structureName}
            </h3>
            <p className="text-xs text-text-muted mt-1">
              {currentSpecimen.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border-2 border-pip-blue/20 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-pip-blue font-extrabold text-sm">
                <Lightbulb size={16} />
                <span>Why Does It Behave This Way?</span>
              </div>

              <button
                onClick={handleReadVoice}
                className="p-1.5 rounded-lg bg-pip-blue/10 hover:bg-pip-blue/20 text-pip-blue transition-colors"
                title="Listen to Explanation 🗣️"
              >
                <Volume2 size={15} />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-text-dark font-medium leading-relaxed">
              {currentSpecimen.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
