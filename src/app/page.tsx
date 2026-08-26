"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Laboratory } from "@/components/world/Laboratory";
import { WordScrambleGame } from "@/components/learning/WordScrambleGame";
import { KidTermTooltip } from "@/components/learning/KidTermTooltip";
import { 
  Volume2, 
  VolumeX, 
  Music, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Users,
  FlaskConical,
  Award,
  Layers,
  Lock,
  Compass,
  Play
} from "lucide-react";
import {
  speak,
  toggleBackgroundMusic,
  getIsMusicPlaying,
  getIsVoiceEnabled,
  setVoiceEnabled,
  playDiscoverySound,
  playPopSound,
  playClickSound,
  setupGlobalAudioUnlock
} from "@/lib/audio-manager";

const CHAPTERS = [
  {
    id: "ch-1",
    number: "Chapter 1",
    title: "Plant Life & Living Cells",
    icon: "🌱",
    grade: "Grade 5 Science",
    topics: "Roots, Stems, Leaves & Photosynthesis",
    status: "coming-soon",
    tag: "Coming Soon",
    color: "from-emerald-500/10 to-teal-500/5",
    borderColor: "border-emerald-200"
  },
  {
    id: "ch-2",
    number: "Chapter 2",
    title: "Electricity, Circuits & Conductors",
    icon: "⚡",
    grade: "Grade 6 Science",
    topics: "Cells, Bulbs, Switches & Safe Currents",
    status: "coming-soon",
    tag: "Coming Soon",
    color: "from-amber-500/10 to-yellow-500/5",
    borderColor: "border-amber-200"
  },
  {
    id: "ch-3",
    number: "Chapter 3",
    title: "Synthetic Fibres & Plastics: The World of Materials",
    icon: "🧵",
    grade: "Grade 5–8 Science (Active)",
    topics: "Natural vs Synthetic • Nylon • Polyester • Flame Safety • Polymer Chains • Insulators",
    status: "active",
    tag: "⭐ Complete & Interactive",
    image: "/images/nylon_climbing_rope.jpg",
    previewImage: "/images/cotton_plant_fabric.jpg",
    route: "/play",
    color: "from-pip-blue/15 via-indigo-500/10 to-purple-500/5",
    borderColor: "border-pip-blue ring-2 ring-pip-blue/30 shadow-medium"
  },
  {
    id: "ch-4",
    number: "Chapter 4",
    title: "Forces, Friction & Simple Machines",
    icon: "⚙️",
    grade: "Grade 6–7 Science",
    topics: "Pulleys, Levers, Wheels & Gravity",
    status: "coming-soon",
    tag: "Coming Soon",
    color: "from-orange-500/10 to-red-500/5",
    borderColor: "border-orange-200"
  },
  {
    id: "ch-5",
    number: "Chapter 5",
    title: "Water Cycle & Natural Resources",
    icon: "💧",
    grade: "Grade 5–7 Science",
    topics: "Evaporation, Condensation & Conservation",
    status: "coming-soon",
    tag: "Coming Soon",
    color: "from-blue-500/10 to-cyan-500/5",
    borderColor: "border-blue-200"
  }
];

export default function TableOfContentsPage() {
  const [musicOn, setMusicOn] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"chapters" | "word-game">("chapters");
  const router = useRouter();

  useEffect(() => {
    setupGlobalAudioUnlock();
    setMusicOn(getIsMusicPlaying());
    setVoiceOn(getIsVoiceEnabled());
  }, []);

  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = toggleBackgroundMusic();
    setMusicOn(nextState);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !voiceOn;
    setVoiceEnabled(nextState);
    setVoiceOn(nextState);
    if (nextState) {
      speak("Voice narration activated!");
    }
  };

  return (
    <Laboratory variant="full">
      <div className="min-h-screen pb-16 pt-4 px-4 sm:px-6 max-w-5xl mx-auto">
        
        {/* Top Wayground Header */}
        <header className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-lab-wood/20 shadow-soft mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pip-blue to-indigo-600 flex items-center justify-center text-white text-2xl shadow-soft font-black shrink-0">
              🔬
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Science Explorer • Grade 5–8 Curriculum
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-text-dark tracking-tight">
                PlayLabs Interactive Textbook
              </h1>
            </div>
          </div>

          {/* Controls: Music, Voice, Parent Portal */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMusic}
              className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1 text-xs font-bold ${
                musicOn
                  ? "bg-purple-100 border-purple-300 text-purple-900 shadow-soft"
                  : "bg-white border-lab-wood/20 text-text-muted hover:bg-lab-chalk"
              }`}
              title="Toggle Cheerful Children's Music"
            >
              <Music size={15} />
              <span>{musicOn ? "Music On" : "Music Off"}</span>
            </button>

            <button
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1 text-xs font-bold ${
                voiceOn
                  ? "bg-blue-100 border-blue-300 text-blue-900 shadow-soft"
                  : "bg-white border-lab-wood/20 text-text-muted hover:bg-lab-chalk"
              }`}
              title="Toggle Pip Voice Narration"
            >
              {voiceOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>{voiceOn ? "Voice On" : "Muted"}</span>
            </button>

            <Link
              href="/parent"
              onClick={() => playClickSound()}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-soft flex items-center gap-1.5 transition-all"
            >
              <Users size={15} />
              <span>Parent Portal 👨‍👩‍👧</span>
            </Link>
          </div>
        </header>

        {/* View Switcher: Table of Contents vs Word Scramble Mini-Game */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-lab-wood/20 shadow-soft flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setSelectedTab("chapters");
              }}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                selectedTab === "chapters"
                  ? "bg-pip-blue text-white shadow-soft"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              <BookOpen size={16} />
              <span>Table of Contents (Chapters) 📖</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setSelectedTab("word-game");
                speak("Try the Science Word Scramble! Spell the words with letter tiles!");
              }}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                selectedTab === "word-game"
                  ? "bg-amber-500 text-white shadow-soft"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              <Sparkles size={16} />
              <span>Science Word Scramble 🧩</span>
            </button>
          </div>
        </div>

        {/* ============================================================
            TAB 1: TABLE OF CONTENTS (CHAPTERS)
            ============================================================ */}
        {selectedTab === "chapters" && (
          <div className="space-y-6">
            
            {/* Pip Welcome Speech */}
            <div className="speech-bubble bg-white p-5 rounded-3xl shadow-soft border-2 border-lab-wood/20 mb-6 text-center max-w-2xl mx-auto">
              <p className="text-base sm:text-lg font-extrabold text-text-dark">
                👋 &ldquo;Welcome to our Science Textbook! Choose <strong className="text-pip-blue">Chapter 3</strong> below to enter the Materials Laboratory!&rdquo;
              </p>
            </div>

            {/* Chapters Grid */}
            <div className="space-y-4">
              {CHAPTERS.map((ch) => {
                const isActive = ch.status === "active";

                if (isActive) {
                  return (
                    <motion.div
                      key={ch.id}
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white rounded-3xl border-3 border-pip-blue p-6 sm:p-8 shadow-warm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all"
                    >
                      {/* Left Side: Images and Title */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left flex-1">
                        {/* Generated Image Thumbnail */}
                        <div className="relative shrink-0">
                          <img
                            src={ch.image}
                            alt={ch.title}
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-pip-blue/30 shadow-soft"
                          />
                          <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                            ⭐
                          </span>
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <span className="text-xs font-black uppercase tracking-wider text-pip-blue bg-pip-blue/10 px-3 py-1 rounded-full">
                              {ch.number} • {ch.grade}
                            </span>
                            <span className="text-[11px] font-extrabold bg-nature-green text-white px-2.5 py-0.5 rounded-full shadow-xs">
                              {ch.tag}
                            </span>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-black text-text-dark tracking-tight">
                            {ch.title}
                          </h2>

                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl">
                            Explore <KidTermTooltip term="natural" displayText="natural fibres" /> vs <KidTermTooltip term="synthetic" displayText="synthetic polymers" />, test <KidTermTooltip term="tensile strength" displayText="nylon tensile strength" />, inspect <KidTermTooltip term="insulator" displayText="insulators" />, and explore the 1000x Microscope Lab!
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-[10px] font-bold bg-lab-chalk text-text-dark px-2.5 py-1 rounded-lg border border-lab-wood/15">
                              🎥 3 Video Lessons
                            </span>
                            <span className="text-[10px] font-bold bg-lab-chalk text-text-dark px-2.5 py-1 rounded-lg border border-lab-wood/15">
                              🔬 1000x Zoom Lab
                            </span>
                            <span className="text-[10px] font-bold bg-lab-chalk text-text-dark px-2.5 py-1 rounded-lg border border-lab-wood/15">
                              🧪 Polymer Builder
                            </span>
                            <span className="text-[10px] font-bold bg-lab-chalk text-text-dark px-2.5 py-1 rounded-lg border border-lab-wood/15">
                              8 Science Missions
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Button */}
                      <div className="shrink-0 w-full md:w-auto">
                        <Link
                          href="/play"
                          onClick={() => {
                            playDiscoverySound();
                            speak("Opening Chapter 3! Entering the Materials Laboratory!");
                          }}
                          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-black text-base shadow-medium flex items-center justify-center gap-2 transition-all hover:scale-105"
                        >
                          <span>Open Chapter 3 Lab 🚀</span>
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                }

                // Inactive / Coming Soon Chapters
                return (
                  <div
                    key={ch.id}
                    className="bg-white/80 rounded-3xl border-2 border-lab-wood/15 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 opacity-75 hover:opacity-90 transition-all"
                  >
                    <div className="flex items-center gap-4 text-center sm:text-left">
                      <div className="w-14 h-14 rounded-2xl bg-lab-chalk flex items-center justify-center text-3xl shrink-0 border border-lab-wood/15">
                        {ch.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <span className="text-[11px] font-black text-text-muted">
                            {ch.number} • {ch.grade}
                          </span>
                          <span className="text-[10px] font-bold bg-lab-chalk text-text-light px-2 py-0.5 rounded-full">
                            {ch.tag}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-text-dark">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-text-muted mt-0.5">
                          Topics: {ch.topics}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-text-light bg-lab-chalk px-3.5 py-1.5 rounded-xl border border-lab-wood/15 shrink-0">
                      <Lock size={13} />
                      <span>Unlocks in Next Unit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 2: SCIENCE WORD SCRAMBLE MINI-GAME
            ============================================================ */}
        {selectedTab === "word-game" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <WordScrambleGame />
          </motion.div>
        )}

      </div>
    </Laboratory>
  );
}
