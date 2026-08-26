"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  FlaskConical
} from "lucide-react";
import { playClickSound, playPopSound } from "@/lib/audio-manager";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-lab-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pip-blue border-t-transparent" />
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
  const notStarted = conceptsArray.filter((c) => !c.attempts || c.attempts === 0);

  // Generate dynamic Natural Language Insights based on actual child gameplay
  const generateDynamicInsights = () => {
    if (totalAttempts === 0) {
      return (
        <div className="text-text-muted space-y-2">
          <p className="text-base text-text-dark font-semibold">
            🌱 Your child has just stepped into the lab!
          </p>
          <p className="text-sm leading-relaxed">
            As your child explores missions (sorting natural vs synthetic materials, testing tensile strength, and running flame/sweat tests), real-time diagnostic insights will populate here automatically.
          </p>
        </div>
      );
    }

    const strengthsText = strong.length > 0 
      ? `Your child shows strong confidence in ${strong.map(s => `"${s.title}"`).slice(0, 3).join(', ')}.`
      : "Your child is building initial foundational intuition across material types.";

    const developingText = developing.length > 0
      ? `They are currently developing their understanding of ${developing.map(d => `"${d.title}"`).slice(0, 2).join(' and ')} through hands-on testing.`
      : "";

    const struggleText = needsPractice.length > 0
      ? `They encountered some tricky questions on ${needsPractice.map(n => `"${n.title}"`).join(', ')}. Revisiting the interactive experiments will help solidify the underlying science!`
      : "They have maintained high accuracy across their completed experiments!";

    return (
      <div className="space-y-3 text-text-dark leading-relaxed">
        <p className="text-base font-medium">
          {strengthsText}
        </p>
        {developingText && (
          <p className="text-sm text-text-muted">
            {developingText}
          </p>
        )}
        <p className="text-sm text-text-muted">
          {struggleText}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-lab-cream text-text-dark pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-lab-wood/15 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-text-dark tracking-tight">
                Parent Diagnostic Portal
              </h1>
              <p className="text-xs text-text-muted">
                Real-Time Material Science Mastery & Learning Insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-lab-chalk hover:bg-lab-warm text-text-dark border border-lab-wood/20 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/play"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-pip-blue text-white shadow-soft hover:bg-pip-blue-dark transition-colors"
            >
              Open Child Playground 🚀
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Quick Diagnostic Metrics Bar */}
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
            <div className="w-12 h-12 rounded-xl bg-hint-yellow/15 flex items-center justify-center text-earth-brown text-xl font-black shrink-0">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-text-dark">{totalAttempts}</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Tests Run</p>
            </div>
          </div>
        </section>

        {/* Dynamic Natural Language Summary Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-text-dark">
                What Your Child Understands
              </h2>
            </div>
            <span className="text-[11px] font-bold text-pip-blue bg-pip-blue/10 px-3 py-1 rounded-full">
              Live Diagnostic Analysis
            </span>
          </div>

          {generateDynamicInsights()}
        </section>

        {/* Real Concept Mastery Breakdown */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-text-dark">
                Concept Mastery Breakdown
              </h2>
            </div>
            <span className="text-xs text-text-muted font-semibold">
              Grade 8 NCERT Materials Curriculum
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {conceptsArray.map((concept) => {
              const attempts = concept.attempts || 0;
              const correct = concept.correctAttempts || 0;
              const isMastered = concept.mastery === "mastered" || (attempts >= 2 && correct / attempts >= 0.75);
              const isDeveloping = concept.mastery === "understood" || concept.mastery === "developing";
              const isStruggling = attempts > 0 && correct / attempts < 0.5;

              return (
                <div
                  key={concept.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isMastered
                      ? "bg-nature-green/6 border-nature-green/25"
                      : isDeveloping
                      ? "bg-factory-orange/6 border-factory-orange/25"
                      : isStruggling
                      ? "bg-fire-red/6 border-fire-red/25"
                      : "bg-lab-chalk/40 border-lab-wood/15 opacity-70"
                  }`}
                >
                  <div>
                    <h3 className="font-extrabold text-sm text-text-dark capitalize">
                      {concept.title || concept.id.replace(/_/g, " ")}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                      {concept.simpleExplanation || "Core material science concept."}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-text-muted font-bold">
                      <span>Attempts: {attempts}</span>
                      <span>•</span>
                      <span>Correct: {correct}</span>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isMastered
                        ? "bg-nature-green/15 text-nature-green-dark"
                        : isDeveloping
                        ? "bg-factory-orange/15 text-factory-orange-dark"
                        : isStruggling
                        ? "bg-fire-red/15 text-fire-red"
                        : "bg-lab-chalk text-text-light"
                    }`}
                  >
                    {isMastered ? "Strong ✓" : isDeveloping ? "Developing ◐" : isStruggling ? "Practice ○" : "Not Started"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Real Live Activity Log */}
        {state.activityLog && state.activityLog.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h2 className="text-lg sm:text-xl font-extrabold text-text-dark">
                  Recent Learning Activity & Observations
                </h2>
              </div>
              <span className="text-xs text-text-muted font-semibold">
                Last {state.activityLog.length} actions
              </span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {state.activityLog.slice(0, 10).map((log: ActivityLogEntry) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-lab-chalk/60 border border-lab-wood/15 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-base ${log.isCorrect ? "text-nature-green" : "text-factory-orange"}`}>
                      {log.isCorrect ? "✅" : "💡"}
                    </span>
                    <div>
                      <p className="font-extrabold text-text-dark">{log.conceptName}</p>
                      <p className="text-text-muted text-[11px]">{log.note}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-text-light shrink-0 font-medium">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Offline Home Activities */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏠</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-text-dark">
                5-Minute Offline Science Activities
              </h2>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Quick, meaningful parent-child questions to connect screen learning to the physical world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOME_ACTIVITIES.map((act) => (
              <div
                key={act.title}
                className="p-5 rounded-2xl bg-gradient-to-b from-white to-lab-warm/30 border border-lab-wood/20 shadow-xs flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{act.emoji}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-lab-chalk text-text-dark rounded-full border border-lab-wood/20">
                      ⏱️ {act.time}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-text-dark mb-1">
                    {act.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-lab-wood/10 text-[10px] font-bold text-pip-blue-dark">
                  Target: {act.relevantConcept}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tester & Parent Tools: Simulate / Reset Live Progress */}
        <section className="bg-lab-chalk rounded-2xl p-4 border border-lab-wood/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-xs font-extrabold text-text-dark">
              Diagnostic Data Management
            </p>
            <p className="text-[11px] text-text-muted">
              Data is saved securely in your browser cache and updates in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                seedSampleData();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-lab-wood/30 hover:bg-lab-warm text-text-dark text-xs font-bold transition-all shadow-xs"
              title="Populate realistic child gameplay data"
            >
              🎮 Simulate Child Progress
            </button>
            <button
              onClick={() => {
                playPopSound();
                resetProgress();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-fire-red/30 hover:bg-fire-red/10 text-fire-red text-xs font-bold transition-all shadow-xs"
              title="Clear all saved progress"
            >
              🔄 Reset Data
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
