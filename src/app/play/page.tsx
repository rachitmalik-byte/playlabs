"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { VideoLessonModal } from "@/components/learning/VideoLessonModal";
import { MicroscopeViewer } from "@/components/learning/MicroscopeViewer";
import { PolymerChainBuilder } from "@/components/learning/PolymerChainBuilder";
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  Video, 
  FlaskConical, 
  Layers, 
  Award,
  ArrowRight,
  Compass
} from "lucide-react";
import { playClickSound, playDiscoverySound, speak } from "@/lib/audio-manager";

const MISSIONS = [
  {
    id: "origins",
    icon: "🌱",
    title: "Mission 1: Origins",
    subtitle: "What are things made from? Sort Nature vs Factory!",
    route: "/play/origins",
    tag: "Core Concept",
    color: "from-nature-green/15 to-nature-green/5",
    borderColor: "border-nature-green/30 hover:border-nature-green",
    unlocked: true,
  },
  {
    id: "fibres",
    icon: "🧵",
    title: "Mission 2: Meet the Fabrics",
    subtitle: "Discover Cotton, Nylon, Polyester, and Acrylic superpowers!",
    route: "/play/fibres",
    tag: "Fabrics Lab",
    color: "from-pip-blue/15 to-pip-blue/5",
    borderColor: "border-pip-blue/30 hover:border-pip-blue",
    unlocked: true,
  },
  {
    id: "experiments",
    icon: "🔬",
    title: "Mission 3: Strength & Shop Tests",
    subtitle: "Nylon 120kg Tensile Test + Polyester Shop Investigation!",
    route: "/play/experiments",
    tag: "Lab Test",
    color: "from-factory-orange/15 to-factory-orange/5",
    borderColor: "border-factory-orange/30 hover:border-factory-orange",
    unlocked: true,
  },
  {
    id: "safety",
    icon: "🔥",
    title: "Mission 4: Safety & Flame Tests",
    subtitle: "Why synthetic clothes melt near fire & summer sweat absorption!",
    route: "/play/safety",
    tag: "Crucial Safety",
    color: "from-fire-red/15 to-fire-red/5",
    borderColor: "border-fire-red/30 hover:border-fire-red",
    unlocked: true,
  },
  {
    id: "plastic",
    icon: "⚡",
    title: "Mission 5: Plastic & Power",
    subtitle: "Electrical wire insulation & heat-resistant kettle handle tests!",
    route: "/play/plastic",
    tag: "Insulation",
    color: "from-hint-yellow/20 to-hint-yellow/5",
    borderColor: "border-hint-yellow/40 hover:border-hint-yellow",
    unlocked: true,
  },
  {
    id: "environment",
    icon: "🌍",
    title: "Mission 6: Underground Time Journey",
    subtitle: "Simulate 100 years underground: What happens to plastic vs cotton?",
    route: "/play/environment",
    tag: "Environment",
    color: "from-earth-brown/15 to-earth-brown/5",
    borderColor: "border-earth-brown/30 hover:border-earth-brown",
    unlocked: true,
  },
  {
    id: "extras",
    icon: "🔧",
    title: "Mission 7: Rubber & Glue Lab",
    subtitle: "Stretch synthetic rubber polymers & fix broken objects with adhesives!",
    route: "/play/extras",
    tag: "Polymers",
    color: "from-lab-wood/15 to-lab-wood/5",
    borderColor: "border-lab-wood/30 hover:border-lab-wood",
    unlocked: true,
  },
  {
    id: "final-mission",
    icon: "🏕️",
    title: "Mission 8: Pip's Safe Camp",
    subtitle: "Mastery Challenge: Pick the right materials for tent, rope, and fire!",
    route: "/play/final-mission",
    tag: "Grand Finale",
    color: "from-success/18 to-success/5",
    borderColor: "border-success/30 hover:border-success",
    unlocked: true,
  },
];

export default function PlayMapPage() {
  const [activeTab, setActiveTab] = useState<"trail" | "microscope" | "polymer">("trail");
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleOpenVideo = () => {
    playDiscoverySound();
    setShowVideoModal(true);
    speak("Welcome to Pip's Cinema! Watch quick 2-minute visual explainers on materials science!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-16">
      {/* Top Banner: Video Cinema & Quick Science Lessons */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-900 via-pip-blue-dark to-pip-blue rounded-3xl p-6 sm:p-8 text-white shadow-medium mb-8 border-2 border-white/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Floating background sparkles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-yellow-300 mb-2">
            <Sparkles size={14} className="animate-spin" />
            <span>Before You Begin: 2-Min Video Lessons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Pip&apos;s Science Adventure Trail
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-md">
            Watch interactive mini-lessons, zoom into atomic fibres, and test material superpowers!
          </p>
        </div>

        <motion.button
          onClick={handleOpenVideo}
          className="relative z-10 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-fire-red to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-warm flex items-center gap-2.5 transition-all shrink-0 cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={18} fill="currentColor" />
          <span>Watch Mini-Lessons 🎬</span>
        </motion.button>
      </motion.div>

      {/* Interactive Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-2xl border border-lab-wood/20 shadow-soft flex items-center gap-1.5">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab("trail");
            }}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === "trail"
                ? "bg-pip-blue text-white shadow-soft"
                : "text-text-muted hover:text-text-dark"
            }`}
          >
            <Compass size={16} />
            <span>Mission Map 🗺️</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab("microscope");
              speak("Entering the Microscopic Lab! Zoom into cotton, nylon, and wool fibers!");
            }}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === "microscope"
                ? "bg-nature-green text-white shadow-soft"
                : "text-text-muted hover:text-text-dark"
            }`}
          >
            <FlaskConical size={16} />
            <span>Microscope Zoom 🔬</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab("polymer");
              speak("Polymer Builder Lab! Connect monomers to build strong synthetic chains!");
            }}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === "polymer"
                ? "bg-factory-orange text-white shadow-soft"
                : "text-text-muted hover:text-text-dark"
            }`}
          >
            <Layers size={16} />
            <span>Polymer Builder 🧪</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "trail" && (
          <motion.div
            key="trail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="relative"
          >
            {/* Animated Trail Line */}
            <div className="absolute left-7 sm:left-10 top-6 bottom-6 w-1 bg-gradient-to-b from-nature-green via-pip-blue to-success rounded-full opacity-40 pointer-events-none" />

            {/* Mission Nodes */}
            <div className="flex flex-col gap-4">
              {MISSIONS.map((mission, i) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Link href={mission.route} className="block group">
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Node circle with pulse animation */}
                      <motion.div
                        className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white border-2 border-lab-wood/25 group-hover:border-pip-blue group-hover:shadow-medium transition-all shadow-soft shrink-0"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl sm:text-4xl">{mission.icon}</span>
                      </motion.div>

                      {/* Mission Info Card */}
                      <motion.div
                        className={`flex-1 bg-gradient-to-r ${mission.color} rounded-2xl border-2 ${mission.borderColor} px-5 py-4 transition-all group-hover:shadow-soft group-hover:bg-white flex items-center justify-between gap-4`}
                        whileHover={{ x: 4 }}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-black text-text-dark">
                              {mission.title}
                            </h3>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/80 border border-lab-wood/20 text-text-muted">
                              {mission.tag}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted mt-1 leading-relaxed">
                            {mission.subtitle}
                          </p>
                        </div>

                        <div className="w-9 h-9 rounded-full bg-white/80 border border-lab-wood/20 flex items-center justify-center text-pip-blue group-hover:bg-pip-blue group-hover:text-white transition-colors shrink-0 shadow-xs">
                          <ArrowRight size={16} />
                        </div>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Discovery Book Shortcut at bottom of map */}
            <div className="mt-8 pt-6 border-t border-lab-wood/15 text-center">
              <Link
                href="/play/discovery-book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-pip-blue/30 hover:border-pip-blue text-text-dark font-extrabold text-sm shadow-soft hover:shadow-medium transition-all"
              >
                <BookOpen size={18} className="text-pip-blue" />
                <span>Open My Specimen Discovery Book 📖</span>
              </Link>
            </div>
          </motion.div>
        )}

        {activeTab === "microscope" && (
          <motion.div
            key="microscope"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <MicroscopeViewer />
          </motion.div>
        )}

        {activeTab === "polymer" && (
          <motion.div
            key="polymer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <PolymerChainBuilder />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Lesson Cinema Modal */}
      <VideoLessonModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  );
}
