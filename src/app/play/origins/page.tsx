"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VoiceUnlockModal } from "@/components/learning/VoiceUnlockModal";
import { Sparkles, Mic } from "lucide-react";

// === LEARNING LOOP ===
// SEE objects → PREDICT (sort them) → INTERACT (drag) → OBSERVE (results) →
// EXPLAIN (child language) → LEARN THE WORD (natural/synthetic) → REMEMBER

type Phase =
  | "inspect"        // Step 1: What is a material?
  | "sorting"        // Step 2: Sort into Nature vs Factory
  | "feedback"       // Step 3: Show results
  | "concept"        // Step 4: Introduce vocabulary
  | "exam-bridge";   // Step 5: Exam bridge + next

type MaterialItem = {
  id: string;
  name: string;
  emoji: string;
  category: "natural" | "synthetic";
  origin: string;
  madeFrom: string;
};

const MATERIALS: MaterialItem[] = [
  { id: "cotton", name: "Cotton", emoji: "🌿", category: "natural", origin: "Cotton plant", madeFrom: "Plant fibres" },
  { id: "wool", name: "Wool", emoji: "🐑", category: "natural", origin: "Sheep", madeFrom: "Animal hair" },
  { id: "silk", name: "Silk", emoji: "🐛", category: "natural", origin: "Silkworm", madeFrom: "Silkworm cocoon" },
  { id: "wood", name: "Wood", emoji: "🌳", category: "natural", origin: "Trees", madeFrom: "Tree trunk" },
  { id: "rubber_natural", name: "Natural Rubber", emoji: "🌴", category: "natural", origin: "Rubber tree", madeFrom: "Tree sap (latex)" },
  { id: "nylon", name: "Nylon", emoji: "🧵", category: "synthetic", origin: "Factory", madeFrom: "Chemicals from petroleum" },
  { id: "polyester", name: "Polyester", emoji: "👔", category: "synthetic", origin: "Factory", madeFrom: "Chemicals from petroleum" },
  { id: "plastic", name: "Plastic", emoji: "🧴", category: "synthetic", origin: "Factory", madeFrom: "Chemicals from petroleum" },
  { id: "acrylic", name: "Acrylic", emoji: "🧶", category: "synthetic", origin: "Factory", madeFrom: "Chemicals" },
];

const EVERYDAY_OBJECTS = [
  { emoji: "👕", label: "Shirt", material: "Cloth" },
  { emoji: "🧴", label: "Bottle", material: "Plastic" },
  { emoji: "🥄", label: "Spoon", material: "Metal" },
  { emoji: "🪢", label: "Rope", material: "Nylon / Jute" },
  { emoji: "🛞", label: "Tyre", material: "Rubber" },
  { emoji: "🧶", label: "Sweater", material: "Wool / Acrylic" },
  { emoji: "🪵", label: "Wooden toy", material: "Wood" },
];

export default function OriginsPage() {
  const [phase, setPhase] = useState<Phase>("inspect");
  const [inspectedObjects, setInspectedObjects] = useState<Set<string>>(new Set());
  const [natureBin, setNatureBin] = useState<MaterialItem[]>([]);
  const [factoryBin, setFactoryBin] = useState<MaterialItem[]>([]);
  const [unsorted, setUnsorted] = useState<MaterialItem[]>([...MATERIALS]);
  const [currentDrag, setCurrentDrag] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MaterialItem | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const router = useRouter();

  const inspectObject = useCallback((label: string) => {
    setInspectedObjects((prev) => new Set(prev).add(label));
  }, []);

  const allInspected = inspectedObjects.size >= 5; // Need at least 5 to proceed

  // Handle dropping a material into a bin
  const handleDrop = useCallback(
    (bin: "nature" | "factory", item: MaterialItem) => {
      setUnsorted((prev) => prev.filter((m) => m.id !== item.id));
      if (bin === "nature") {
        setNatureBin((prev) => [...prev, item]);
      } else {
        setFactoryBin((prev) => [...prev, item]);
      }
      // Track mistakes
      if (
        (bin === "nature" && item.category !== "natural") ||
        (bin === "factory" && item.category !== "synthetic")
      ) {
        setMistakes((prev) => [...prev, item.id]);
      }
    },
    []
  );

  // Check if all sorted
  const allSorted = unsorted.length === 0;

  // Calculate score
  const correctCount = MATERIALS.length - mistakes.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {/* ========== PHASE 1: INSPECT OBJECTS ========== */}
        {phase === "inspect" && (
          <motion.div
            key="inspect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            {/* Pip intro */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-block text-6xl mb-4"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🔬
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark mb-3">
                What are things made from?
              </h1>
              <div className="speech-bubble mx-auto">
                <p className="text-base text-text-dark">
                  Look at these everyday things. Tap each one to discover
                  what it&apos;s made from!
                </p>
              </div>
            </div>

            {/* Objects on the table */}
            <div className="relative w-full bg-gradient-to-b from-lab-wood-light/15 to-lab-wood/10 rounded-2xl border border-lab-wood/15 p-6 sm:p-8">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                {EVERYDAY_OBJECTS.map((obj) => {
                  const isInspected = inspectedObjects.has(obj.label);
                  return (
                    <motion.button
                      key={obj.label}
                      onClick={() => inspectObject(obj.label)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                        isInspected
                          ? "bg-success/10 border border-success/20"
                          : "bg-white/60 border border-lab-wood/10 hover:border-pip-blue/30 hover:bg-white"
                      }`}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-4xl sm:text-5xl">{obj.emoji}</span>
                      <span className="text-sm font-semibold text-text-dark">
                        {obj.label}
                      </span>
                      <AnimatePresence>
                        {isInspected && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-text-muted bg-lab-chalk px-2 py-0.5 rounded-full"
                          >
                            {obj.material}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Reveal concept */}
            <AnimatePresence>
              {allInspected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <div className="bg-white rounded-xl border border-pip-blue/15 px-6 py-4 mb-6 max-w-md mx-auto">
                    <p className="text-lg font-bold text-pip-blue-dark">
                      A <span className="science-term">material</span> is the
                      stuff we use to make things.
                    </p>
                    <p className="text-sm text-text-muted mt-2">
                      Everything around you is made from some kind of material!
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setPhase("sorting")}
                    className="px-8 py-3 bg-pip-blue text-white font-bold rounded-lg shadow-soft text-lg"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    But where do materials come from? →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ========== PHASE 2: SORTING — Nature vs Factory ========== */}
        {phase === "sorting" && (
          <motion.div
            key="sorting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Pip prompt */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark mb-2">
                Nature or Made by People?
              </h1>
              <div className="speech-bubble mx-auto">
                <p className="text-base">
                  Some materials come from nature. Others are made by people
                  in factories. Can you sort them?
                </p>
              </div>
            </div>

            {/* Sorting area — 60-70% of screen */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-h-[55vh]">
              {/* Nature bin */}
              <motion.div
                onClick={() => {
                  if (selectedItem) {
                    handleDrop("nature", selectedItem);
                    setSelectedItem(null);
                  }
                }}
                className={`drop-zone flex flex-col items-center p-4 cursor-pointer transition-all ${
                  selectedItem ? "ring-2 ring-nature-green ring-offset-2 bg-nature-green/10" : ""
                } ${currentDrag ? "active" : ""}`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🌳</span>
                  <div className="text-left">
                    <h2 className="text-lg font-extrabold text-nature-green-dark">
                      From Nature
                    </h2>
                    <p className="text-[11px] text-text-muted">Plants, Animals, Trees</p>
                  </div>
                </div>

                {selectedItem && (
                  <div className="mb-2 text-xs font-bold text-nature-green bg-white px-3 py-1 rounded-full border border-nature-green/30 animate-pulse">
                    Tap to put &ldquo;{selectedItem.name}&rdquo; here! 🌿
                  </div>
                )}

                <div className="flex-1 w-full bg-white/60 rounded-xl p-3 min-h-[140px] border border-nature-green/20">
                  <div className="flex flex-wrap gap-2">
                    {natureBin.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs ${
                          item.category === "natural"
                            ? "bg-nature-green/15 text-nature-green-dark border border-nature-green/30"
                            : "bg-fire-red/10 text-fire-red border border-fire-red/20"
                        }`}
                      >
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.name}</span>
                        {item.category === "natural" ? (
                          <span className="text-nature-green">✓</span>
                        ) : (
                          <span className="text-fire-red">✗</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Unsorted items — center */}
              <div className="flex flex-col items-center">
                <div className="text-center mb-3">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-text-muted">
                    {unsorted.length > 0 ? "Tap an item, drag, or choose a bin 👇" : "All Sorted! 🎉"}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3.5 w-full">
                  {unsorted.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        drag
                        dragSnapToOrigin={true}
                        onDragStart={() => {
                          setCurrentDrag(item.id);
                          setSelectedItem(item);
                        }}
                        onDragEnd={(_e, info) => {
                          setCurrentDrag(null);
                          if (info.offset.x < -60) {
                            handleDrop("nature", item);
                            setSelectedItem(null);
                          } else if (info.offset.x > 60) {
                            handleDrop("factory", item);
                            setSelectedItem(null);
                          }
                        }}
                        onClick={() => {
                          setSelectedItem(isSelected ? null : item);
                        }}
                        className={`relative group flex flex-col items-center p-3 rounded-2xl bg-white border-2 transition-all shadow-soft cursor-grab active:cursor-grabbing select-none ${
                          isSelected
                            ? "border-pip-blue ring-4 ring-pip-blue/20 scale-105"
                            : "border-lab-wood/25 hover:border-pip-blue/40"
                        }`}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        layout
                      >
                        <span className="text-4xl mb-1">{item.emoji}</span>
                        <span className="text-xs font-bold text-text-dark text-center">
                          {item.name}
                        </span>

                        {/* Quick Sort Direct Action Buttons */}
                        <div className="mt-2 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDrop("nature", item);
                              setSelectedItem(null);
                            }}
                            className="px-2 py-1 bg-nature-green/10 hover:bg-nature-green text-nature-green-dark hover:text-white rounded-lg text-[10px] font-extrabold transition-colors border border-nature-green/30"
                            title="Sort into Nature"
                          >
                            🌳 Nature
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDrop("factory", item);
                              setSelectedItem(null);
                            }}
                            className="px-2 py-1 bg-factory-orange/10 hover:bg-factory-orange text-factory-orange-dark hover:text-white rounded-lg text-[10px] font-extrabold transition-colors border border-factory-orange/30"
                            title="Sort into Factory"
                          >
                            🏭 Factory
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                  {unsorted.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <span className="text-5xl block mb-2">🎉</span>
                      <p className="text-base font-extrabold text-text-dark">
                        Awesome! All items sorted!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Factory bin */}
              <motion.div
                onClick={() => {
                  if (selectedItem) {
                    handleDrop("factory", selectedItem);
                    setSelectedItem(null);
                  }
                }}
                className={`drop-zone flex flex-col items-center p-4 cursor-pointer transition-all ${
                  selectedItem ? "ring-2 ring-factory-orange ring-offset-2 bg-factory-orange/10" : ""
                } ${currentDrag ? "active" : ""}`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🏭</span>
                  <div className="text-left">
                    <h2 className="text-lg font-extrabold text-factory-orange-dark">
                      Made by People
                    </h2>
                    <p className="text-[11px] text-text-muted">Factories, Chemicals, Polymers</p>
                  </div>
                </div>

                {selectedItem && (
                  <div className="mb-2 text-xs font-bold text-factory-orange bg-white px-3 py-1 rounded-full border border-factory-orange/30 animate-pulse">
                    Tap to put &ldquo;{selectedItem.name}&rdquo; here! ⚙️
                  </div>
                )}

                <div className="flex-1 w-full bg-white/60 rounded-xl p-3 min-h-[140px] border border-factory-orange/20">
                  <div className="flex flex-wrap gap-2">
                    {factoryBin.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs ${
                          item.category === "synthetic"
                            ? "bg-factory-orange/15 text-factory-orange-dark border border-factory-orange/30"
                            : "bg-fire-red/10 text-fire-red border border-fire-red/20"
                        }`}
                      >
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.name}</span>
                        {item.category === "synthetic" ? (
                          <span className="text-factory-orange">✓</span>
                        ) : (
                          <span className="text-fire-red">✗</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Check results */}
            {allSorted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <p className="text-lg font-semibold text-text-dark mb-4">
                  {correctCount === MATERIALS.length
                    ? "Perfect! You sorted them all correctly! 🎉"
                    : `You got ${correctCount} out of ${MATERIALS.length} right!`}
                </p>
                {mistakes.length > 0 && (
                  <p className="text-sm text-text-muted mb-4">
                    Don&apos;t worry — let&apos;s learn which ones tricked you.
                  </p>
                )}
                <motion.button
                  onClick={() => setPhase("concept")}
                  className="px-8 py-3 bg-pip-blue text-white font-bold rounded-lg shadow-soft text-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discover the secret →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ========== PHASE 3: CONCEPT — Natural vs Synthetic ========== */}
        {phase === "concept" && (
          <motion.div
            key="concept"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark text-center mb-8">
              The Two Kinds of Materials
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Natural */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-nature-green/8 border border-nature-green/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🌳</span>
                  <div>
                    <h2 className="text-xl font-bold text-nature-green-dark">
                      Natural Material
                    </h2>
                    <p className="text-sm text-text-muted">
                      Comes from nature
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {MATERIALS.filter((m) => m.category === "natural").map(
                    (m) => (
                      <div
                        key={m.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span>{m.emoji}</span>
                        <span className="font-medium text-text-dark">
                          {m.name}
                        </span>
                        <span className="text-text-light">— {m.origin}</span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              {/* Synthetic */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-factory-orange/8 border border-factory-orange/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🏭</span>
                  <div>
                    <h2 className="text-xl font-bold text-factory-orange-dark">
                      Synthetic Material
                    </h2>
                    <p className="text-sm text-text-muted">
                      Made by people using chemicals
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {MATERIALS.filter((m) => m.category === "synthetic").map(
                    (m) => (
                      <div
                        key={m.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span>{m.emoji}</span>
                        <span className="font-medium text-text-dark">
                          {m.name}
                        </span>
                        <span className="text-text-light">— {m.madeFrom}</span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>

            {/* Key insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-pip-blue/15 p-5 text-center mb-6"
            >
              <p className="text-base text-text-dark mb-2">
                <strong>Natural materials</strong> are found in nature — from
                plants, animals, and the earth.
              </p>
              <p className="text-base text-text-dark">
                <strong>Synthetic materials</strong> are made by people in
                factories, usually from chemicals found in petroleum (crude oil).
              </p>
            </motion.div>

            <div className="text-center">
              <motion.button
                onClick={() => setPhase("exam-bridge")}
                className="px-8 py-3 bg-pip-blue text-white font-bold rounded-lg shadow-soft text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                See the science words →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ========== PHASE 4: EXAM BRIDGE ========== */}
        {phase === "exam-bridge" && (
          <motion.div
            key="exam-bridge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto"
          >
            <h1 className="text-2xl font-extrabold text-text-dark text-center mb-8">
              Say it Like a Scientist
            </h1>

            {/* Exam bridge items */}
            <div className="space-y-6 mb-10">
              <div className="exam-bridge">
                <p className="child-said">
                  You said: &quot;It comes from nature&quot;
                </p>
                <p className="scientist-says">
                  Scientists say:{" "}
                  <span className="science-term">Natural material</span>
                </p>
                <p className="exam-answer">
                  Natural materials are obtained directly from plants and
                  animals. Examples include cotton, wool, silk, and natural
                  rubber.
                </p>
              </div>

              <div className="exam-bridge">
                <p className="child-said">
                  You said: &quot;People made it in a factory&quot;
                </p>
                <p className="scientist-says">
                  Scientists say:{" "}
                  <span className="science-term">Synthetic material</span>
                </p>
                <p className="exam-answer">
                  Synthetic materials are man-made materials prepared by
                  processing chemicals derived from petroleum. Examples include
                  nylon, polyester, acrylic, and plastic.
                </p>
              </div>

              <div className="exam-bridge">
                <p className="child-said">
                  You said: &quot;These things are made from stuff&quot;
                </p>
                <p className="scientist-says">
                  Scientists say:{" "}
                  <span className="science-term">Material</span>
                </p>
                <p className="exam-answer">
                  A material is a substance or mixture of substances that
                  constitutes an object. Materials can be natural or synthetic.
                </p>
              </div>
            </div>

            {/* Navigation & Magic Voice Unlock */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/play"
                className="text-text-muted hover:text-text-dark transition-colors font-medium text-sm"
              >
                ← Back to Map
              </Link>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowVoiceModal(true)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-hint-yellow via-factory-orange-light to-pip-blue text-text-dark font-extrabold shadow-soft hover:shadow-medium transition-all flex items-center gap-2 text-sm animate-pulse"
                >
                  <Mic size={16} />
                  <span>Say &ldquo;NATURAL&rdquo; to Unlock 🪄</span>
                </button>

                <Link
                  href="/play/fibres"
                  className="px-6 py-3 bg-pip-blue text-white font-bold rounded-xl shadow-soft hover:bg-pip-blue-dark transition-colors text-sm"
                >
                  Next: Fibres →
                </Link>
              </div>
            </div>

            <VoiceUnlockModal
              isOpen={showVoiceModal}
              targetWord="NATURAL"
              wordMeaning="Comes directly from plants and animals!"
              nextRoute="/play/fibres"
              onSuccess={() => {
                setShowVoiceModal(false);
                router.push("/play/fibres");
              }}
              onClose={() => setShowVoiceModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
