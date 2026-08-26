"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles, HelpCircle, Eye } from "lucide-react";
import { speak, playPopSound } from "@/lib/audio-manager";

// Dictionary of child-friendly scientific definitions with real generated illustrations
export const KID_DICTIONARY: Record<string, { 
  title: string; 
  emoji: string; 
  simpleDef: string; 
  example: string;
  image?: string;
  imageCaption?: string;
}> = {
  "insulator": {
    title: "Insulator",
    emoji: "🛡️",
    simpleDef: "A material that blocks electricity or heat from passing through it.",
    example: "Plastic coating around electrical wires protects your hands from getting shocked!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Blue plastic coating blocks electric current & keeps pan handle cool!"
  },
  "insulators": {
    title: "Insulators",
    emoji: "🛡️",
    simpleDef: "Materials that block heat or electricity from flowing through them.",
    example: "Plastic kettle handles stay cool so you can touch them safely!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Insulators prevent dangerous shocks and burns!"
  },
  "heat insulator": {
    title: "Heat Insulator",
    emoji: "🧤",
    simpleDef: "A material that does not let heat travel through it easily.",
    example: "Wooden or plastic spoon handles stay cool in boiling soup!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Cool black plastic handle on hot pan!"
  },
  "electrical insulator": {
    title: "Electrical Insulator",
    emoji: "🔌",
    simpleDef: "A material that does not allow electric current to pass through it.",
    example: "Rubber and plastic coated wires prevent dangerous electric shocks!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Plastic coating traps electricity safely inside the wire!"
  },
  "conductor": {
    title: "Conductor",
    emoji: "⚡",
    simpleDef: "A material that lets heat or electricity flow through it very quickly.",
    example: "Metals like copper and iron are great conductors!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Copper metal inside wire conducts electricity fast!"
  },
  "breathable": {
    title: "Breathable Cloth",
    emoji: "🌬️",
    simpleDef: "Having tiny microscopic holes that let fresh air and sweat pass through so you stay cool.",
    example: "Cotton T-shirts let your skin breathe during hot summer days!",
    image: "/images/cotton_plant_fabric.jpg",
    imageCaption: "Natural cotton plant fibres have hollow air pores!"
  },
  "cotton": {
    title: "Natural Cotton",
    emoji: "🌿",
    simpleDef: "A natural plant fibre harvested from cotton bolls.",
    example: "Used for soft breathable shirts, bedsheets, and towels!",
    image: "/images/cotton_plant_fabric.jpg",
    imageCaption: "Fluffy cotton plant grown by nature!"
  },
  "wrinkle-free": {
    title: "Wrinkle-Free Cloth",
    emoji: "👔",
    simpleDef: "Bounces back to its smooth original shape after being bent, without leaving crease marks.",
    example: "Polyester sportswear hardly ever needs ironing!",
    image: "/images/wrinkle_vs_smooth.jpg",
    imageCaption: "Messy wrinkled shirt (Left) vs Smooth wrinkle-free shirt (Right)!"
  },
  "wrinkle-resistant": {
    title: "Wrinkle-Resistant (Resilient)",
    emoji: "👔",
    simpleDef: "Synthetic fibres that resist folding and quickly spring back into smooth shape.",
    example: "Polyester dresses stay crisp and flat all day long without wrinkles!",
    image: "/images/wrinkle_vs_smooth.jpg",
    imageCaption: "Messy wrinkled cloth ❌ vs Smooth crisp polyester ✅!"
  },
  "tensile strength": {
    title: "Tensile Strength",
    emoji: "💪",
    simpleDef: "How much pulling weight or tension a rope/thread can hold before it snaps.",
    example: "Nylon has super high tensile strength, holding over 120kg in parachutes!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Nylon rope easily lifts heavy weight blocks!"
  },
  "nylon": {
    title: "Synthetic Nylon",
    emoji: "🧗",
    simpleDef: "A miracle man-made polymer fibre that is stronger than steel wire of the same thickness.",
    example: "Used for rock-climbing ropes, parachutes, and toothbrush bristles!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Super strong blue nylon climbing rope!"
  },
  "polymer": {
    title: "Polymer",
    emoji: "⛓️",
    simpleDef: "A giant molecule made of thousands of small chemical units linked together like beads on a necklace.",
    example: "Nylon, polyester, and plastic bottles are all synthetic polymers!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Thousands of monomer units linked into strong chains!"
  },
  "monomer": {
    title: "Monomer",
    emoji: "🧪",
    simpleDef: "A single small chemical building block that joins with others to make a polymer chain.",
    example: "One single bead before it is strung into a necklace!",
    image: "/images/plastic_insulator_lab.jpg"
  },
  "non-biodegradable": {
    title: "Non-Biodegradable",
    emoji: "⏳",
    simpleDef: "Cannot be eaten, decomposed, or broken down by soil bacteria and natural processes.",
    example: "Plastic bottles stay unchanged underground for hundreds of years!",
    image: "/images/plastic_insulator_lab.jpg",
    imageCaption: "Synthetic plastic bonds resist bacterial decay for centuries."
  },
  "synthetic": {
    title: "Synthetic Material",
    emoji: "🏭",
    simpleDef: "Man-made material created by scientists in factories using chemicals from petroleum.",
    example: "Nylon, polyester, acrylic, and plastics are all synthetic!",
    image: "/images/nylon_climbing_rope.jpg",
    imageCaption: "Man-made in chemical laboratories!"
  },
  "natural": {
    title: "Natural Material",
    emoji: "🌳",
    simpleDef: "Obtained directly from nature — from plants, animals, or trees.",
    example: "Cotton from plants, wool from sheep, and silk from caterpillars!",
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
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-76 sm:w-88 bg-white rounded-3xl p-4 sm:p-5 shadow-warm border-2 border-purple-200 text-left cursor-default pointer-events-auto"
          >
            {/* Tooltip Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-purple-200 rotate-45" />

            <div className="relative z-10 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{info.emoji}</span>
                  <h4 className="font-black text-sm sm:text-base text-purple-950">
                    {info.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors flex items-center gap-1 text-[11px] font-bold"
                  title="Listen to Definition 🗣️"
                >
                  <Volume2 size={14} />
                  <span>Listen</span>
                </button>
              </div>

              {/* Real Generated Visual Illustration */}
              {info.image && (
                <div className="rounded-2xl overflow-hidden border-2 border-purple-100 shadow-xs bg-purple-50/50">
                  <img
                    src={info.image}
                    alt={info.title}
                    className="w-full h-32 sm:h-36 object-cover"
                  />
                  {info.imageCaption && (
                    <div className="p-2 bg-white/95 text-[10px] sm:text-[11px] font-extrabold text-purple-900 leading-tight">
                      📸 {info.imageCaption}
                    </div>
                  )}
                </div>
              )}

              {/* Definition */}
              <p className="text-xs text-text-dark font-medium leading-relaxed">
                {info.simpleDef}
              </p>

              {/* Real-world example */}
              <div className="bg-purple-50/70 rounded-2xl p-2.5 text-[11px] text-purple-900 leading-snug">
                <span className="font-bold">Real-World Example: </span>
                <span>{info.example}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
