"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// === FINAL MISSION: PIP'S SAFE CAMP ===
// The child must choose the right materials for various camp needs
// Tests understanding without explicitly revealing answers

type CampTask = {
  id: string;
  title: string;
  question: string;
  pipSays: string;
  options: { id: string; label: string; emoji: string; correct: boolean; feedback: string }[];
  conceptTested: string;
};

const CAMP_TASKS: CampTask[] = [
  {
    id: "tent-rope",
    title: "Tent Rope",
    question: "Which material should we use for the tent ropes?",
    pipSays: "We need something really strong that won't snap!",
    options: [
      { id: "cotton-thread", label: "Cotton thread", emoji: "🧵", correct: false, feedback: "Cotton thread might not be strong enough to hold the tent in wind." },
      { id: "nylon-rope", label: "Nylon rope", emoji: "🪢", correct: true, feedback: "Yes! Nylon is super strong for its thickness — perfect for ropes!" },
      { id: "wool-yarn", label: "Wool yarn", emoji: "🧶", correct: false, feedback: "Wool is warm but not strong enough for tent ropes." },
    ],
    conceptTested: "nylon",
  },
  {
    id: "campfire-clothing",
    title: "Campfire Clothing",
    question: "We'll sit around a campfire tonight. Which clothes should we wear?",
    pipSays: "Safety first! Remember what we learned about fire and fabrics...",
    options: [
      { id: "polyester-jacket", label: "Polyester jacket", emoji: "🧥", correct: false, feedback: "Careful! Polyester can melt near flames and stick to skin." },
      { id: "cotton-clothes", label: "Cotton clothes", emoji: "👕", correct: true, feedback: "Great choice! Cotton doesn't melt — it's much safer near open flames." },
      { id: "acrylic-sweater", label: "Acrylic sweater", emoji: "🧶", correct: false, feedback: "Acrylic is synthetic and can melt near fire, just like polyester." },
    ],
    conceptTested: "plastic_safety",
  },
  {
    id: "wire-cover",
    title: "Camp Light Wiring",
    question: "We need to cover the electrical wire for our camp light. Which material?",
    pipSays: "Electricity can be dangerous if the wire isn't covered properly!",
    options: [
      { id: "metal-sleeve", label: "Metal sleeve", emoji: "🔩", correct: false, feedback: "Metal conducts electricity — that would be dangerous!" },
      { id: "plastic-coating", label: "Plastic coating", emoji: "🛡️", correct: true, feedback: "Perfect! Plastic is an electrical insulator — it keeps the electricity safely inside." },
      { id: "cotton-wrap", label: "Cotton cloth", emoji: "🧻", correct: false, feedback: "Cotton isn't a reliable insulator for electricity." },
    ],
    conceptTested: "electrical_insulator",
  },
  {
    id: "kettle-handle",
    title: "Camp Kettle Handle",
    question: "Our camp kettle needs a handle. Which material should it be?",
    pipSays: "I don't want to burn my hands making chai!",
    options: [
      { id: "metal-handle", label: "Metal handle", emoji: "🔧", correct: false, feedback: "Metal conducts heat — the handle would get burning hot!" },
      { id: "plastic-handle", label: "Plastic handle", emoji: "🫱", correct: true, feedback: "Yes! Plastic is a heat insulator — it won't get hot when the kettle heats up." },
      { id: "glass-handle", label: "Glass handle", emoji: "🪟", correct: false, feedback: "Glass can get hot and might break easily." },
    ],
    conceptTested: "heat_insulator",
  },
  {
    id: "winter-blanket",
    title: "Winter Blanket",
    question: "It's cold! Which fabric for a warm, affordable blanket?",
    pipSays: "Brr! We need something warm like wool, but lighter on the pocket...",
    options: [
      { id: "acrylic-blanket", label: "Acrylic blanket", emoji: "🧶", correct: true, feedback: "Smart! Acrylic is wool-like but more affordable and moth-resistant." },
      { id: "polyester-sheet", label: "Polyester sheet", emoji: "🛏️", correct: false, feedback: "Polyester is great for many things, but acrylic is more wool-like for warmth." },
      { id: "cotton-sheet", label: "Cotton sheet", emoji: "📄", correct: false, feedback: "Cotton is breathable but not as warm as wool-like materials." },
    ],
    conceptTested: "acrylic",
  },
  {
    id: "rain-protection",
    title: "Rain Cover",
    question: "It might rain! Which material for our rain cover?",
    pipSays: "We need something water doesn't soak through...",
    options: [
      { id: "cotton-tarp", label: "Cotton tarp", emoji: "🏕️", correct: false, feedback: "Cotton absorbs water — it would get soaked and heavy!" },
      { id: "polyester-sheet", label: "Polyester sheet", emoji: "🏗️", correct: true, feedback: "Excellent! Polyester doesn't absorb water easily — perfect for rain protection." },
      { id: "wool-blanket", label: "Wool blanket", emoji: "🧣", correct: false, feedback: "Wool absorbs water and gets very heavy when wet." },
    ],
    conceptTested: "polyester",
  },
  {
    id: "recycling",
    title: "Camp Cleanup",
    question: "We have plastic bottles left over. What should we do?",
    pipSays: "Remember what happens when plastic is left in the ground...",
    options: [
      { id: "bury-it", label: "Bury it", emoji: "🕳️", correct: false, feedback: "Plastic is non-biodegradable — it would stay in the ground for hundreds of years!" },
      { id: "recycle-it", label: "Recycle it", emoji: "♻️", correct: true, feedback: "Yes! Since plastic doesn't decompose, recycling is the responsible choice." },
      { id: "burn-it", label: "Burn it", emoji: "🔥", correct: false, feedback: "Burning plastic releases harmful fumes — that's not safe!" },
    ],
    conceptTested: "environmental_impact",
  },
];

export default function FinalMissionPage() {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const task = CAMP_TASKS[currentTask];

  const handleSelect = useCallback(
    (optionId: string) => {
      if (showFeedback) return;
      setSelectedOption(optionId);
      setShowFeedback(true);

      const option = task.options.find((o) => o.id === optionId);
      if (option?.correct) {
        setScore((s) => s + 1);
      }
    },
    [showFeedback, task]
  );

  const handleNext = useCallback(() => {
    if (currentTask < CAMP_TASKS.length - 1) {
      setCurrentTask((t) => t + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  }, [currentTask]);

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Camp illustration */}
          <motion.div
            className="text-7xl mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏕️
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark mb-4">
            {score >= 6
              ? "Material Master!"
              : score >= 4
              ? "Great Explorer!"
              : "Keep Exploring!"}
          </h1>

          <p className="text-lg text-text-muted mb-2">
            You got <strong className="text-pip-blue">{score}</strong> out of{" "}
            <strong>{CAMP_TASKS.length}</strong> right
          </p>

          <p className="text-base text-text-muted mb-8">
            {score >= 6
              ? "Pip's camp is safe thanks to you! You really understand materials."
              : "You've learned a lot! Try the missions again to discover more."}
          </p>

          {/* Score visualization — discoveries, not just numbers */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {CAMP_TASKS.map((t, i) => (
              <div
                key={t.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  i < score
                    ? "bg-success/15 border border-success/30"
                    : "bg-lab-chalk border border-lab-wood/10"
                }`}
              >
                {i < score ? "⭐" : "·"}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/play/discovery-book"
              className="px-6 py-3 bg-pip-blue text-white font-bold rounded-lg shadow-soft hover:bg-pip-blue-dark transition-colors"
            >
              📖 Open Discovery Book
            </Link>
            <Link
              href="/play"
              className="px-6 py-3 bg-white text-text-dark font-semibold rounded-lg border border-lab-wood/20 hover:border-lab-wood/40 transition-colors"
            >
              ← Back to Map
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Mission header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🏕️</span>
          <h1 className="text-2xl font-extrabold text-text-dark">
            Pip&apos;s Safe Camp
          </h1>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-sm text-text-muted">
          <span>
            Challenge {currentTask + 1} of {CAMP_TASKS.length}
          </span>
          <span>·</span>
          <span>{task.title}</span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-lab-chalk rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-pip-blue rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentTask + (showFeedback ? 1 : 0)) / CAMP_TASKS.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {/* Pip's speech */}
          <div className="speech-bubble mx-auto mb-6">
            <p className="text-base font-medium text-text-dark">{task.pipSays}</p>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-text-dark text-center mb-6">
            {task.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {task.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const showCorrect = showFeedback && option.correct;
              const showWrong = showFeedback && isSelected && !option.correct;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    showCorrect
                      ? "border-success bg-success/8"
                      : showWrong
                      ? "border-fire-red bg-fire-red/5"
                      : isSelected
                      ? "border-pip-blue bg-pip-blue/5"
                      : "border-lab-wood/15 bg-white hover:border-pip-blue/30 hover:bg-lab-warm"
                  } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                  whileHover={showFeedback ? {} : { scale: 1.01 }}
                  whileTap={showFeedback ? {} : { scale: 0.99 }}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-text-dark">{option.label}</p>
                    {showFeedback && isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-text-muted mt-1"
                      >
                        {option.feedback}
                      </motion.p>
                    )}
                    {showCorrect && !isSelected && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-success mt-1"
                      >
                        ← This was the best choice
                      </motion.p>
                    )}
                  </div>
                  {showCorrect && <span className="text-xl">✓</span>}
                  {showWrong && <span className="text-xl text-fire-red">✗</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Next button */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.button
                onClick={handleNext}
                className="px-8 py-3 bg-pip-blue text-white font-bold rounded-lg shadow-soft text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentTask < CAMP_TASKS.length - 1
                  ? "Next Challenge →"
                  : "See Results 🏆"}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
