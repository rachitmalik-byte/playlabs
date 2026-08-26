"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Users, BookOpen, Compass, ArrowLeft } from "lucide-react";
import { playClickSound, getVoicePersona, setVoicePersona, speak } from "@/lib/audio-manager";

const TRAIL_NODES = [
  { id: "origins", icon: "🌱", label: "Origins", route: "/play/origins" },
  { id: "fibres", icon: "🧵", label: "Fibres", route: "/play/fibres" },
  { id: "experiments", icon: "🔬", label: "Experiments", route: "/play/experiments" },
  { id: "safety", icon: "🔥", label: "Safety", route: "/play/safety" },
  { id: "plastic", icon: "⚡", label: "Plastic", route: "/play/plastic" },
  { id: "environment", icon: "🌍", label: "Environment", route: "/play/environment" },
  { id: "extras", icon: "🔧", label: "More", route: "/play/extras" },
  { id: "final-mission", icon: "🏕️", label: "Final", route: "/play/final-mission" },
];

export function LearningTrail({
  completedMissions = [],
  unlockedMissions = ["origins", "fibres", "experiments", "safety", "plastic", "environment", "extras", "final-mission"],
}: {
  completedMissions?: string[];
  unlockedMissions?: string[];
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  // Find current mission index
  const currentIndex = TRAIL_NODES.findIndex((n) => pathname.startsWith(n.route));

  return (
    <>
      {/* Desktop Trail — top navigation bar with Parent Portal button */}
      <div className="hidden md:block sticky top-0 z-40">
        <div className="bg-white/95 backdrop-blur-md border-b border-lab-wood/15 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-2.5">
            <div className="flex items-center justify-between gap-4">
              
              {/* Chapter Badge & Back to Map */}
              <div className="flex items-center gap-3">
                <Link
                  href="/play"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-extrabold text-xs border border-lab-wood/20 transition-all shadow-xs"
                >
                  <ArrowLeft size={14} />
                  <span>Map</span>
                </Link>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider">
                    Chapter 3 • Science Curriculum
                  </span>
                  <span className="text-xs font-black text-text-dark">
                    Synthetic Fibres & Plastics
                  </span>
                </div>
              </div>

              {/* Trail nodes step indicator */}
              <div className="flex items-center gap-1 bg-lab-chalk/70 p-1 rounded-2xl border border-lab-wood/15">
                {TRAIL_NODES.map((node, i) => {
                  const isCompleted = completedMissions.includes(node.id);
                  const isCurrent = pathname.startsWith(node.route);
                  const isUnlocked =
                    unlockedMissions.includes(node.id) || isCompleted;

                  return (
                    <div key={node.id} className="flex items-center">
                      {i > 0 && (
                        <div
                          className={`w-3 h-0.5 mx-0.5 rounded-full transition-colors ${
                            isCompleted
                              ? "bg-success"
                              : i <= currentIndex
                              ? "bg-pip-blue/40"
                              : "bg-lab-wood-light/30"
                          }`}
                        />
                      )}

                      {isUnlocked ? (
                        <Link href={node.route} onClick={() => playClickSound()}>
                          <motion.div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all ${
                              isCurrent
                                ? "bg-pip-blue text-white shadow-soft font-black scale-110"
                                : isCompleted
                                ? "bg-nature-green text-white font-bold"
                                : "bg-white border border-lab-wood/20 text-text-muted hover:border-pip-blue/40"
                            }`}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            title={`Mission ${i + 1}: ${node.label}`}
                          >
                            {node.icon}
                          </motion.div>
                        </Link>
                      ) : (
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs bg-lab-chalk text-text-light/50 border border-lab-wood/10 opacity-50"
                          title={`${node.label} (locked)`}
                        >
                          {node.icon}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: Voice Switcher, Discovery Book & Parent Portal */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    const personas: ("child" | "educator" | "adventurer")[] = ["child", "educator", "adventurer"];
                    const current = getVoicePersona();
                    const next = personas[(personas.indexOf(current) + 1) % personas.length];
                    setVoicePersona(next);
                    speak(`Voice switched to ${next === "child" ? "Pip Child" : next === "educator" ? "Professor Jenny" : "Explorer Guy"}!`);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-xs border border-purple-200 transition-all shadow-xs"
                  title="Switch Natural Voice Persona (Pip / Professor Jenny / Explorer Guy)"
                >
                  <span>🎙️</span>
                  <span>Natural Voice</span>
                </button>

                <Link
                  href="/play/discovery-book"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 transition-all shadow-xs"
                >
                  <BookOpen size={14} className="text-pip-blue" />
                  <span>My Book</span>
                </Link>

                {/* PARENT DASHBOARD BUTTON IN NAVIGATION BAR */}
                <Link
                  href="/parent"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-soft transition-all"
                  title="Switch to Parent Diagnostic Portal"
                >
                  <Users size={14} />
                  <span>Parent Portal 👨‍👩‍👧</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Trail — compact collapsible navbar with Parent Portal */}
      <div className="md:hidden sticky top-0 z-40">
        <div className="bg-white/95 backdrop-blur-md border-b border-lab-wood/15 shadow-xs px-4 py-2 flex items-center justify-between gap-2">
          
          <Link
            href="/play"
            onClick={() => playClickSound()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-lab-chalk text-xs font-bold border border-lab-wood/20"
          >
            <ArrowLeft size={12} />
            <span>Map</span>
          </Link>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 px-2 py-1 flex items-center justify-center gap-1.5 text-xs font-extrabold text-text-dark"
          >
            <span>{currentIndex >= 0 ? TRAIL_NODES[currentIndex].icon : "🌱"}</span>
            <span>{currentIndex >= 0 ? TRAIL_NODES[currentIndex].label : "Chapter 3: Synthetic Fibres"}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Mobile Parent Button */}
          <Link
            href="/parent"
            onClick={() => playClickSound()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-extrabold shadow-xs"
          >
            <Users size={12} />
            <span>Parents</span>
          </Link>
        </div>

        {/* Expanded mobile trail dropdown */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-lab-wood/15 px-4 py-3 shadow-medium"
          >
            <div className="flex flex-wrap gap-2">
              {TRAIL_NODES.map((node) => {
                const isCurrent = pathname.startsWith(node.route);
                return (
                  <Link
                    key={node.id}
                    href={node.route}
                    onClick={() => {
                      playClickSound();
                      setIsExpanded(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-pip-blue text-white shadow-soft"
                        : "bg-lab-chalk text-text-dark hover:bg-lab-warm"
                    }`}
                  >
                    <span>{node.icon}</span>
                    <span>{node.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
