"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
    simpleDef: "How much heavy pulling weight a rope can hold before snapping!",
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
  "polyester": {
    title: "Polyester (Quick-Dry Fabric)",
    emoji: "🏃",
    simpleDef: "A durable synthetic fabric that dries fast and never wrinkles!",
    example: "Used for raincoats, athletic sportswear, and school backpacks!",
    lottiePreset: "jacket"
  },
  "acrylic": {
    title: "Acrylic (Man-Made Wool)",
    emoji: "🧶",
    simpleDef: "Soft artificial wool made in factories that traps body heat to keep you warm.",
    example: "Used in warm winter sweaters, blankets, and woolly beanies!",
    lottiePreset: "wool"
  },
  "plastic": {
    title: "Plastic (Versatile Polymer)",
    emoji: "🧴",
    simpleDef: "A lightweight, moldable polymer that can be shaped into bottles, toys, and insulators!",
    example: "Water bottles, switchboards, and protective containers.",
    lottiePreset: "bottle"
  },
  "rubber": {
    title: "Rubber (Elastic Bounce)",
    emoji: "🌴",
    simpleDef: "A flexible and stretchy material that bounces and bends easily.",
    example: "Vehicle tyres, bouncy balls, and flexible pencil erasers!",
    lottiePreset: "rubber_tree"
  },
  "polymer": {
    title: "Polymer (Chain of Units)",
    emoji: "⛓️",
    simpleDef: "A giant molecule made of thousands of small units linked together like train cars!",
    example: "Plastics, nylon ropes, and polyester fabrics are all polymers!",
    lottiePreset: "chemistry"
  },
  "monomer": {
    title: "Monomer (Single Building Block)",
    emoji: "🧪",
    simpleDef: "One single unit before it links with others to make a long chain.",
    example: "Like one single LEGO brick before you build a tall castle!",
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
  const [placement, setPlacement] = useState<{
    vertical: "top" | "bottom";
    horizontal: "center" | "left" | "right";
  }>({ vertical: "top", horizontal: "center" });

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const normalizedKey = term.toLowerCase().trim();
  const info = KID_DICTIONARY[normalizedKey] || {
    title: term,
    emoji: "🔬",
    simpleDef: `A special science concept: ${term}.`,
    example: "Investigate this in your lab experiments!",
    lottiePreset: "chemistry" as LottiePreset
  };

  const updatePosition = useCallback(() => {
    if (!buttonRef.current || typeof window === "undefined") return;
    const rect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Vertical: If near top of screen (< 230px), open downwards. Otherwise open upwards.
    const vertical = rect.top < 230 ? "bottom" : "top";

    // Horizontal: If near left edge, align left. If near right edge, align right. Otherwise center.
    let horizontal: "center" | "left" | "right" = "center";
    if (rect.left < 160) {
      horizontal = "left";
    } else if (viewportWidth - rect.right < 160) {
      horizontal = "right";
    }

    setPlacement({ vertical, horizontal });
  }, []);

  const handleOpen = () => {
    updatePosition();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    speak(`${info.title}. ${info.simpleDef} Everyday example: ${info.example}`);
  };

  // Get positioning class names based on dynamic screen coordinates
  const getPositionClasses = () => {
    const verticalClass = placement.vertical === "bottom" 
      ? "top-full mt-2" 
      : "bottom-full mb-2";

    const horizontalClass = placement.horizontal === "left"
      ? "left-0"
      : placement.horizontal === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

    return `${verticalClass} ${horizontalClass}`;
  };

  return (
    <span className="relative inline-block my-0.5">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border-b-2 border-dashed border-purple-400 font-black cursor-help transition-all text-inherit shadow-xs ${className}`}
      >
        <span>{displayText || term}</span>
        <span className="text-[10px] text-purple-500 opacity-80">💡</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: placement.vertical === "bottom" ? -6 : 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className={`fixed sm:absolute ${getPositionClasses()} z-50 w-auto sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-3xl p-4 sm:p-5 shadow-warm border-2 border-purple-300 text-left cursor-default pointer-events-auto`}
          >
            {/* Tooltip Tail */}
            <div
              className={`hidden sm:block absolute w-3.5 h-3.5 bg-white border-purple-300 rotate-45 ${
                placement.vertical === "bottom"
                  ? "-top-2 border-t-2 border-l-2"
                  : "-bottom-2 border-b-2 border-r-2"
              } ${
                placement.horizontal === "left"
                  ? "left-6"
                  : placement.horizontal === "right"
                  ? "right-6"
                  : "left-1/2 -translate-x-1/2"
              }`}
            />

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
                    className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
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
