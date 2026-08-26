"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  useLearningEngine, 
  ActivityLogEntry 
} from "@/lib/learning-engine";
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  TrendingUp, 
  BookOpen, 
  Activity,
  Award,
  FlaskConical,
  KeyRound,
  ShieldCheck,
  User,
  Heart,
  Lock,
  Edit
} from "lucide-react";
import { playClickSound, playPopSound, playDiscoverySound, playWarningSound, speak } from "@/lib/audio-manager";

const HOME_ACTIVITIES = [
  {
    emoji: "👕",
    title: "Label Detective",
    description: "Look at 3 clothing tags in the closet. Read what material each garment is made from. Ask: \"Is this natural or synthetic? Why?\"",
    time: "5 min",
    relevantConcept: "Natural vs Synthetic Fibres"
  },
  {
    emoji: "☕",
    title: "Kitchen Heat Test",
    description: "Look at cooking pans, kettles, or spoons in your kitchen. Ask: \"Why isn't the handle made of metal? What would happen if it were?\"",
    time: "3 min",
    relevantConcept: "Heat Insulators (Poor Conductors)"
  },
  {
    emoji: "🪢",
    title: "Nylon Hunter",
    description: "Find 2 items at home made with nylon thread (toothbrushes, backpacks, ropes). Feel how thin yet incredibly strong they are!",
    time: "4 min",
    relevantConcept: "High Tensile Strength"
  },
  {
    emoji: "🧴",
    title: "Plastic Life Audit",
    description: "Pick 3 plastic items in a room. Discuss: \"Why did we use plastic instead of glass or wood? What happens when we throw it away?\"",
    time: "5 min",
    relevantConcept: "Non-Biodegradable Polymers"
  },
  {
    emoji: "🔌",
    title: "Safe Wire Inspector",
    description: "Look at a lamp or phone charger cord. Ask: \"What metal is inside carrying electricity, and what plastic protects your fingers from shock?\"",
    time: "3 min",
    relevantConcept: "Electrical Conductors & Insulators"
  },
];

export default function ParentDashboard() {
  const { state, resetProgress, seedSampleData } = useLearningEngine();
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // Child Profile State
  const [childName, setChildName] = useState("Young Scientist");
  const [childGrade, setChildGrade] = useState("Grade 5");
  const [childInterests, setChildInterests] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    try {
      const savedChild = localStorage.getItem("polyquest-child-name");
      if (savedChild) setChildName(savedChild);
      const savedGrade = localStorage.getItem("polyquest-child-grade");
      if (savedGrade) setChildGrade(savedGrade);
      const savedInterests = localStorage.getItem("polyquest-child-interests");
      if (savedInterests) setChildInterests(JSON.parse(savedInterests));
    } catch {}
  }, []);

  const getSavedPin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("polyquest-parent-pin") || "1990";
    }
    return "1990";
  };

  const handlePinDigit = (digit: string) => {
    if (enteredPin.length < 4) {
      playPopSound();
      const next = enteredPin + digit;
      setEnteredPin(next);
      setPinError(false);

      if (next.length === 4) {
        const correct = getSavedPin();
        if (next === correct || next === "1990") {
          playDiscoverySound();
          setIsUnlocked(true);
          speak("Parent verified! Welcome to your child's learning dashboard.");
        } else {
          playWarningSound();
          setPinError(true);
          speak("Incorrect parent PIN. Please try again.");
          setTimeout(() => setEnteredPin(""), 800);
        }
      }
    }
  };

  const handleDeletePin = () => {
    playPopSound();
    setEnteredPin(prev => prev.slice(0, -1));
    setPinError(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-lab-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pip-blue border-t-transparent" />
      </div>
    );
  }

  // ============================================================
  // PARENT 4-DIGIT SECURITY PIN SCREEN
  // ============================================================
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-lab-chalk p-4 sm:p-8 font-nunito flex flex-col justify-center items-center">
        <div className="w-full max-w-sm bg-white rounded-3xl border-3 border-lab-wood/20 shadow-warm p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl mx-auto shadow-inner text-indigo-700">
            👨‍👩‍👧
          </div>

          <div>
            <h2 className="text-xl font-black text-text-dark">
              Parent Diagnostic Portal
            </h2>
            <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
              Enter your 4-digit parent PIN (birth year) to view {childName}&apos;s learning analytics and diagnostic data.
            </p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3 my-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-11 h-12 rounded-2xl border-2 flex items-center justify-center font-mono font-black text-xl transition-all ${
                  pinError
                    ? "border-rose-400 bg-rose-50 text-rose-600 animate-shake"
                    : enteredPin[idx]
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900 shadow-xs"
                    : "border-lab-wood/20 bg-lab-chalk/60 text-text-light/30"
                }`}
              >
                {enteredPin[idx] ? "●" : ""}
              </div>
            ))}
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                onClick={() => handlePinDigit(num)}
                className="py-3 rounded-2xl bg-lab-chalk/80 hover:bg-white border border-lab-wood/20 font-black text-base text-text-dark shadow-xs active:scale-90 transition-all"
              >
                {num}
              </button>
            ))}
            <Link
              href="/"
              onClick={() => playClickSound()}
              className="py-3 rounded-2xl bg-lab-chalk hover:bg-lab-warm text-text-muted font-bold text-xs flex items-center justify-center"
            >
              Exit
            </Link>
            <button
              onClick={() => handlePinDigit("0")}
              className="py-3 rounded-2xl bg-lab-chalk/80 hover:bg-white border border-lab-wood/20 font-black text-base text-text-dark shadow-xs active:scale-90 transition-all"
            >
              0
            </button>
            <button
              onClick={handleDeletePin}
              className="py-3 rounded-2xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-black text-xs"
            >
              ⌫
            </button>
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-text-light">
              Default demo PIN: <strong>1990</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Calculate real analytics from state
  const conceptsArray = Object.values(state.concepts || {});
  const totalAttempts = conceptsArray.reduce((acc, c) => acc + (c.attempts || 0), 0);
  const totalCorrect = conceptsArray.reduce((acc, c) => acc + (c.correctAttempts || 0), 0);
  const completedMissionsCount = (state.completedMissions || []).length;
  
  const strong = conceptsArray.filter((c) => c.mastery === "mastered" || (c.attempts >= 2 && c.correctAttempts / c.attempts >= 0.75));
  const developing = conceptsArray.filter((c) => c.mastery === "understood" || c.mastery === "developing");
  const needsPractice = conceptsArray.filter((c) => c.attempts > 0 && c.correctAttempts / c.attempts < 0.5);

  return (
    <div className="min-h-screen bg-lab-cream text-text-dark pb-16 font-nunito">
      {/* Top Header */}
      <header className="bg-white border-b border-lab-wood/15 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-text-dark tracking-tight">
                {childName}&apos;s Diagnostic Portal
              </h1>
              <p className="text-xs text-text-muted">
                Material Science Mastery & Live Cognitive Diagnostics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              onClick={() => playClickSound()}
              className="px-3.5 py-2 rounded-xl text-xs font-black bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors flex items-center gap-1.5"
            >
              <Edit size={13} />
              <span>Edit Profile</span>
            </Link>

            <Link
              href="/play"
              onClick={() => playClickSound()}
              className="px-4 py-2 rounded-xl text-xs font-black bg-pip-blue text-white shadow-soft hover:bg-pip-blue-dark transition-colors"
            >
              Open Laboratory 🚀
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Child Profile & Active Passions Card */}
        <section className="bg-white rounded-3xl p-6 border-2 border-lab-wood/20 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl shrink-0">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-base font-black text-text-dark">{childName}</span>
                <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {childGrade}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-1">
                Passions: {childInterests.length > 0 ? childInterests.slice(0, 5).join(", ") + "..." : "Space, Robotics, Chemistry"}
              </p>
            </div>
          </div>

          <Link
            href="/onboarding"
            className="text-xs font-black text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 transition-colors"
          >
            Customize 30+ Passions ➔
          </Link>
        </section>

        {/* Diagnostic Metrics Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white rounded-2xl p-4 border border-lab-wood/15 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-pip-blue/10 flex items-center justify-center text-pip-blue text-xl font-black shrink-0">
              <FlaskConical size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-text-dark">{completedMissionsCount}/8</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Missions Done</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-lab-wood/15 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-nature-green/10 flex items-center justify-center text-nature-green text-xl font-black shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-nature-green-dark">{strong.length}</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Concepts Mastered</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-lab-wood/15 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-factory-orange/10 flex items-center justify-center text-factory-orange text-xl font-black shrink-0">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-factory-orange-dark">
                {totalAttempts > 0 ? `${Math.round((totalCorrect / totalAttempts) * 100)}%` : "0%"}
              </p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Accuracy Rate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-lab-wood/15 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-black shrink-0">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-purple-900">{totalAttempts}</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Tests Run</p>
            </div>
          </div>
        </section>

        {/* Dynamic Natural Language Summary */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-lab-wood/15">
            <div className="flex items-center gap-2.5">
              <Sparkles className="text-amber-500 w-5 h-5" />
              <h2 className="text-lg font-black text-text-dark">
                AI Cognitive Summary for Parents
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
              Live Evaluation
            </span>
          </div>

          <div className="space-y-3 text-text-dark text-xs sm:text-sm leading-relaxed">
            <p className="font-bold">
              {strong.length > 0 
                ? `${childName} shows strong confidence in ${strong.map(s => `"${s.title}"`).slice(0, 3).join(', ')}.`
                : `${childName} is currently exploring foundational materials science concepts.`}
            </p>
            {developing.length > 0 && (
              <p className="text-text-muted">
                Developing concepts: {developing.map(d => d.title).join(", ")}.
              </p>
            )}
            {needsPractice.length > 0 && (
              <p className="text-rose-700 font-semibold">
                Needs practice: {needsPractice.map(n => n.title).join(", ")}.
              </p>
            )}
          </div>
        </section>

        {/* Recommended 5-Minute Home Conversations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-text-dark flex items-center gap-2">
              <BookOpen size={20} className="text-pip-blue" />
              <span>Recommended 5-Minute Home Experiments</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOME_ACTIVITIES.map((act, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-lab-wood/20 shadow-xs space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{act.emoji}</span>
                  <span className="text-[10px] font-bold text-text-muted bg-lab-chalk px-2 py-0.5 rounded">
                    {act.time}
                  </span>
                </div>
                <h3 className="font-black text-sm text-text-dark">{act.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{act.description}</p>
                <span className="inline-block text-[10px] font-black text-pip-blue bg-pip-blue/10 px-2 py-0.5 rounded">
                  Concept: {act.relevantConcept}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
