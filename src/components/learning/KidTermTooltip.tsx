"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { speak, playPopSound } from "@/lib/audio-manager";

// Simplified dictionary for 5th graders with clear generated illustrations
export const KID_DICTIONARY: Record<string, { 
  title: string; 
  emoji: string; 
  simpleDef: string; 
  example: string;
  image?: string;
  imageCaption?: string;
}> = {
  "insulator": {
    title: "Insulator (Shield)",
    emoji: "🛡️",
    simpleDef: "A material that stops electricity or heat from touching you!",
    example: "The blue plastic wrap on electrical wires keeps you safe from shocks!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Blue plastic wrap blocks electric shocks & keeps handles cool!"
  },
  "insulators": {
    title: "Insulators (Protectors)",
    emoji: "🛡️",
    simpleDef: "Materials that block heat and electricity from passing through.",
    example: "Plastic kettle handles stay cool so you can pour hot tea safely!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Insulators protect your hands from burns and shocks!"
  },
  "heat insulator": {
    title: "Heat Insulator",
    emoji: "🧤",
    simpleDef: "Stops heat from spreading. The handle stays cool even when the pot boils!",
    example: "Wooden or plastic spoon handles stay cool in boiling hot soup!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Cool black plastic handle on hot pan!"
  },
  "electrical insulator": {
    title: "Electrical Insulator",
    emoji: "🔌",
    simpleDef: "Stops electricity from escaping. It traps electric current inside the wire safely.",
    example: "Rubber and plastic coated wires prevent dangerous electric sparks!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Plastic coating traps electricity safely inside!"
  },
  "conductor": {
    title: "Conductor (Fast Carrier)",
    emoji: "⚡",
    simpleDef: "A material that lets heat or electricity rush through it super fast!",
    example: "Copper metal inside wires carries electricity to light bulbs!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Copper metal inside wire conducts electricity fast!"
  },
  "breathable": {
    title: "Breathable Cloth",
    emoji: "🌬️",
    simpleDef: "Has tiny air holes that let breeze in and sweat evaporate so you stay cool!",
    example: "Cotton shirts let your skin breathe during sunny summer play!",
    image: "/images/cotton_plant_fabric.jpg",
    imageCaption: "Natural cotton plant fibres have tiny air pores!"
  },
  "cotton": {
    title: "Natural Cotton",
    emoji: "🌿",
    simpleDef: "A soft fluffy plant fibre grown by nature in fields.",
    example: "Used for soft shirts, towels, and cozy bedsheets!",
    image: "/images/cotton_plant_fabric.jpg",
    imageCaption: "Fluffy white cotton plant grown by nature!"
  },
  "wrinkle-free": {
    title: "Wrinkle-Free (Smooth)",
    emoji: "👔",
    simpleDef: "Springs right back into smooth shape after folding, with zero crease marks!",
    example: "Polyester sportswear never gets messy wrinkles!",
    image: "/images/wrinkle_vs_smooth.jpg",
    imageCaption: "Messy wrinkled shirt (Left) vs Crisp smooth polyester (Right)!"
  },
  "wrinkle-resistant": {
    title: "Wrinkle-Resistant (No Ironing)",
    emoji: "👔",
    simpleDef: "Fibres that resist bending and bounce back smooth like a spring!",
    example: "Polyester uniforms stay neat and crisp all day long!",
    image: "/images/wrinkle_vs_smooth.jpg",
    imageCaption: "Messy wrinkled cloth ❌ vs Crisp smooth polyester ✅!"
  },
  "tensile strength": {
    title: "Tensile Strength (Pulling Power)",
    emoji: "💪",
    simpleDef: "How much heavy weight a rope can pull without breaking!",
    example: "Nylon ropes can hold over 120 kilograms without snapping!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Nylon rope easily lifts heavy weight blocks!"
  },
  "nylon": {
    title: "Nylon (Super Thread)",
    emoji: "🧗",
    simpleDef: "A man-made miracle fibre that is actually stronger than a steel wire!",
    example: "Used in parachutes, mountain climbing ropes, and toothbrush bristles!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Super strong blue nylon climbing rope!"
  },
  "polymer": {
    title: "Polymer (Chain Molecule)",
    emoji: "⛓️",
    simpleDef: "A super long chain made of thousands of tiny pieces connected like train cars!",
    example: "Plastic bottles, nylon ropes, and rubber tyres are all polymers!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Thousands of tiny monomer units linked into strong chains!"
  },
  "monomer": {
    title: "Monomer (Single Bead)",
    emoji: "🧪",
    simpleDef: "One single building block before it links with others to make a long chain.",
    example: "Like one single LEGO brick before you build a tall tower!",
    image: "/images/plastic_insulator_lab.jpg"
  },
  "non-biodegradable": {
    title: "Non-Biodegradable",
    emoji: "⏳",
    simpleDef: "Cannot rot into soil. Soil bacteria cannot eat it, so it lasts for hundreds of years!",
    example: "Plastic bottles buried in dirt stay unchanged for 500+ years!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Synthetic plastic bonds resist bacterial decay for centuries."
  },
  "synthetic": {
    title: "Synthetic (Man-Made)",
    emoji: "🏭",
    simpleDef: "Made by scientists in factories using petroleum chemicals instead of plants.",
    example: "Nylon, polyester, and plastics are all synthetic materials!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Man-made in chemical laboratories!"
  },
  "natural": {
    title: "Natural (From Nature)",
    emoji: "🌳",
    simpleDef: "Grown by nature from living plants, animals, or trees.",
    example: "Cotton from plants, wool from sheep, and silk from silkworms!",
    image: "/images/cotton_plant_fabric.jpg",
    imageCaption: "Grown directly by nature!"
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

              {/* Real Generated Visual Illustration */}
              {info.image && (
                <div className="rounded-2xl overflow-hidden border-2 border-purple-100 shadow-xs bg-purple-50/50">
                  <img
                    src={info.image}
                    alt={info.title}
                    className="w-full h-28 sm:h-32 object-cover"
                  />
                  {info.imageCaption && (
                    <div className="p-2 bg-white/95 text-[10px] sm:text-[11px] font-extrabold text-purple-900 leading-tight">
                      📸 {info.imageCaption}
                    </div>
                  )}
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
