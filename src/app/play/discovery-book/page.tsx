"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// The Discovery Book — a collection of visual specimens for each material/concept
// This is a memory aid, not a dashboard

type Specimen = {
  id: string;
  name: string;
  emoji: string;
  type: "natural" | "synthetic" | "concept";
  superpower: string;
  properties: string[];
  usedIn: { name: string; emoji: string }[];
  scienceTerm: string;
  color: string;
  borderColor: string;
};

const SPECIMENS: Specimen[] = [
  {
    id: "cotton",
    name: "Cotton",
    emoji: "🌿",
    type: "natural",
    superpower: "Breathable & absorbs sweat",
    properties: ["Natural fibre", "From cotton plant", "Absorbs water", "Safe near fire"],
    usedIn: [
      { name: "T-shirts", emoji: "👕" },
      { name: "Towels", emoji: "🛁" },
      { name: "Bedsheets", emoji: "🛏️" },
    ],
    scienceTerm: "Natural fibre",
    color: "bg-nature-green/8",
    borderColor: "border-nature-green/20",
  },
  {
    id: "nylon",
    name: "Nylon",
    emoji: "🧵",
    type: "synthetic",
    superpower: "Super strong & lightweight",
    properties: ["Synthetic fibre", "Very high tensile strength", "Lightweight", "Water-resistant"],
    usedIn: [
      { name: "Parachutes", emoji: "🪂" },
      { name: "Toothbrushes", emoji: "🪥" },
      { name: "Ropes", emoji: "🪢" },
    ],
    scienceTerm: "Synthetic fibre — Nylon",
    color: "bg-pip-blue/8",
    borderColor: "border-pip-blue/20",
  },
  {
    id: "polyester",
    name: "Polyester",
    emoji: "👔",
    type: "synthetic",
    superpower: "Wrinkle-free & quick-drying",
    properties: ["Synthetic fibre", "Water-resistant", "Wrinkle-resistant", "Quick-drying"],
    usedIn: [
      { name: "Raincoats", emoji: "🧥" },
      { name: "Sportswear", emoji: "🏃" },
      { name: "Curtains", emoji: "🪟" },
    ],
    scienceTerm: "Synthetic fibre — Polyester (PET)",
    color: "bg-factory-orange/8",
    borderColor: "border-factory-orange/20",
  },
  {
    id: "acrylic",
    name: "Acrylic",
    emoji: "🧶",
    type: "synthetic",
    superpower: "Warm like wool, resists moths",
    properties: ["Synthetic fibre", "Wool-like warmth", "Moth-resistant", "Affordable"],
    usedIn: [
      { name: "Sweaters", emoji: "🧥" },
      { name: "Blankets", emoji: "🛏️" },
      { name: "Carpets", emoji: "🏠" },
    ],
    scienceTerm: "Synthetic fibre — Acrylic",
    color: "bg-hint-yellow/12",
    borderColor: "border-hint-yellow/30",
  },
  {
    id: "rayon",
    name: "Rayon",
    emoji: "✨",
    type: "synthetic",
    superpower: "Silky from wood",
    properties: ["Semi-synthetic", "From wood cellulose", "Shiny texture", "Soft drape"],
    usedIn: [
      { name: "Dresses", emoji: "👗" },
      { name: "Bedsheets", emoji: "🛏️" },
      { name: "Curtains", emoji: "🪟" },
    ],
    scienceTerm: "Regenerated fibre — Rayon / Viscose",
    color: "bg-water-blue/8",
    borderColor: "border-water-blue/20",
  },
  {
    id: "plastic",
    name: "Plastic",
    emoji: "🧴",
    type: "synthetic",
    superpower: "Shapeable & insulating",
    properties: ["Synthetic material", "Lightweight", "Electrical insulator", "Heat insulator", "Non-biodegradable"],
    usedIn: [
      { name: "Bottles", emoji: "🧴" },
      { name: "Wire coating", emoji: "🔌" },
      { name: "Kettle handles", emoji: "☕" },
    ],
    scienceTerm: "Synthetic polymer — Plastic",
    color: "bg-fire-red/6",
    borderColor: "border-fire-red/15",
  },
  {
    id: "electrical_insulator",
    name: "Electrical Insulator",
    emoji: "⚡",
    type: "concept",
    superpower: "Stops electricity passing through",
    properties: ["Poor conductor of electricity", "Used to coat wires", "Keeps people safe"],
    usedIn: [
      { name: "Wire coating", emoji: "🔌" },
      { name: "Switchboards", emoji: "🔲" },
      { name: "Plug covers", emoji: "🔌" },
    ],
    scienceTerm: "Electrical insulator / Poor conductor of electricity",
    color: "bg-hint-yellow/10",
    borderColor: "border-hint-yellow/25",
  },
  {
    id: "heat_insulator",
    name: "Heat Insulator",
    emoji: "☕",
    type: "concept",
    superpower: "Stops heat passing through",
    properties: ["Poor conductor of heat", "Used for handles", "Protects from burns"],
    usedIn: [
      { name: "Kettle handles", emoji: "☕" },
      { name: "Pan handles", emoji: "🍳" },
      { name: "Oven mitts", emoji: "🧤" },
    ],
    scienceTerm: "Heat insulator / Poor conductor of heat",
    color: "bg-factory-orange/8",
    borderColor: "border-factory-orange/15",
  },
];

export default function DiscoveryBookPage() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<string | null>(null);
  const selected = SPECIMENS.find((s) => s.id === selectedSpecimen);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Book header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="text-5xl mb-3 block">📖</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark mb-2">
          My Discovery Book
        </h1>
        <p className="text-text-muted">
          Everything you&apos;ve discovered about materials
        </p>
      </motion.div>

      {/* Specimens grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {SPECIMENS.map((specimen, i) => (
          <motion.button
            key={specimen.id}
            onClick={() =>
              setSelectedSpecimen(
                selectedSpecimen === specimen.id ? null : specimen.id
              )
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
              selectedSpecimen === specimen.id
                ? `${specimen.color} ${specimen.borderColor} shadow-medium`
                : `bg-white ${specimen.borderColor} hover:shadow-soft`
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-4xl">{specimen.emoji}</span>
            <span className="text-sm font-bold text-text-dark">
              {specimen.name}
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                specimen.type === "natural"
                  ? "bg-nature-green/10 text-nature-green"
                  : specimen.type === "synthetic"
                  ? "bg-factory-orange/10 text-factory-orange"
                  : "bg-pip-blue/10 text-pip-blue"
              }`}
            >
              {specimen.type}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected specimen detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className={`${selected.color} border ${selected.borderColor} rounded-2xl p-6 sm:p-8 mb-8 overflow-hidden`}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Left: identity */}
              <div className="flex flex-col items-center sm:items-start gap-2 min-w-[140px]">
                <span className="text-6xl">{selected.emoji}</span>
                <h2 className="text-2xl font-extrabold text-text-dark">
                  {selected.name}
                </h2>
                <p className="text-sm font-semibold text-pip-blue">
                  {selected.superpower}
                </p>
              </div>

              {/* Right: details */}
              <div className="flex-1 space-y-4">
                {/* Properties */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Properties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.properties.map((prop) => (
                      <span
                        key={prop}
                        className="px-3 py-1 bg-white/80 rounded-lg text-sm font-medium text-text-dark border border-lab-wood/10"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Used in */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Used In
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selected.usedIn.map((use) => (
                      <div
                        key={use.name}
                        className="flex items-center gap-1.5 text-sm"
                      >
                        <span>{use.emoji}</span>
                        <span className="font-medium text-text-dark">
                          {use.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Science term */}
                <div className="pt-2 border-t border-lab-wood/10">
                  <p className="text-xs text-text-muted mb-1">
                    Scientists call it:
                  </p>
                  <p className="font-bold text-pip-blue-dark text-lg">
                    {selected.scienceTerm}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/play"
          className="px-6 py-3 bg-white text-text-dark font-semibold rounded-lg border border-lab-wood/20 hover:border-lab-wood/40 transition-colors"
        >
          ← Back to Map
        </Link>
      </div>
    </div>
  );
}
