"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles, HelpCircle } from "lucide-react";
import { speak, playPopSound } from "@/lib/audio-manager";

// Dictionary of child-friendly scientific and descriptive definitions
export const KID_DICTIONARY: Record<string, { title: string; emoji: string; simpleDef: string; example: string }> = {
  "insulator": {
    title: "Insulator",
    emoji: "🛡️",
    simpleDef: "A material that blocks electricity or heat from passing through it.",
    example: "Plastic coating around electrical wires protects your hands from getting shocked!"
  },
  "insulators": {
    title: "Insulators",
    emoji: "🛡️",
    simpleDef: "Materials that block heat or electricity from flowing through them.",
    example: "Plastic kettle handles stay cool so you can touch them safely!"
  },
  "heat insulator": {
    title: "Heat Insulator",
    emoji: "🧤",
    simpleDef: "A material that does not let heat travel through it easily.",
    example: "Wooden or plastic spoon handles stay cool in hot soup!"
  },
  "electrical insulator": {
    title: "Electrical Insulator",
    emoji: "🔌",
    simpleDef: "A material that does not allow electric current to pass through it.",
    example: "Rubber and plastic coated wires prevent dangerous electric shocks!"
  },
  "conductor": {
    title: "Conductor",
    emoji: "⚡",
    simpleDef: "A material that lets heat or electricity flow through it very quickly.",
    example: "Metals like copper and iron are great conductors!"
  },
  "breathable": {
    title: "Breathable Cloth",
    emoji: "🌬️",
    simpleDef: "Having tiny microscopic holes that let fresh air and sweat pass through so you stay cool.",
    example: "Cotton T-shirts let your skin breathe during hot summer days!"
  },
  "wrinkle-free": {
    title: "Wrinkle-Free (Resilient)",
    emoji: "👔",
    simpleDef: "Bounces back to its smooth original shape after being bent, without leaving crease marks.",
    example: "Polyester sportswear hardly ever needs ironing!"
  },
  "wrinkle-resistant": {
    title: "Wrinkle-Resistant",
    emoji: "👔",
    simpleDef: "Fibres that resist folding and quickly spring back into smooth shape.",
    example: "Polyester dresses stay crisp all day long!"
  },
  "tensile strength": {
    title: "Tensile Strength",
    emoji: "💪",
    simpleDef: "How much pulling weight or tension a rope/thread can hold before it snaps.",
    example: "Nylon has super high tensile strength, holding over 120kg in parachutes!"
  },
  "polymer": {
    title: "Polymer",
    emoji: "⛓️",
    simpleDef: "A giant molecule made of thousands of small chemical units linked together like beads on a necklace.",
    example: "Nylon, polyester, and plastic bottles are all synthetic polymers!"
  },
  "monomer": {
    title: "Monomer",
    emoji: "🧪",
    simpleDef: "A single small chemical building block that joins with others to make a polymer chain.",
    example: "One single bead before it is strung into a necklace!"
  },
  "non-biodegradable": {
    title: "Non-Biodegradable",
    emoji: "⏳",
    simpleDef: "Cannot be eaten, decomposed, or broken down by soil bacteria and natural processes.",
    example: "Plastic bottles stay unchanged underground for hundreds of years!"
  },
  "biodegradable": {
    title: "Biodegradable",
    emoji: "🌱",
    simpleDef: "Can be naturally eaten and rotted down into nutrient soil by bacteria and fungi.",
    example: "Banana peels and cotton cloth break down into soil in a few months!"
  },
  "synthetic": {
    title: "Synthetic Material",
    emoji: "🏭",
    simpleDef: "Man-made material created by scientists in factories using chemicals from petroleum.",
    example: "Nylon, polyester, acrylic, and plastics are all synthetic!"
  },
  "natural": {
    title: "Natural Material",
    emoji: "🌳",
    simpleDef: "Obtained directly from nature — from plants, animals, or trees.",
    example: "Cotton from plants, wool from sheep, and silk from caterpillars!"
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
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-b-2 border-dashed border-indigo-400 font-extrabold cursor-help transition-colors text-inherit ${className}`}
      >
        <span>{displayText || term}</span>
        <span className="text-[10px] text-indigo-500 opacity-70">💡</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 sm:w-80 bg-white rounded-2xl p-4 shadow-warm border-2 border-indigo-200 text-left cursor-default pointer-events-auto"
          >
            {/* Tooltip Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-indigo-200 rotate-45" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{info.emoji}</span>
                  <h4 className="font-extrabold text-sm text-indigo-950">
                    {info.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
                  title="Listen to Definition 🗣️"
                >
                  <Volume2 size={14} />
                </button>
              </div>

              <p className="text-xs text-text-dark font-medium leading-relaxed">
                {info.simpleDef}
              </p>

              <div className="bg-indigo-50/60 rounded-xl p-2 text-[11px] text-indigo-900 leading-snug">
                <span className="font-bold">Real-world example: </span>
                <span>{info.example}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
