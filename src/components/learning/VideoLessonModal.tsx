"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, BookOpen, Volume2, CheckCircle2, Video } from "lucide-react";
import { speak, playClickSound, playDiscoverySound } from "@/lib/audio-manager";

export interface VideoLesson {
  id: string;
  title: string;
  topic: string;
  youtubeId: string;
  duration: string;
  icon: string;
  pipSummary: string;
  keyPoints: string[];
}

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: "origins-lesson",
    title: "Natural vs Synthetic Materials",
    topic: "Introduction to Materials",
    youtubeId: "v4yR_U2x6bE", // Educational video on materials
    duration: "2 min",
    icon: "🌱",
    pipSummary: "Natural materials come directly from plants and animals (like cotton and wool). Synthetic materials are man-made in factories using petrochemicals (like nylon and plastic)!",
    keyPoints: [
      "Natural fibres are grown by nature (Cotton 🌿, Wool 🐑, Silk 🐛)",
      "Synthetic fibres are invented by scientists in chemical labs (Nylon 🧵, Polyester 👔)",
      "A 'Polymer' is many small chemical units joined together like a long beaded necklace!"
    ]
  },
  {
    id: "nylon-lesson",
    title: "Why is Nylon Stronger than Steel?",
    topic: "Tensile Strength & Polymers",
    youtubeId: "7_VTHbC9NnE",
    duration: "2 min",
    icon: "🔬",
    pipSummary: "Nylon was the first fully synthetic fibre invented in 1931! A nylon thread is actually stronger than a steel wire of the same thickness.",
    keyPoints: [
      "Nylon uses no natural plant or animal raw materials — made from coal, water, and air.",
      "Extremely lightweight, elastic, lustrous, and easy to wash.",
      "Used for parachutes, rock-climbing ropes, socks, and toothbrush bristles."
    ]
  },
  {
    id: "plastics-lesson",
    title: "Plastics & Non-Biodegradable Science",
    topic: "Insulation & Environment",
    youtubeId: "f0Z1mF8_5Y4",
    duration: "3 min",
    icon: "⚡",
    pipSummary: "Plastics are poor conductors of heat and electricity — making them great wire coatings and kettle handles. But they take hundreds of years to decompose!",
    keyPoints: [
      "Plastics are electrical and heat insulators (protects us from electric shocks & burns).",
      "Thermoplastics melt on heating (can be recycled and reshaped).",
      "Plastics are non-biodegradable: bacteria in soil cannot eat or digest synthetic polymer bonds."
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
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const currentLesson = VIDEO_LESSONS.find(l => l.id === activeLessonId) || VIDEO_LESSONS[0];

  const handleSelectLesson = (lesson: VideoLesson) => {
    playClickSound();
    setActiveLessonId(lesson.id);
    setIsPlayingVideo(false);
    speak(`Lesson: ${lesson.title}. ${lesson.pipSummary}`);
  };

  const handleReadSummary = () => {
    playClickSound();
    speak(currentLesson.pipSummary);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl border-4 border-pip-blue/30 shadow-warm overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-pip-blue via-pip-blue-dark to-indigo-600 text-white p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
                🎬
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-wide">
                  Pip&apos;s Mini-Theater: Video Lessons
                </h2>
                <p className="text-xs text-white/80 font-medium">
                  Watch quick visual explainers before jumping into the science experiments!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
              title="Close Theater"
            >
              <X size={18} />
            </button>
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
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Video Player / Illustrated Screen */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-medium border-2 border-lab-wood/20 flex items-center justify-center">
              {isPlayingVideo ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentLesson.youtubeId}?autoplay=1&rel=0`}
                  title={currentLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
                  {/* Floating particles background effect */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <span className="absolute top-4 left-6 text-4xl animate-pulse">✨</span>
                    <span className="absolute bottom-6 right-8 text-4xl animate-bounce">🔬</span>
                    <span className="absolute top-1/2 left-8 text-3xl animate-spin">⚛️</span>
                  </div>

                  <span className="text-6xl mb-3">{currentLesson.icon}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 max-w-md">
                    {currentLesson.title}
                  </h3>
                  <p className="text-xs text-indigo-200 mb-6 max-w-sm">
                    {currentLesson.topic} • Short 2-min interactive visual lesson
                  </p>

                  <motion.button
                    onClick={() => {
                      playDiscoverySound();
                      setIsPlayingVideo(true);
                    }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-fire-red to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-warm flex items-center gap-2 transition-all cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={18} fill="currentColor" />
                    <span>Watch Video Lesson 🎥</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Pip's Takeaways and Speech Bubble */}
            <div className="bg-gradient-to-br from-pip-blue/8 to-hint-yellow/10 rounded-2xl p-5 border-2 border-pip-blue/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <h4 className="font-extrabold text-sm text-text-dark">
                    Pip&apos;s Key Science Takeaways:
                  </h4>
                </div>
                <button
                  onClick={handleReadSummary}
                  className="flex items-center gap-1 text-xs font-bold text-pip-blue hover:text-pip-blue-dark bg-white px-3 py-1 rounded-full border border-pip-blue/20 shadow-xs"
                >
                  <Volume2 size={14} />
                  <span>Listen to Pip 🗣️</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-text-dark font-medium leading-relaxed mb-4">
                &ldquo;{currentLesson.pipSummary}&rdquo;
              </p>

              <div className="space-y-2 pt-2 border-t border-lab-wood/15">
                {currentLesson.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                    <CheckCircle2 size={14} className="text-nature-green mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="bg-white border-t border-lab-wood/15 p-4 flex items-center justify-between">
            <span className="text-xs text-text-muted font-medium">
              💡 Ready to test this in the lab?
            </span>

            <motion.button
              onClick={() => {
                playDiscoverySound();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-nature-green hover:bg-nature-green-dark text-white font-extrabold text-sm shadow-soft flex items-center gap-2 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Got it! Let&apos;s Experiment 🚀</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
