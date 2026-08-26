"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, Volume2, CheckCircle2, Award, ArrowRight, Lightbulb } from "lucide-react";
import { playPopSound, playDiscoverySound, playSuccessSound, speak } from "@/lib/audio-manager";

export interface ScrambleWord {
  id: string;
  word: string;
  category: string;
  hint: string;
  explanation: string;
  image?: string;
}

const SCRAMBLE_WORDS: ScrambleWord[] = [
  {
    id: "nylon",
    word: "NYLON",
    category: "Super Synthetic Fibre",
    hint: "Super strong man-made fibre used in climbing ropes and parachutes!",
    explanation: "NYLON is stronger than a steel wire of the same thickness! It has high tensile strength.",
    image: "/images/nylon_climbing_rope.jpg"
  },
  {
    id: "cotton",
    word: "COTTON",
    category: "Natural Plant Fibre",
    hint: "Fluffy white plant fibre that is breathable and soft in summer!",
    explanation: "COTTON is a natural material from cotton plants. Its hollow fibres absorb sweat!",
    image: "/images/cotton_plant_fabric.jpg"
  },
  {
    id: "polymer",
    word: "POLYMER",
    category: "Chemistry Building Block",
    hint: "A giant molecule made of many repeating chemical units linked together!",
    explanation: "A POLYMER is made of thousands of small monomers joined together like beads on a necklace.",
    image: "/images/plastic_insulator_lab.jpg"
  },
  {
    id: "insulator",
    word: "INSULATOR",
    category: "Safety Material",
    hint: "A material like plastic or rubber that blocks electricity and heat!",
    explanation: "An INSULATOR prevents dangerous electric shocks and keeps frying pan handles cool!",
    image: "/images/plastic_insulator_lab.jpg"
  }
];

// Helper to scramble letters ensuring it's not already solved
function scramble(word: string): string[] {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  if (letters.join("") === word && letters.length > 2) {
    [letters[0], letters[1]] = [letters[1], letters[0]];
  }
  return letters;
}

export function WordScrambleGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentItem = SCRAMBLE_WORDS[currentIdx];

  const [availableTiles, setAvailableTiles] = useState<{ id: number; char: string; used: boolean }[]>(() =>
    scramble(currentItem.word).map((char, i) => ({ id: i, char, used: false }))
  );
  const [selectedTiles, setSelectedTiles] = useState<{ id: number; char: string }[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  const loadWord = (idx: number) => {
    const item = SCRAMBLE_WORDS[idx];
    setCurrentIdx(idx);
    setAvailableTiles(scramble(item.word).map((char, i) => ({ id: i, char, used: false })));
    setSelectedTiles([]);
    setIsSolved(false);
    speak(`Spell the science word! ${item.hint}`);
  };

  const handleTapAvailable = (tile: { id: number; char: string; used: boolean }) => {
    if (tile.used || isSolved) return;
    playPopSound();

    const newSelected = [...selectedTiles, { id: tile.id, char: tile.char }];
    setSelectedTiles(newSelected);

    setAvailableTiles(prev =>
      prev.map(t => (t.id === tile.id ? { ...t, used: true } : t))
    );

    // Check if word completed
    const currentWordAttempt = newSelected.map(t => t.char).join("");
    if (currentWordAttempt === currentItem.word) {
      setIsSolved(true);
      playSuccessSound();
      speak(`Awesome job! You spelled ${currentItem.word}! ${currentItem.explanation}`);
    } else if (newSelected.length === currentItem.word.length) {
      playPopSound();
      speak("Almost! Try rearranging the letters!");
    }
  };

  const handleTapSelected = (tile: { id: number; char: string }) => {
    if (isSolved) return;
    playPopSound();

    setSelectedTiles(prev => prev.filter(t => t.id !== tile.id));
    setAvailableTiles(prev =>
      prev.map(t => (t.id === tile.id ? { ...t, used: false } : t))
    );
  };

  const handleReset = () => {
    playPopSound();
    setAvailableTiles(scramble(currentItem.word).map((char, i) => ({ id: i, char, used: false })));
    setSelectedTiles([]);
    setIsSolved(false);
  };

  const handleNextWord = () => {
    playDiscoverySound();
    const next = (currentIdx + 1) % SCRAMBLE_WORDS.length;
    loadWord(next);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft w-full max-w-2xl mx-auto text-center">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner shrink-0">
            🧩
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
              Word {currentIdx + 1} of {SCRAMBLE_WORDS.length} • Vocabulary Game
            </span>
            <h3 className="text-lg sm:text-xl font-black text-text-dark">
              Science Word Scramble
            </h3>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-muted hover:text-text-dark transition-colors"
          title="Reset Letters"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Clue Box with optional generated image */}
      <div className="bg-gradient-to-br from-lab-chalk to-lab-warm/30 rounded-2xl p-5 border border-lab-wood/20 mb-6 text-left flex flex-col sm:flex-row items-center gap-4">
        {currentItem.image && (
          <img
            src={currentItem.image}
            alt={currentItem.word}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-soft shrink-0"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-pip-blue uppercase tracking-wider">
              {currentItem.category}
            </span>
            <button
              onClick={() => speak(currentItem.hint)}
              className="p-1 rounded-lg text-pip-blue hover:bg-white transition-colors"
              title="Hear Clue"
            >
              <Volume2 size={14} />
            </button>
          </div>
          <p className="text-xs sm:text-sm font-bold text-text-dark leading-relaxed">
            &ldquo;{currentItem.hint}&rdquo;
          </p>
        </div>
      </div>

      {/* Word Answer Slots */}
      <div className="flex items-center justify-center gap-2 mb-6 min-h-[60px]">
        {Array.from({ length: currentItem.word.length }).map((_, idx) => {
          const selected = selectedTiles[idx];
          return (
            <motion.div
              key={idx}
              onClick={() => selected && handleTapSelected(selected)}
              className={`w-11 h-12 sm:w-13 sm:h-14 rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl transition-all cursor-pointer ${
                selected
                  ? isSolved
                    ? "bg-nature-green text-white shadow-soft scale-105 border-2 border-nature-green-dark"
                    : "bg-pip-blue text-white shadow-soft border-2 border-pip-blue-dark"
                  : "bg-lab-chalk/80 border-2 border-dashed border-lab-wood/30 text-text-light/40"
              }`}
              whileHover={selected ? { scale: 1.05 } : {}}
              whileTap={selected ? { scale: 0.95 } : {}}
            >
              {selected ? selected.char : ""}
            </motion.div>
          );
        })}
      </div>

      {/* Available Jumbled Letter Tiles */}
      <div className="mb-6">
        <span className="text-xs font-bold text-text-muted block mb-2">
          Tap letters in order to build the answer:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {availableTiles.map((tile) => (
            <motion.button
              key={tile.id}
              onClick={() => handleTapAvailable(tile)}
              disabled={tile.used || isSolved}
              className={`w-12 h-12 rounded-2xl font-black text-lg shadow-soft transition-all flex items-center justify-center ${
                tile.used
                  ? "bg-lab-chalk/40 text-text-light/30 border border-lab-wood/10 cursor-not-allowed scale-95"
                  : "bg-white border-2 border-lab-wood/30 hover:border-pip-blue hover:text-pip-blue active:scale-90 cursor-pointer"
              }`}
              whileHover={!tile.used ? { scale: 1.1, y: -2 } : {}}
              whileTap={!tile.used ? { scale: 0.9 } : {}}
            >
              {tile.char}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Solved Celebration Box */}
      <AnimatePresence>
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-nature-green/10 border-2 border-nature-green/40 p-5 rounded-2xl mb-4 text-left space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <h4 className="font-black text-base text-nature-green-dark">
                  Brilliant! Correctly Spelled: {currentItem.word}
                </h4>
              </div>
              <span className="text-xs font-bold text-nature-green-dark bg-white px-2.5 py-1 rounded-full border border-nature-green/30">
                +50 Science Points ⭐
              </span>
            </div>

            <p className="text-xs text-text-dark leading-relaxed">
              {currentItem.explanation}
            </p>

            <button
              onClick={handleNextWord}
              className="w-full py-3 rounded-xl bg-nature-green hover:bg-nature-green-dark text-white font-extrabold text-xs shadow-soft flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Next Science Word ➔</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
