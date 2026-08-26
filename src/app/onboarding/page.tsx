"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  KeyRound, 
  User, 
  ShieldCheck, 
  Compass, 
  Award 
} from "lucide-react";
import { playPopSound, playDiscoverySound, playSuccessSound, speak } from "@/lib/audio-manager";

const INTERESTS = [
  { id: "dinosaurs", label: "Dinosaurs & Fossils", emoji: "🦖" },
  { id: "space", label: "Rockets & Deep Space", emoji: "🚀" },
  { id: "nature", label: "Nature, Plants & Forests", emoji: "🌿" },
  { id: "robots", label: "Robots & Coding", emoji: "🤖" },
  { id: "chemistry", label: "Chemistry & Potions", emoji: "🧪" },
  { id: "volcanoes", label: "Volcanoes & Earth", emoji: "🌋" },
  { id: "art", label: "Drawing & Creative Arts", emoji: "🎨" },
  { id: "cars", label: "Cars & Super Racing", emoji: "🏎️" },
  { id: "oceans", label: "Oceans & Marine Life", emoji: "🌊" },
  { id: "magic", label: "Magic & Adventure Tales", emoji: "🧙" },
  { id: "gaming", label: "Video Games & Quests", emoji: "🎮" },
  { id: "animals", label: "Animals & Wildlife", emoji: "🐾" },
  { id: "climbing", label: "Climbing & Extreme Sports", emoji: "🧗" },
  { id: "cooking", label: "Cooking & Kitchen Science", emoji: "🍳" },
  { id: "electricity", label: "Electricity & Lasers", emoji: "⚡" },
  { id: "math", label: "Math Puzzles & Riddles", emoji: "🧮" },
  { id: "music", label: "Music & Sound Waves", emoji: "🎵" },
  { id: "fashion", label: "Fashion & Textile Design", emoji: "👗" },
  { id: "building", label: "Architecture & Structures", emoji: "🏗️" },
  { id: "weather", label: "Weather, Storms & Rain", emoji: "🌦️" },
  { id: "mystery", label: "Detective & Mysteries", emoji: "🔍" },
  { id: "planets", label: "Planets & Black Holes", emoji: "🪐" },
  { id: "crystals", label: "Crystals & Rare Gems", emoji: "💎" },
  { id: "insects", label: "Bugs & Fascinating Insects", emoji: "🪲" },
  { id: "biology", label: "Human Body & Medicine", emoji: "🏥" },
  { id: "aviation", label: "Airplanes & Flight", emoji: "✈️" },
  { id: "history", label: "Knights, Castles & History", emoji: "🛡️" },
  { id: "superheroes", label: "Superheroes & Comic Books", emoji: "🥋" },
  { id: "lego", label: "LEGO & Mechanical Gadgets", emoji: "🧩" },
  { id: "eco", label: "Recycling & Saving the Earth", emoji: "♻️" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [parentName, setParentName] = useState("");
  const [parentPin, setParentPin] = useState("1990");
  const [childName, setChildName] = useState("");
  const [childGrade, setChildGrade] = useState("Grade 5");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["space", "robots", "chemistry"]);

  // Load existing profile if any
  useEffect(() => {
    try {
      const savedPin = localStorage.getItem("polyquest-parent-pin");
      if (savedPin) setParentPin(savedPin);
      const savedChild = localStorage.getItem("polyquest-child-name");
      if (savedChild) setChildName(savedChild);
      const savedInterests = localStorage.getItem("polyquest-child-interests");
      if (savedInterests) setSelectedInterests(JSON.parse(savedInterests));
    } catch {}
  }, []);

  const toggleInterest = (id: string) => {
    playPopSound();
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    playSuccessSound();
    try {
      localStorage.setItem("polyquest-parent-name", parentName || "Parent");
      localStorage.setItem("polyquest-parent-pin", parentPin || "1990");
      localStorage.setItem("polyquest-child-name", childName || "Young Scientist");
      localStorage.setItem("polyquest-child-grade", childGrade);
      localStorage.setItem("polyquest-child-interests", JSON.stringify(selectedInterests));
      localStorage.setItem("polyquest-onboarded", "true");
    } catch {}

    const name = childName || "Young Scientist";
    speak(`Welcome to PlayLabs, ${name}! Your science adventure is ready to begin!`);
    router.push("/play");
  };

  return (
    <div className="min-h-screen bg-lab-chalk p-4 sm:p-8 font-nunito flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-lab-wood/20 shadow-warm p-6 sm:p-10">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-lab-wood/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-soft">
              🔬
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Parent & Child Setup
              </span>
              <h2 className="text-lg font-black text-text-dark">
                Personalize Your Learning Journey
              </h2>
            </div>
          </div>

          <span className="text-xs font-black text-pip-blue bg-pip-blue/10 px-3 py-1 rounded-full">
            Step {step} of 3
          </span>
        </div>

        {/* ============================================================
            STEP 1: PARENT CODE & CHILD BASICS
            ============================================================ */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-black text-text-dark">
                1. Parent & Child Details
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Set a 4-digit parent PIN (like birth year) to protect parent diagnostic dashboard and unlock controls.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-text-dark mb-1.5">
                  Child&apos;s First Name
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Leo, Maya, Sam"
                  className="w-full px-4 py-3 rounded-2xl bg-lab-chalk/50 border-2 border-lab-wood/25 focus:border-pip-blue font-bold text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-text-dark mb-1.5">
                  School Grade / Age Level
                </label>
                <select
                  value={childGrade}
                  onChange={(e) => setChildGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-lab-chalk/50 border-2 border-lab-wood/25 focus:border-pip-blue font-bold text-sm outline-none transition-all cursor-pointer"
                >
                  <option value="Grade 3">Grade 3 (Ages 8-9)</option>
                  <option value="Grade 4">Grade 4 (Ages 9-10)</option>
                  <option value="Grade 5">Grade 5 (Ages 10-11)</option>
                  <option value="Grade 6">Grade 6 (Ages 11-12)</option>
                  <option value="Grade 7">Grade 7 (Ages 12-13)</option>
                  <option value="Grade 8">Grade 8 (Ages 13-14)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-text-dark mb-1.5">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full px-4 py-3 rounded-2xl bg-lab-chalk/50 border-2 border-lab-wood/25 focus:border-pip-blue font-bold text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-text-dark mb-1.5">
                  4-Digit Parent Security PIN (Birth Year)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={parentPin}
                  onChange={(e) => setParentPin(e.target.value)}
                  placeholder="e.g. 1990"
                  className="w-full px-4 py-3 rounded-2xl bg-lab-chalk/50 border-2 border-lab-wood/25 focus:border-indigo-500 font-mono font-black text-center text-base outline-none transition-all tracking-widest"
                />
              </div>
            </div>

            <div className="text-right pt-4">
              <button
                onClick={() => {
                  playDiscoverySound();
                  setStep(2);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-black rounded-2xl shadow-soft text-sm inline-flex items-center gap-2 transition-all"
              >
                <span>Select Child Interests ➔</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ============================================================
            STEP 2: 30+ CHILD INTERESTS MULTI-SELECT
            ============================================================ */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-black text-text-dark">
                2. What is {childName || "your child"} curious about?
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Select as many topics as you like ({selectedInterests.length} selected). Pip will use these examples in experiments!
              </p>
            </div>

            {/* 30 Interests Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[46vh] overflow-y-auto pr-1 p-1">
              {INTERESTS.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2.5 transition-all text-xs font-black cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-500 text-indigo-950 shadow-soft scale-102"
                        : "bg-lab-chalk/50 border-lab-wood/20 text-text-dark hover:border-indigo-300"
                    }`}
                  >
                    <span className="text-xl shrink-0">{item.emoji}</span>
                    <span className="truncate flex-1">{item.label}</span>
                    {isSelected && <Check size={14} className="text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-lab-wood/15">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-xs font-bold text-text-muted hover:text-text-dark"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                onClick={() => {
                  playDiscoverySound();
                  setStep(3);
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-black rounded-2xl shadow-soft text-sm inline-flex items-center gap-2 transition-all"
              >
                <span>Review & Start ➔</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ============================================================
            STEP 3: READY TO LAUNCH ADVENTURE
            ============================================================ */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-nature-green/20 border-2 border-nature-green flex items-center justify-center text-3xl mx-auto shadow-soft animate-bounce">
              🚀
            </div>

            <div>
              <h3 className="text-2xl font-black text-text-dark">
                You&apos;re All Set, {childName || "Explorer"}!
              </h3>
              <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-md mx-auto leading-relaxed">
                We have tailored <strong>Chapter 3: Synthetic Fibres & Plastics</strong> with your favorite passions in mind!
              </p>
            </div>

            <div className="bg-lab-chalk/80 rounded-2xl p-4 border border-lab-wood/20 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Student:</span>
                <span className="font-black text-text-dark">{childName || "Young Scientist"} ({childGrade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Parent Security PIN:</span>
                <span className="font-mono font-black text-indigo-700">•••• ({parentPin})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Selected Interests:</span>
                <span className="font-bold text-text-dark">{selectedInterests.length} Topics active</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center max-w-md mx-auto">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-xs font-bold text-text-muted hover:text-text-dark"
              >
                <ArrowLeft size={14} />
                <span>Edit Interests</span>
              </button>

              <button
                onClick={handleFinish}
                className="px-8 py-4 bg-nature-green hover:bg-nature-green-dark text-white font-black rounded-2xl shadow-warm text-sm inline-flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Enter Materials Laboratory! 🚀</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
