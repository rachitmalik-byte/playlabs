"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ExternalLink, 
  Film, 
  Tv, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";
import { speak, playClickSound, playDiscoverySound, playPopSound } from "@/lib/audio-manager";
import { KidTermTooltip } from "./KidTermTooltip";

export interface StoryScene {
  title: string;
  emoji: string;
  bgGradient: string;
  narration: string;
  subtitle: string;
  visualKey: "nature-vs-factory" | "polymer-chain" | "nylon-strength" | "flame-safety" | "insulator-wire" | "earth-timeline";
}

export interface VideoLesson {
  id: string;
  title: string;
  topic: string;
  youtubeId: string;
  youtubeUrl: string;
  duration: string;
  icon: string;
  pipSummary: string;
  scenes: StoryScene[];
  keyPoints: string[];
}

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: "origins-lesson",
    title: "Lesson 1: Natural vs Synthetic Materials",
    topic: "Chapter 3: Introduction to Fibres",
    youtubeId: "x7uQ-4Q-D6E", // Home Revise NCERT Class 8 Synthetic Fibres
    youtubeUrl: "https://www.youtube.com/watch?v=x7uQ-4Q-D6E",
    duration: "2 min",
    icon: "🌱",
    pipSummary: "Natural materials come directly from plants and animals (like cotton and wool). Synthetic materials are invented by scientists in factories using petroleum chemicals (like nylon and plastic)!",
    scenes: [
      {
        title: "Where Do Clothes Come From?",
        emoji: "🌿 🐑",
        bgGradient: "from-emerald-900 via-teal-950 to-slate-900",
        narration: "For thousands of years, humans only had natural fibres. Cotton from fluffy plants, wool from sheep, and silk from silkworms.",
        subtitle: "Natural fibres are grown by nature from living plants and animals.",
        visualKey: "nature-vs-factory"
      },
      {
        title: "The Chemical Revolution",
        emoji: "🏭 🧪",
        bgGradient: "from-amber-950 via-slate-900 to-indigo-950",
        narration: "In laboratories, scientists discovered how to use chemicals from crude oil and petroleum to make man-made synthetic fibres!",
        subtitle: "Synthetic fibres are made in factories using chemical reactions.",
        visualKey: "nature-vs-factory"
      },
      {
        title: "What is a Polymer?",
        emoji: "⛓️ 📿",
        bgGradient: "from-indigo-950 via-purple-950 to-slate-900",
        narration: "A polymer is a giant molecule made by linking thousands of small monomer units together, just like beads on a necklace!",
        subtitle: "Poly = Many. Mer = Unit or Part. Polymers are long molecular chains!",
        visualKey: "polymer-chain"
      }
    ],
    keyPoints: [
      "Natural fibres come from plants (Cotton 🌿) and animals (Wool 🐑, Silk 🐛)",
      "Synthetic fibres are prepared from petrochemicals in factories (Nylon 🧵, Polyester 👔)",
      "A polymer is composed of many small repeating chemical units called monomers!"
    ]
  },
  {
    id: "nylon-lesson",
    title: "Lesson 2: The Wonder Fibre — Nylon!",
    topic: "Tensile Strength & Parachutes",
    youtubeId: "NaViKcss8cE", // Magnet Brains Synthetic Fibres Chapter
    youtubeUrl: "https://www.youtube.com/watch?v=NaViKcss8cE",
    duration: "2 min",
    icon: "🧵",
    pipSummary: "Nylon was the world's first 100% synthetic fibre invented in 1931! A nylon thread is actually stronger than a steel wire of the same thickness.",
    scenes: [
      {
        title: "The Invention of Nylon",
        emoji: "🧗 🪂",
        bgGradient: "from-blue-950 via-indigo-950 to-slate-900",
        narration: "In 1931, Nylon was synthesized without using any plant or animal materials. It was made from coal, water, and air!",
        subtitle: "Nylon was the first fully synthetic fibre ever created.",
        visualKey: "nylon-strength"
      },
      {
        title: "Stronger than Steel!",
        emoji: "💪 ⛓️",
        bgGradient: "from-slate-900 via-blue-950 to-slate-950",
        narration: "Because its polymer chains are locked tightly in parallel lines, a thin nylon thread can hold over 120 kilograms without snapping!",
        subtitle: "Nylon has super high tensile strength, elasticity, and lustre.",
        visualKey: "nylon-strength"
      },
      {
        title: "Everyday Superpowers",
        emoji: "🧦 🪥 ⛺",
        bgGradient: "from-indigo-950 via-slate-900 to-teal-950",
        narration: "That is why nylon is chosen for rock-climbing ropes, parachutes, toothbrush bristles, and camping tents!",
        subtitle: "Lightweight, easy to wash, durable, and weather-resistant.",
        visualKey: "nylon-strength"
      }
    ],
    keyPoints: [
      "Nylon was invented in 1931 as the first fully synthetic polymer fibre.",
      "A nylon thread is stronger and more elastic than steel wire of the same thickness.",
      "Used in heavy-duty applications: parachutes, ropes, socks, bristles, and tents."
    ]
  },
  {
    id: "plastics-lesson",
    title: "Lesson 3: Plastics & The Environment",
    topic: "Insulators & Non-Biodegradable Science",
    youtubeId: "k3Q9L798tAk", // Dr. Binocs Show Plastic Pollution
    youtubeUrl: "https://www.youtube.com/watch?v=k3Q9L798tAk",
    duration: "3 min",
    icon: "⚡",
    pipSummary: "Plastics are poor conductors of heat and electricity — making them great wire coatings and kettle handles. But they take hundreds of years to decompose!",
    scenes: [
      {
        title: "Plastic: The Perfect Insulator",
        emoji: "🔌 🍳",
        bgGradient: "from-amber-950 via-slate-900 to-indigo-950",
        narration: "Plastics do not conduct electricity or heat. That is why they coat our electrical wires to prevent shocks and form cool pan handles!",
        subtitle: "Plastics are poor conductors (insulators) of heat and electricity.",
        visualKey: "insulator-wire"
      },
      {
        title: "The 500-Year Mystery",
        emoji: "⏳ 🌍",
        bgGradient: "from-stone-950 via-slate-900 to-amber-950",
        narration: "Unlike fruit peels and cotton which rot into soil, soil bacteria cannot eat synthetic plastic bonds. Plastic is non-biodegradable!",
        subtitle: "Plastic takes hundreds of years to decompose, creating environmental waste.",
        visualKey: "earth-timeline"
      },
      {
        title: "The 4R Principle for Earth",
        emoji: "♻️ 💚",
        bgGradient: "from-emerald-950 via-teal-950 to-slate-900",
        narration: "To protect our planet, remember the 4R principle: Reduce, Reuse, Recycle, and Recover!",
        subtitle: "Say no to single-use plastics and recycle responsibly.",
        visualKey: "earth-timeline"
      }
    ],
    keyPoints: [
      "Plastics are poor conductors (insulators) of both electricity and heat.",
      "Thermoplastics melt on heating and can be recycled and remolded.",
      "Plastics are non-biodegradable and persist in the environment for centuries."
    ]
  }
];

interface VideoLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLessonId?: string;
}

export function VideoLessonModal({
  isOpen,
  onClose,
  initialLessonId = "origins-lesson"
}: VideoLessonModalProps) {
  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [viewMode, setViewMode] = useState<"animated" | "youtube">("animated");
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentLesson = VIDEO_LESSONS.find(l => l.id === activeLessonId) || VIDEO_LESSONS[0];
  const currentScene = currentLesson.scenes[currentSceneIdx] || currentLesson.scenes[0];

  // Auto narrate scene when scene changes in animated mode
  useEffect(() => {
    if (isOpen && viewMode === "animated") {
      speak(`${currentScene.title}. ${currentScene.narration}`);
    }
  }, [isOpen, viewMode, activeLessonId, currentSceneIdx, currentScene]);

  const handleSelectLesson = (lesson: VideoLesson) => {
    playClickSound();
    setActiveLessonId(lesson.id);
    setCurrentSceneIdx(0);
    setIsPlaying(true);
  };

  const handleNextScene = () => {
    playPopSound();
    if (currentSceneIdx < currentLesson.scenes.length - 1) {
      setCurrentSceneIdx(currentSceneIdx + 1);
    } else {
      playDiscoverySound();
      setCurrentSceneIdx(0);
    }
  };

  const handlePrevScene = () => {
    playClickSound();
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(currentSceneIdx - 1);
    }
  };

  const handleReplayScene = () => {
    playPopSound();
    speak(currentScene.narration);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl border-4 border-pip-blue/30 shadow-warm overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-pip-blue-dark text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner shrink-0">
                🎬
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full">
                    Chapter 3 • Science Cinema
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Pip&apos;s Interactive Mini-Theater
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Player Mode Switcher */}
              <div className="bg-white/10 p-1 rounded-xl flex items-center gap-1 border border-white/20">
                <button
                  onClick={() => {
                    playClickSound();
                    setViewMode("animated");
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                    viewMode === "animated" ? "bg-white text-indigo-950 shadow-soft" : "text-white/80 hover:text-white"
                  }`}
                >
                  <Film size={13} />
                  <span>Animated Story 🎨</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setViewMode("youtube");
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                    viewMode === "youtube" ? "bg-fire-red text-white shadow-soft" : "text-white/80 hover:text-white"
                  }`}
                >
                  <Tv size={13} />
                  <span>YouTube Player 📺</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
                title="Close Theater"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Lesson Selector Tabs */}
          <div className="flex bg-lab-chalk border-b border-lab-wood/15 p-2 gap-2 overflow-x-auto">
            {VIDEO_LESSONS.map((lesson) => {
              const isActive = lesson.id === currentLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-pip-blue-dark shadow-soft border border-pip-blue/30 scale-102"
                      : "text-text-muted hover:text-text-dark hover:bg-white/60"
                  }`}
                >
                  <span className="text-base">{lesson.icon}</span>
                  <span>{lesson.title}</span>
                  <span className="text-[10px] text-text-light bg-lab-chalk px-1.5 py-0.5 rounded">
                    {lesson.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* ============================================================
                MODE 1: ANIMATED INTERACTIVE SCIENCE STORY PLAYER
                ============================================================ */}
            {viewMode === "animated" ? (
              <div className="space-y-4">
                {/* Visual Animated Canvas */}
                <div className={`relative w-full aspect-video sm:aspect-[16/8.5] rounded-3xl overflow-hidden shadow-medium border-4 border-lab-wood/20 p-6 flex flex-col justify-between bg-gradient-to-br ${currentScene.bgGradient} text-white`}>
                  
                  {/* Scene Number Header */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-yellow-300 border border-white/20">
                      Scene {currentSceneIdx + 1} of {currentLesson.scenes.length}
                    </span>

                    <button
                      onClick={handleReplayScene}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold text-white transition-colors"
                      title="Replay Voice Narration"
                    >
                      <Volume2 size={14} />
                      <span>Hear Pip 🗣️</span>
                    </button>
                  </div>

                  {/* Scene Animated Visuals */}
                  <div className="my-auto text-center flex flex-col items-center justify-center relative z-10">
                    <motion.div
                      key={`${currentLesson.id}-${currentSceneIdx}`}
                      initial={{ scale: 0.8, opacity: 0, y: 15 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-6xl sm:text-7xl mb-3 filter drop-shadow-md animate-bounce">
                        {currentScene.emoji}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-2 drop-shadow-sm">
                        {currentScene.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed px-4">
                        {currentScene.subtitle}
                      </p>
                    </motion.div>
                  </div>

                  {/* Subtitle / Narration Bar */}
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 text-center border border-white/15 z-10">
                    <p className="text-xs sm:text-sm text-yellow-200 font-bold leading-relaxed">
                      &ldquo;{currentScene.narration}&rdquo;
                    </p>
                  </div>

                  {/* Background particle sparkles */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <span className="absolute top-6 left-8 text-3xl animate-pulse">✨</span>
                    <span className="absolute bottom-10 right-10 text-3xl animate-spin">⚛️</span>
                    <span className="absolute top-1/2 left-10 text-2xl">🔬</span>
                  </div>
                </div>

                {/* Player Navigation & Controls */}
                <div className="flex items-center justify-between gap-4 bg-lab-chalk p-3 rounded-2xl border border-lab-wood/20">
                  <button
                    onClick={handlePrevScene}
                    disabled={currentSceneIdx === 0}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      currentSceneIdx === 0
                        ? "text-text-light/40 cursor-not-allowed"
                        : "bg-white text-text-dark hover:bg-lab-warm shadow-xs"
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span>Previous Scene</span>
                  </button>

                  {/* Scene Indicators */}
                  <div className="flex items-center gap-2">
                    {currentLesson.scenes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playPopSound();
                          setCurrentSceneIdx(idx);
                        }}
                        className={`h-2.5 rounded-full transition-all ${
                          idx === currentSceneIdx
                            ? "w-8 bg-pip-blue"
                            : "w-2.5 bg-lab-wood-light/40 hover:bg-lab-wood"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextScene}
                    className="flex items-center gap-1 px-5 py-2 rounded-xl bg-pip-blue hover:bg-pip-blue-dark text-white font-extrabold text-xs shadow-soft transition-all"
                  >
                    <span>{currentSceneIdx < currentLesson.scenes.length - 1 ? "Next Scene" : "Replay Lesson"}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* ============================================================
                  MODE 2: YOUTUBE PLAYER WITH FALLBACK LINK
                  ============================================================ */
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-medium border-4 border-lab-wood/20">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentLesson.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentLesson.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="flex justify-between items-center px-2">
                  <span className="text-xs text-text-muted">
                    If video does not play in your browser:
                  </span>
                  <a
                    href={currentLesson.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-fire-red hover:underline"
                  >
                    <span>Open in YouTube App ↗</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* Pip's Key Takeaway Summary */}
            <div className="bg-gradient-to-br from-pip-blue/8 to-hint-yellow/10 rounded-2xl p-5 border-2 border-pip-blue/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <h4 className="font-extrabold text-sm text-text-dark">
                    Pip&apos;s Core Lesson Takeaways:
                  </h4>
                </div>

                <button
                  onClick={() => {
                    playPopSound();
                    speak(currentLesson.pipSummary);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-pip-blue hover:text-pip-blue-dark bg-white px-3 py-1 rounded-full border border-pip-blue/20 shadow-xs"
                >
                  <Volume2 size={14} />
                  <span>Listen to Takeaways 🗣️</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-text-dark font-medium leading-relaxed mb-4">
                &ldquo;{currentLesson.pipSummary}&rdquo;
              </p>

              <div className="space-y-2 pt-2 border-t border-lab-wood/15">
                {currentLesson.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-text-dark">
                    <CheckCircle2 size={15} className="text-nature-green mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="bg-white border-t border-lab-wood/15 p-4 flex items-center justify-between">
            <span className="text-xs text-text-muted font-medium">
              💡 Ready to test these superpowers in the laboratory?
            </span>

            <motion.button
              onClick={() => {
                playDiscoverySound();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-nature-green hover:bg-nature-green-dark text-white font-extrabold text-sm shadow-soft flex items-center gap-2 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Got it! Let&apos;s Experiment in the Lab 🚀</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
