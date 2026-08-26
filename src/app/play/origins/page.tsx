'use client';

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logChildAttempt } from "@/lib/learning-engine";
import { 
  playDiscoverySound, 
  playSuccessSound, 
  playWarningSound, 
  playPopSound, 
  playClickSound, 
  speak 
} from "@/lib/audio-manager";
import { KidTermTooltip } from "@/components/learning/KidTermTooltip";
import { VoiceUnlockModal } from "@/components/learning/VoiceUnlockModal";
import { SentenceVoiceReader } from "@/components/learning/SentenceVoiceReader";
import { LottieAnimation, LottiePreset } from "@/components/lottie/LottieAnimation";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

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
  lottiePreset: LottiePreset;
};

const MATERIALS: MaterialItem[] = [
  { id: "cotton", name: "Cotton", emoji: "🌿", category: "natural", origin: "Cotton plant", madeFrom: "Plant fibres", lottiePreset: "plant" },
  { id: "wool", name: "Wool", emoji: "🐑", category: "natural", origin: "Sheep", madeFrom: "Animal fleece", lottiePreset: "wool" },
  { id: "silk", name: "Silk", emoji: "🐛", category: "natural", origin: "Silkworm", madeFrom: "Silkworm cocoon", lottiePreset: "silk" },
  { id: "wood", name: "Wood", emoji: "🪵", category: "natural", origin: "Trees", madeFrom: "Tree trunk", lottiePreset: "rubber_tree" },
  { id: "rubber_natural", name: "Natural Rubber", emoji: "🌴", category: "natural", origin: "Rubber tree", madeFrom: "Tree sap (latex)", lottiePreset: "rubber_tree" },
  { id: "nylon", name: "Nylon", emoji: "🧵", category: "synthetic", origin: "Factory", madeFrom: "Petroleum chemicals", lottiePreset: "rope" },
  { id: "polyester", name: "Polyester", emoji: "👔", category: "synthetic", origin: "Factory", madeFrom: "Petroleum chemicals", lottiePreset: "jacket" },
  { id: "plastic", name: "Plastic", emoji: "🧴", category: "synthetic", origin: "Factory", madeFrom: "Petroleum polymers", lottiePreset: "bottle" },
  { id: "acrylic", name: "Acrylic", emoji: "🧶", category: "synthetic", origin: "Factory", madeFrom: "Synthetic wool chemicals", lottiePreset: "wool" },
];

function shuffleMaterials(items: MaterialItem[]): MaterialItem[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const EVERYDAY_OBJECTS = [
  { emoji: "👕", label: "Shirt", material: "Cloth (Cotton/Polyester)" },
  { emoji: "🧴", label: "Bottle", material: "Plastic" },
  { emoji: "🥄", label: "Spoon", material: "Metal (Stainless Steel)" },
  { emoji: "🪢", label: "Rope", material: "Nylon / Jute" },
  { emoji: "🛞", label: "Tyre", material: "Synthetic Rubber" },
  { emoji: "🧶", label: "Sweater", material: "Wool / Acrylic" },
  { emoji: "🪵", label: "Wooden toy", material: "Wood" },
];

export default function OriginsPage() {
  const [phase, setPhase] = useState<Phase>("inspect");
  const [inspectedObjects, setInspectedObjects] = useState<Set<string>>(new Set());
  const [natureBin, setNatureBin] = useState<MaterialItem[]>([]);
  const [factoryBin, setFactoryBin] = useState<MaterialItem[]>([]);
  const [unsorted, setUnsorted] = useState<MaterialItem[]>(() => shuffleMaterials(MATERIALS));
  const [currentDrag, setCurrentDrag] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MaterialItem | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const router = useRouter();

  // Load saved phase on refresh
  useEffect(() => {
    try {
      const savedPhase = sessionStorage.getItem("polyquest-origins-phase");
      if (savedPhase && ["inspect", "sorting", "concept", "exam-bridge"].includes(savedPhase)) {
        setPhase(savedPhase as Phase);
      }
    } catch {}
  }, []);

  const changePhase = (nextPhase: Phase) => {
    playClickSound();
    setPhase(nextPhase);
    try {
      sessionStorage.setItem("polyquest-origins-phase", nextPhase);
    } catch {}
  };

  const goBackStep = () => {
    playClickSound();
    if (phase === "sorting") changePhase("inspect");
    else if (phase === "concept") changePhase("sorting");
    else if (phase === "exam-bridge") changePhase("concept");
  };

  const resetSorting = () => {
    playPopSound();
    setNatureBin([]);
    setFactoryBin([]);
    setUnsorted(shuffleMaterials(MATERIALS));
    setSelectedItem(null);
    setMistakes([]);
    speak("Sorting board reset! Let's sort natural vs synthetic materials!");
  };

  const inspectObject = useCallback((label: string) => {
    setInspectedObjects((prev) => new Set(prev).add(label));
  }, []);

  const allInspected = inspectedObjects.size >= 5;

  const handleDrop = useCallback(
    (bin: "nature" | "factory", item: MaterialItem) => {
      const isCorrect = 
        (bin === "nature" && item.category === "natural") ||
        (bin === "factory" && item.category === "synthetic");

      setUnsorted((prev) => prev.filter((m) => m.id !== item.id));
      if (bin === "nature") {
        setNatureBin((prev) => [...prev, item]);
      } else {
        setFactoryBin((prev) => [...prev, item]);
      }

      if (isCorrect) {
        playDiscoverySound();
        const reason = bin === "nature" 
          ? `Spot on! ${item.name} comes from ${item.origin} in nature!` 
          : `Correct! ${item.name} is a synthetic material made from chemicals!`;
        speak(reason);
        logChildAttempt(
          item.category === "natural" ? "natural_material" : "synthetic_material",
          true,
          `Correctly sorted ${item.name} into ${bin === "nature" ? "From Nature" : "Made by People"}`,
          "origins"
        );
      } else {
        playWarningSound();
        const hint = bin === "nature"
          ? `Oops! ${item.name} doesn't grow in nature — it is man-made in a factory!`
          : `Not quite! ${item.name} comes from ${item.origin} in nature!`;
        speak(hint);
        setMistakes((prev) => [...prev, item.name]);
        logChildAttempt(
          item.category === "natural" ? "natural_material" : "synthetic_material",
          false,
          `Misplaced ${item.name} into ${bin === "nature" ? "From Nature" : "Made by People"}`,
          "origins"
        );
      }
    },
    []
  );

  const allSorted = unsorted.length === 0;
  const correctCount =
    natureBin.filter((m) => m.category === "natural").length +
    factoryBin.filter((m) => m.category === "synthetic").length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 font-nunito">
      <AnimatePresence mode="wait">
        
        {/* ============================================================
            PHASE 1: INSPECT EVERYDAY OBJECTS
            ============================================================ */}
        {phase === "inspect" && (
          <motion.div
            key="inspect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-8">
              <span className="text-5xl block mb-2 animate-bounce">🔬</span>
              <h1 className="text-2xl sm:text-3xl font-black text-text-dark mb-2">
                What are things made from?
              </h1>
              <div className="speech-bubble mx-auto max-w-xl">
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;Tap at least 5 objects on my workbench to discover their secret ingredients!&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border-2 border-lab-wood/25 p-6 sm:p-8 w-full shadow-warm mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-text-muted">
                  Workbench Specimens ({inspectedObjects.size} of {EVERYDAY_OBJECTS.length} Inspected)
                </span>
                <span className="text-xs font-black text-pip-blue bg-pip-blue/10 px-3 py-1 rounded-full">
                  Step 1: Curiosity Inspection
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {EVERYDAY_OBJECTS.map((obj) => {
                  const isInspected = inspectedObjects.has(obj.label);
                  return (
                    <motion.button
                      key={obj.label}
                      type="button"
                      onClick={() => {
                        inspectObject(obj.label);
                        playPopSound();
                        speak(`${obj.label} is made from ${obj.material}!`);
                      }}
                      className={`p-5 rounded-3xl border-2 flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                        isInspected
                          ? "border-nature-green bg-emerald-50/60 shadow-soft scale-102"
                          : "border-lab-wood/20 bg-lab-chalk/50 hover:border-pip-blue/50 hover:bg-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-4xl">{obj.emoji}</span>
                      <span className="font-extrabold text-sm text-text-dark">{obj.label}</span>
                      {isInspected ? (
                        <span className="text-[11px] font-black text-nature-green-dark bg-white px-2.5 py-0.5 rounded-full border border-nature-green/30 shadow-xs">
                          {obj.material} ✓
                        </span>
                      ) : (
                        <span className="text-[10px] text-text-muted font-bold">Tap to Inspect 🔍</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {allInspected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="bg-pip-blue/10 border-2 border-pip-blue/30 px-6 py-4 rounded-2xl max-w-md mx-auto">
                    <p className="text-base font-black text-pip-blue-dark">
                      A <KidTermTooltip term="material" displayText="material" /> is the stuff we use to make everything around us!
                    </p>
                  </div>

                  <motion.button
                    onClick={() => changePhase("sorting")}
                    className="px-8 py-4 bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-black rounded-2xl shadow-warm text-base flex items-center justify-center gap-2 mx-auto transition-all cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Where do materials come from? Sort them! ➔</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ============================================================
            PHASE 2: SORTING LAB (NATURE VS MADE BY PEOPLE)
            ============================================================ */}
        {phase === "sorting" && (
          <motion.div
            key="sorting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goBackStep}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
              >
                <ArrowLeft size={14} />
                <span>← Back to Object Inspection</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetSorting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
                  title="Shuffle & Reset Items"
                >
                  <RotateCcw size={13} />
                  <span>Shuffle & Reset</span>
                </button>

                <span className="text-xs font-black text-pip-blue bg-pip-blue/10 px-3 py-1.5 rounded-full">
                  Step 2 of 4: Sorting Lab
                </span>
              </div>
            </div>

            {/* Pip Prompt */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-text-dark mb-2">
                Nature or Made by People?
              </h1>
              <div className="speech-bubble mx-auto max-w-xl">
                <p className="text-base text-text-dark font-semibold">
                  Some materials come from <KidTermTooltip term="natural" displayText="Nature 🌿" />. Others are <KidTermTooltip term="synthetic" displayText="Synthetic 🏭" /> (made by people in factories). Tap or drag to sort!
                </p>
              </div>
            </div>

            {/* Sorting Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[50vh]">
              
              {/* ==================== LEFT BIN: FROM NATURE (GREEN) ==================== */}
              <motion.div
                onClick={() => {
                  if (selectedItem) {
                    handleDrop("nature", selectedItem);
                    setSelectedItem(null);
                  }
                }}
                className={`flex flex-col items-center p-5 rounded-3xl border-3 transition-all cursor-pointer shadow-soft ${
                  selectedItem 
                    ? "ring-4 ring-emerald-400/40 bg-emerald-50/90 border-emerald-500 scale-101" 
                    : "bg-emerald-50/50 border-emerald-300 hover:border-emerald-500"
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-4 w-full">
                  <LottieAnimation preset="plant" width={46} height={46} />
                  <div className="text-left">
                    <h2 className="text-lg font-black text-emerald-950">
                      From Nature
                    </h2>
                    <p className="text-xs text-emerald-700 font-bold">Plants, Animals, Trees</p>
                  </div>
                </div>

                {selectedItem && (
                  <div className="mb-3 text-xs font-black text-emerald-900 bg-white px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs animate-pulse">
                    Tap to put &ldquo;{selectedItem.name}&rdquo; here! 🌿
                  </div>
                )}

                <div className="flex-1 w-full bg-white/90 rounded-2xl p-3.5 min-h-[160px] border border-emerald-200 flex flex-wrap content-start gap-2">
                  {natureBin.map((item) => {
                    const isCorrect = item.category === "natural";
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-xs ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-950 border-2 border-emerald-400"
                            : "bg-rose-100 text-rose-950 border-2 border-rose-400 animate-shake"
                        }`}
                      >
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.name}</span>
                        <span>{isCorrect ? "✓" : "✗"}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ==================== CENTER: UNSORTED ITEMS POOL ==================== */}
              <div className="flex flex-col items-center">
                <div className="text-center mb-3">
                  <p className="text-xs font-black uppercase tracking-wider text-text-muted">
                    {unsorted.length > 0 ? `Unsorted Items (${unsorted.length} remaining)` : "All Sorted! 🎉"}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 w-full">
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
                        onClick={() => setSelectedItem(isSelected ? null : item)}
                        className={`relative group flex flex-col items-center p-3.5 rounded-3xl bg-white border-3 transition-all shadow-soft cursor-grab active:cursor-grabbing select-none ${
                          isSelected
                            ? "border-pip-blue ring-4 ring-pip-blue/30 scale-105"
                            : "border-lab-wood/20 hover:border-pip-blue/50"
                        }`}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                      >
                        <LottieAnimation
                          preset={item.lottiePreset}
                          width={58}
                          height={58}
                          className="mb-1"
                        />

                        <span className="text-xs font-black text-text-dark text-center">
                          {item.name}
                        </span>

                        {/* Fast Action Buttons */}
                        <div className="mt-2.5 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDrop("nature", item);
                              setSelectedItem(null);
                            }}
                            className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black shadow-xs transition-transform active:scale-90"
                            title="Put in Nature Bin"
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
                            className="px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-xs transition-transform active:scale-90"
                            title="Put in Made by People Bin"
                          >
                            🏭 People
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
                      <LottieAnimation preset="celebration" width={80} height={80} />
                      <p className="text-base font-black text-text-dark mt-2">
                        Awesome! All items sorted!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ==================== RIGHT BIN: MADE BY PEOPLE (BLUE) ==================== */}
              <motion.div
                onClick={() => {
                  if (selectedItem) {
                    handleDrop("factory", selectedItem);
                    setSelectedItem(null);
                  }
                }}
                className={`flex flex-col items-center p-5 rounded-3xl border-3 transition-all cursor-pointer shadow-soft ${
                  selectedItem 
                    ? "ring-4 ring-blue-400/40 bg-blue-50/90 border-blue-500 scale-101" 
                    : "bg-blue-50/50 border-blue-300 hover:border-blue-500"
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-4 w-full">
                  <LottieAnimation preset="chemistry" width={46} height={46} />
                  <div className="text-left">
                    <h2 className="text-lg font-black text-blue-950">
                      Made by People
                    </h2>
                    <p className="text-xs text-blue-700 font-bold">Factories, Chemicals, Polymers</p>
                  </div>
                </div>

                {selectedItem && (
                  <div className="mb-3 text-xs font-black text-blue-900 bg-white px-3.5 py-1.5 rounded-full border border-blue-300 shadow-xs animate-pulse">
                    Tap to put &ldquo;{selectedItem.name}&rdquo; here! ⚙️
                  </div>
                )}

                <div className="flex-1 w-full bg-white/90 rounded-2xl p-3.5 min-h-[160px] border border-blue-200 flex flex-wrap content-start gap-2">
                  {factoryBin.map((item) => {
                    const isCorrect = item.category === "synthetic";
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-xs ${
                          isCorrect
                            ? "bg-blue-100 text-blue-950 border-2 border-blue-400"
                            : "bg-rose-100 text-rose-950 border-2 border-rose-400 animate-shake"
                        }`}
                      >
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.name}</span>
                        <span>{isCorrect ? "✓" : "✗"}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

            </div>

            {/* Results Button */}
            {allSorted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center bg-white p-6 rounded-3xl border-2 border-lab-wood/20 shadow-soft max-w-lg mx-auto"
              >
                <h3 className="text-xl font-black text-text-dark mb-2">
                  {correctCount === MATERIALS.length
                    ? "🌟 Perfect Score! You sorted them all correctly!"
                    : `You got ${correctCount} out of ${MATERIALS.length} correct!`}
                </h3>

                {mistakes.length > 0 && (
                  <p className="text-xs text-text-muted mb-4">
                    Take a quick look at the science behind each material below:
                  </p>
                )}

                <motion.button
                  onClick={() => changePhase("concept")}
                  className="px-8 py-3.5 bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-black rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 mx-auto transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Discover the Secret Science Concepts ➔</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ============================================================
            PHASE 3: CONCEPT EXPLANATIONS WITH TRANSPARENT SKETCHBOOK LOTTIE
            ============================================================ */}
        {phase === "concept" && (
          <motion.div
            key="concept"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goBackStep}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
              >
                <ArrowLeft size={14} />
                <span>← Back to Sorting Lab</span>
              </button>

              <span className="text-xs font-black text-pip-blue bg-pip-blue/10 px-3 py-1 rounded-full">
                Step 3 of 4: Science Concepts
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-text-dark text-center mb-8">
              The Two Big Families of Materials
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Natural Family */}
              <div className="bg-emerald-50/70 border-3 border-emerald-300 rounded-3xl p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-3">
                  <LottieAnimation preset="plant" width={40} height={40} />
                  <div>
                    <h2 className="text-lg font-black text-emerald-950">
                      <KidTermTooltip term="natural" displayText="Natural Materials" />
                    </h2>
                    <p className="text-xs text-emerald-700 font-bold">Harvested directly from Nature</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: "Cotton", preset: "plant" as LottiePreset, sub: "From cotton plant bolls" },
                    { name: "Wool", preset: "wool" as LottiePreset, sub: "From sheep fleece" },
                    { name: "Silk", preset: "silk" as LottiePreset, sub: "From silkworm cocoons" },
                    { name: "Rubber", preset: "rubber_tree" as LottiePreset, sub: "From rubber tree sap" },
                  ].map((item) => (
                    <div key={item.name} className="bg-white p-3 rounded-2xl border border-emerald-200 text-center flex flex-col items-center">
                      <LottieAnimation preset={item.preset} width={50} height={50} className="mb-1" />
                      <span className="text-xs font-black text-emerald-950">{item.name}</span>
                      <span className="text-[9px] text-text-muted">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synthetic Family */}
              <div className="bg-blue-50/70 border-3 border-blue-300 rounded-3xl p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-3">
                  <LottieAnimation preset="chemistry" width={40} height={40} />
                  <div>
                    <h2 className="text-lg font-black text-blue-950">
                      <KidTermTooltip term="synthetic" displayText="Synthetic Materials" />
                    </h2>
                    <p className="text-xs text-blue-700 font-bold">Created by scientists in factories</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: "Nylon", preset: "rope" as LottiePreset, sub: "Stronger than steel" },
                    { name: "Polyester", preset: "jacket" as LottiePreset, sub: "Wrinkle-free & quick-dry" },
                    { name: "Plastic", preset: "bottle" as LottiePreset, sub: "Insulator & lightweight" },
                    { name: "Acrylic", preset: "wool" as LottiePreset, sub: "Man-made warm wool" },
                  ].map((item) => (
                    <div key={item.name} className="bg-white p-3 rounded-2xl border border-blue-200 text-center flex flex-col items-center">
                      <LottieAnimation preset={item.preset} width={50} height={50} className="mb-1" />
                      <span className="text-xs font-black text-blue-950">{item.name}</span>
                      <span className="text-[9px] text-text-muted">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <motion.button
                onClick={() => changePhase("exam-bridge")}
                className="px-8 py-4 bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-black rounded-2xl shadow-warm text-base flex items-center justify-center gap-2 mx-auto transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Check Your Understanding ➔</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ============================================================
            PHASE 4: EXAM BRIDGE & VOICE UNLOCK
            ============================================================ */}
        {phase === "exam-bridge" && (
          <motion.div
            key="exam-bridge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={goBackStep}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
              >
                <ArrowLeft size={14} />
                <span>← Back to Science Concepts</span>
              </button>

              <span className="text-xs font-black text-nature-green-dark bg-nature-green/10 px-3 py-1 rounded-full">
                Step 4 of 4: Mission Mastered!
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-lab-wood/25 shadow-warm space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-amber-500" />
                <h2 className="text-xl font-black text-text-dark">
                  Class 8 Exam Secret Summary
                </h2>
              </div>

              <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs leading-relaxed text-text-dark font-mono">
                <p><strong>Natural Fibres:</strong> Obtained from plants (cotton, jute) and animals (wool, silk).</p>
                <p><strong>Synthetic Fibres:</strong> Made by human beings through chemical processing of petrochemicals (nylon, polyester, acrylic).</p>
              </div>

              <div className="pt-2">
                <SentenceVoiceReader
                  sentence="Natural fibres come from plants and animals, while synthetic fibres are man-made from chemicals!"
                  conceptTitle="Origins Concept Summary"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setShowVoiceModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-soft text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>🎙️ Voice Password: Say &ldquo;SYNTHETIC&rdquo;</span>
                </button>

                <Link
                  href="/play/fibres"
                  onClick={() => playClickSound()}
                  className="w-full sm:w-auto px-6 py-3.5 bg-nature-green hover:bg-nature-green-dark text-white font-black rounded-2xl shadow-soft text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Next: Meet The 4 Fabrics ➔</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <VoiceUnlockModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        targetWord="SYNTHETIC"
        wordMeaning="Man-made materials created from petroleum chemicals in laboratories!"
        nextRoute="/play/fibres"
        onSuccess={() => {
          setShowVoiceModal(false);
          router.push("/play/fibres");
        }}
      />
    </div>
  );
}
