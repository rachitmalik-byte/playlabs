"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { speak, playPopSound } from "@/lib/audio-manager";
import { LottieAnimation, LottiePreset } from "@/components/lottie/LottieAnimation";

// Simplified dictionary for 5th graders with transparent sketchbook vector Lottie animations
export const KID_DICTIONARY: Record<string, { 
  title: string; 
  emoji: string; 
  simpleDef: string; 
  example: string;
  lottiePreset?: LottiePreset;
}> = {
  "insulator": {
    title: "Insulator (Shield)",
    emoji: "🛡️",
    simpleDef: "A material that stops electricity or heat from touching you!",
    example: "The blue plastic wrap on electrical wires keeps you safe from shocks!",
    lottiePreset: "electricity"
  },
  "insulators": {
    title: "Insulators (Protectors)",
    emoji: "🛡️",
    simpleDef: "Materials that block heat and electricity from passing through.",
    example: "Plastic kettle handles stay cool so you can pour hot tea safely!",
    lottiePreset: "electricity"
  },
  "heat insulator": {
    title: "Heat Insulator",
    emoji: "🧤",
    simpleDef: "Stops heat from spreading. The handle stays cool even when the pot boils!",
    example: "Wooden or plastic spoon handles stay cool in boiling hot soup!",
    lottiePreset: "flame"
  },
  "electrical insulator": {
    title: "Electrical Insulator",
    emoji: "🔌",
    simpleDef: "Stops electricity from escaping. It traps electric current inside the wire safely.",
    example: "Rubber and plastic coated wires prevent dangerous electric sparks!",
    lottiePreset: "electricity"
  },
  "conductor": {
    title: "Conductor (Fast Carrier)",
    emoji: "⚡",
    simpleDef: "A material that lets heat or electricity rush through it super fast!",
    example: "Copper metal inside wires carries electricity to light bulbs!",
    lottiePreset: "electricity"
  },
  "breathable": {
    title: "Breathable Cloth",
    emoji: "🌬️",
    simpleDef: "Has tiny air holes that let breeze in and sweat evaporate so you stay cool!",
    example: "Cotton shirts let your skin breathe during sunny summer play!",
    lottiePreset: "plant"
  },
  "cotton": {
    title: "Natural Cotton",
    emoji: "🌿",
    simpleDef: "A soft fluffy plant fibre grown by nature in fields.",
    example: "Used for soft shirts, towels, and cozy bedsheets!",
    lottiePreset: "plant"
  },
  "wrinkle-free": {
    title: "Wrinkle-Free (Smooth)",
    emoji: "👔",
    simpleDef: "Springs right back into smooth shape after folding, with zero crease marks!",
    example: "Polyester sportswear never gets messy wrinkles!",
    lottiePreset: "jacket"
  },
  "wrinkle-resistant": {
    title: "Wrinkle-Resistant (No Ironing)",
    emoji: "👔",
    simpleDef: "Fibres that resist bending and bounce back smooth like a spring!",
    example: "Polyester uniforms stay neat and crisp all day long!",
    lottiePreset: "jacket"
  },
  "tensile strength": {
    title: "Tensile Strength (Pulling Power)",
    emoji: "💪",
    simpleDef: "How much heavy weight a rope can pull without breaking!",
    example: "Nylon ropes can hold over 120 kilograms without snapping!",
    lottiePreset: "rope"
  },
  "nylon": {
    title: "Nylon (Super Thread)",
    emoji: "🧗",
    simpleDef: "A man-made miracle fibre that is actually stronger than a steel wire!",
    example: "Used in parachutes, mountain climbing ropes, and toothbrush bristles!",
    lottiePreset: "rope"
  },
  "polymer": {
    title: "Polymer (Chain Molecule)",
    emoji: "⛓️",
    simpleDef: "A super long chain made of thousands of tiny pieces connected like train cars!",
    example: "Plastic bottles, nylon ropes, and rubber tyres are all polymers!",
    lottiePreset: "chemistry"
  },
  "monomer": {
    title: "Monomer (Single Building Block)",
    emoji: "🧪",
    simpleDef: "One single building block before it links with others to make a long chain.",
    example: "Like one single LEGO brick before you build a tall tower!",
    lottiePreset: "chemistry"
  },
  "non-biodegradable": {
    title: "Non-Biodegradable",
    emoji: "⏳",
    simpleDef: "Cannot rot into soil. Soil bacteria cannot eat it, so it lasts for hundreds of years!",
    example: "Plastic bottles buried in dirt stay unchanged for 500+ years!",
    lottiePreset: "bottle"
  },
  "synthetic": {
    title: "Synthetic (Man-Made)",
    emoji: "🏭",
    simpleDef: "Made by scientists in factories using petroleum chemicals instead of plants.",
    example: "Nylon, polyester, and plastics are all synthetic materials!",
    lottiePreset: "jacket"
  },
  "natural": {
    title: "Natural (From Nature)",
    emoji: "🌳",
    simpleDef: "Grown by nature from living plants, animals, or trees.",
    example: "Cotton from plants, wool from sheep, and silk from silkworms!",
    lottiePreset: "plant"
  }
};

interface KidTermTooltipProps {
  term: string;
  displayText?: string;
  className?: string;
}

export function KidTermTooltip({
  term,
  displayText,
  className = ""
}: KidTermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedKey = term.toLowerCase().trim();
  const info = KID_DICTIONARY[normalizedKey] || {
    title: term,
    emoji: "🔬",
    simpleDef: `A special science concept: ${term}.`,
    example: "Investigate this in your lab experiments!"
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    speak(`${info.title}. ${info.simpleDef} For example, ${info.example}`);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setIsOpen(!isOpen);
  };

  return (
    <span className="relative inline-block my-0.5">
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border-b-2 border-dashed border-purple-400 font-black cursor-help transition-all text-inherit shadow-xs ${className}`}
      >
        <span>{displayText || term}</span>
        <span className="text-[10px] text-purple-500 opacity-80">💡</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="fixed sm:absolute bottom-4 sm:bottom-full left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 mb-3 z-50 w-auto sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-3xl p-4 sm:p-5 shadow-warm border-2 border-purple-300 text-left cursor-default pointer-events-auto"
          >
            {/* Tooltip Tail for desktop */}
            <div className="hidden sm:block absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-purple-300 rotate-45" />

            <div className="relative z-10 space-y-2.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{info.emoji}</span>
                  <h4 className="font-black text-sm sm:text-base text-purple-950">
                    {info.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors flex items-center gap-1 text-[11px] font-bold"
                    title="Listen to Definition 🗣️"
                  >
                    <Volume2 size={13} />
                    <span>Listen</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="sm:hidden p-1.5 rounded-xl bg-lab-chalk text-text-muted hover:text-text-dark"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Transparent Sketchbook Lottie Animation */}
              {info.lottiePreset && (
                <div className="rounded-2xl p-2 bg-gradient-to-br from-purple-50/60 to-indigo-50/60 border border-purple-100 flex items-center justify-center">
                  <LottieAnimation
                    preset={info.lottiePreset}
                    width={70}
                    height={70}
                  />
                </div>
              )}

              {/* Simple 5th-Grade Definition */}
              <p className="text-xs text-text-dark font-medium leading-relaxed">
                {info.simpleDef}
              </p>

              {/* Real-world example */}
              <div className="bg-purple-50/70 rounded-2xl p-2.5 text-[11px] text-purple-900 leading-snug">
                <span className="font-bold">Everyday Example: </span>
                <span>{info.example}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
