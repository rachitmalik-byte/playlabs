"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laboratory } from "@/components/world/Laboratory";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { 
  Volume2, 
  VolumeX, 
  Music, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  HelpCircle
} from "lucide-react";
import {
  speak,
  stopSpeaking,
  startBackgroundMusic,
  stopBackgroundMusic,
  toggleBackgroundMusic,
  getIsMusicPlaying,
  getIsVoiceEnabled,
  setVoiceEnabled,
  playDiscoverySound,
  playPopSound,
  playClickSound,
  setupGlobalAudioUnlock
} from "@/lib/audio-manager";

// Interactive objects on Pip's lab table
const TABLE_OBJECTS = [
  { 
    id: "cotton", 
    emoji: "👕", 
    label: "Cotton shirt", 
    type: "Plant fibre", 
    fact: "Cotton is made from fluffy white cotton bolls grown on plants!",
    pipLine: "A cotton shirt! It's so soft and absorbs sweat in summer!"
  },
  { 
    id: "bottle", 
    emoji: "🧴", 
    label: "Plastic bottle", 
    type: "Synthetic polymer", 
    fact: "Plastics are made in factories from petroleum chemicals and last for 100+ years!",
    pipLine: "A plastic bottle! It's lightweight and waterproof, but hard to break down!"
  },
  { 
    id: "rope", 
    emoji: "🪢", 
    label: "Nylon rope", 
    type: "Synthetic fibre", 
    fact: "Nylon is so strong it's used for parachutes and climbing ropes!",
    pipLine: "Nylon rope! Did you know a nylon thread is stronger than a steel wire?"
  },
  { 
    id: "spoon", 
    emoji: "🥄", 
    label: "Metal spoon", 
    type: "Metal conductor", 
    fact: "Metals conduct heat very quickly — that's why cooking handles use plastic!",
    pipLine: "A metal spoon! Metals get hot super fast when placed in soup!"
  },
  { 
    id: "wool", 
    emoji: "🧶", 
    label: "Wool ball", 
    type: "Animal fibre", 
    fact: "Wool comes from sheep fleece and traps air to keep us warm in winter!",
    pipLine: "Cozy sheep wool! It traps tiny pockets of air to keep us toasty warm!"
  },
  { 
    id: "rubber", 
    emoji: "⚫", 
    label: "Rubber ball", 
    type: "Polymer / Latex", 
    fact: "Natural rubber comes from tree sap, but synthetic rubber is made from chemicals!",
    pipLine: "A bouncy rubber ball! Polymers can stretch and snap back into shape!"
  },
];

// Dialogue steps
const WELCOME_DIALOGUES = [
  {
    text: "Hey! I'm Pip! Welcome to my science laboratory!",
    expression: "happy" as const,
  },
  {
    text: "I found something strange hiding right here on my workbench...",
    expression: "curious" as const,
  },
  {
    text: "Look at all these objects on my table! Tap any object to inspect its secret!",
    expression: "surprised" as const,
  },
  {
    text: "They look and feel totally different...",
    expression: "thinking" as const,
  },
  {
    text: "But there's a fascinating scientific secret behind what they are made of!",
    expression: "excited" as const,
  },
];

export default function HomePage() {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedObject, setSelectedObject] = useState<typeof TABLE_OBJECTS[0] | null>(null);
  const [showRoleChoice, setShowRoleChoice] = useState(false);
  
  // Audio state
  const [musicOn, setMusicOn] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const router = useRouter();

  // Initialize global audio listener
  useEffect(() => {
    setupGlobalAudioUnlock();
    setVoiceOn(getIsVoiceEnabled());
    setMusicOn(getIsMusicPlaying());

    const handleAudioState = () => {
      setMusicOn(getIsMusicPlaying());
      setVoiceOn(getIsVoiceEnabled());
    };

    window.addEventListener("polyquest-audio-state", handleAudioState);
    return () => {
      window.removeEventListener("polyquest-audio-state", handleAudioState);
    };
  }, []);

  // Handle TTS and typewriter for current dialogue
  const playCurrentDialogue = useCallback((step: number) => {
    if (step >= WELCOME_DIALOGUES.length) {
      setShowRoleChoice(true);
      return;
    }

    const current = WELCOME_DIALOGUES[step];
    setIsTyping(true);
    setDisplayedText("");
    let i = 0;

    // Speak aloud with TTS
    speak(current.text);

    const interval = setInterval(() => {
      if (i < current.text.length) {
        setDisplayedText(current.text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Trigger dialogue on step change
  useEffect(() => {
    if (!showRoleChoice) {
      const cleanup = playCurrentDialogue(dialogueStep);
      return cleanup;
    }
  }, [dialogueStep, showRoleChoice, playCurrentDialogue]);

  // First interaction starts music if not started
  const handleUserGesture = () => {
    if (!audioInitialized) {
      setAudioInitialized(true);
      startBackgroundMusic();
      setMusicOn(true);
    }
  };

  const advanceDialogue = () => {
    handleUserGesture();
    playClickSound();

    if (isTyping) {
      // Finish typing instantly
      setDisplayedText(WELCOME_DIALOGUES[dialogueStep]?.text || "");
      setIsTyping(false);
      return;
    }

    if (dialogueStep < WELCOME_DIALOGUES.length - 1) {
      setDialogueStep((prev) => prev + 1);
    } else {
      setShowRoleChoice(true);
    }
  };

  const handleObjectClick = (obj: typeof TABLE_OBJECTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    handleUserGesture();
    setSelectedObject(obj);
    playDiscoverySound();
    // Speak Pip's comment on the object
    speak(obj.pipLine);
  };

  const replayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleUserGesture();
    if (selectedObject) {
      speak(selectedObject.pipLine);
    } else if (WELCOME_DIALOGUES[dialogueStep]) {
      speak(WELCOME_DIALOGUES[dialogueStep].text);
    }
  };

  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isPlaying = toggleBackgroundMusic();
    setMusicOn(isPlaying);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !voiceOn;
    setVoiceEnabled(next);
    setVoiceOn(next);
    if (next && WELCOME_DIALOGUES[dialogueStep]) {
      speak(WELCOME_DIALOGUES[dialogueStep].text);
    } else {
      stopSpeaking();
    }
  };

  return (
    <Laboratory variant="full">
      {/* Top Floating Audio & Navigation Bar */}
      <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 pointer-events-none">
        {/* Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-lab-wood/20 shadow-soft">
          <span className="text-xl">🔬</span>
          <span className="font-extrabold text-sm sm:text-base text-text-dark tracking-wide">
            Poly<span className="text-pip-blue">Quest</span>
          </span>
        </div>

        {/* Audio Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Background Music Button */}
          <motion.button
            onClick={handleToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-soft ${
              musicOn 
                ? "bg-nature-green text-white border-nature-green-dark" 
                : "bg-white/90 text-text-muted border-lab-wood/20 hover:bg-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={musicOn ? "Music On (Click to Mute)" : "Music Off (Click to Play Kids Melody)"}
          >
            <Music size={14} className={musicOn ? "animate-bounce" : ""} />
            <span className="hidden sm:inline">{musicOn ? "Music: On" : "Music: Off"}</span>
          </motion.button>

          {/* Pip Voice / TTS Button */}
          <motion.button
            onClick={handleToggleVoice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-soft ${
              voiceOn 
                ? "bg-pip-blue text-white border-pip-blue-dark" 
                : "bg-white/90 text-text-muted border-lab-wood/20 hover:bg-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={voiceOn ? "Pip Voice On (Click to Mute)" : "Pip Voice Off (Click to Enable)"}
          >
            {voiceOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="hidden sm:inline">{voiceOn ? "Voice: On" : "Voice: Off"}</span>
          </motion.button>

          {/* Quick Skip to Adventure */}
          <motion.button
            onClick={() => {
              playClickSound();
              setShowRoleChoice(true);
            }}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-lab-chalk text-text-dark border border-lab-wood/20 hover:bg-white transition-all shadow-soft"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Skip Intro</span>
            <ArrowRight size={13} />
          </motion.button>
        </div>
      </header>

      {/* Main Experience Viewport */}
      <main 
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8"
        onClick={handleUserGesture}
      >
        <AnimatePresence mode="wait">
          {!showRoleChoice ? (
            /* ============================================================
               VIEW 1: PIP'S INTERACTIVE WELCOME & TABLE INSPECTION
               ============================================================ */
            <motion.div
              key="welcome-flow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center max-w-2xl w-full"
            >
              {/* Pip Character */}
              <div 
                className="cursor-pointer"
                onClick={advanceDialogue}
                title="Tap Pip to continue!"
              >
                <PipAnimatedCharacter
                  expression={WELCOME_DIALOGUES[dialogueStep]?.expression || "happy"}
                  size={150}
                />
              </div>

              {/* Pip Speech Bubble */}
              <motion.div
                className="speech-bubble mt-4 w-full text-center relative cursor-pointer select-none"
                onClick={advanceDialogue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Voice Replay Button inside Bubble */}
                <button
                  onClick={replayVoice}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-lab-chalk hover:bg-pip-blue/10 text-pip-blue transition-colors"
                  title="Listen to Pip again"
                >
                  <RotateCcw size={14} />
                </button>

                <p className="text-base sm:text-lg font-bold text-text-dark leading-relaxed pr-6">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-4 bg-pip-blue ml-1 animate-pulse" />
                  )}
                </p>

                {/* Clear Instruction Prompt */}
                <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-text-muted">
                  <Sparkles size={13} className="text-hint-yellow animate-spin" />
                  <span>Click anywhere or press Next to continue</span>
                </div>
              </motion.div>

              {/* Controls directly below bubble */}
              <div className="mt-4 flex items-center justify-center gap-3 w-full">
                <Button
                  variant="primary"
                  size="md"
                  onClick={advanceDialogue}
                  className="font-bold px-6 py-2.5 flex items-center gap-2 shadow-medium"
                >
                  <span>{dialogueStep >= WELCOME_DIALOGUES.length - 1 ? "Enter Adventure" : "Next Dialogue"}</span>
                  <ArrowRight size={16} />
                </Button>

                {dialogueStep >= 2 && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      playClickSound();
                      setShowRoleChoice(true);
                    }}
                    className="font-semibold px-4 py-2.5 text-sm"
                  >
                    Start Mission Now 🚀
                  </Button>
                )}
              </div>

              {/* Table of Objects (Visible from Step 2 onwards or always) */}
              <motion.div
                className="relative w-full mt-6 bg-gradient-to-b from-lab-wood-light/20 to-lab-wood/15 rounded-2xl border-2 border-lab-wood/30 p-5 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-lab-wood-dark">
                    <span>🧪</span>
                    <span>Pip&apos;s Material Specimens (Tap Any Object!)</span>
                  </div>
                  <span className="text-[11px] text-text-muted font-semibold bg-white/80 px-2 py-0.5 rounded-full border border-lab-wood/20">
                    6 Items to Explore
                  </span>
                </div>

                {/* 6 Interactive Table Objects */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
                  {TABLE_OBJECTS.map((obj) => {
                    const isSelected = selectedObject?.id === obj.id;
                    return (
                      <motion.button
                        key={obj.id}
                        onClick={(e) => handleObjectClick(obj, e)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all text-center ${
                          isSelected
                            ? "bg-white border-2 border-pip-blue shadow-medium scale-105"
                            : "bg-white/85 border border-lab-wood/20 hover:bg-white hover:border-pip-blue/40 shadow-soft"
                        }`}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-3xl sm:text-4xl select-none">{obj.emoji}</span>
                        <span className="text-xs font-bold text-text-dark leading-tight">
                          {obj.label}
                        </span>
                        <span className="text-[10px] text-pip-blue-dark font-semibold bg-pip-blue/10 px-1.5 py-0.5 rounded-md">
                          {obj.type}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Selected Item Inspection Card */}
                <AnimatePresence>
                  {selectedObject && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="mt-3.5 bg-white rounded-xl p-3.5 border border-pip-blue/30 shadow-soft flex items-start gap-3"
                    >
                      <span className="text-3xl">{selectedObject.emoji}</span>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-text-dark">
                            {selectedObject.label}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-nature-green/15 text-nature-green-dark rounded-full">
                            {selectedObject.type}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                          {selectedObject.fact}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedObject(null);
                        }}
                        className="text-text-muted hover:text-text-dark font-bold text-xs p-1"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            /* ============================================================
               VIEW 2: ROLE SELECTOR ("WHO'S EXPLORING TODAY?")
               ============================================================ */
            <motion.div
              key="role-choice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center max-w-xl w-full"
            >
              {/* Back to intro button */}
              <button
                onClick={() => {
                  playClickSound();
                  setShowRoleChoice(false);
                }}
                className="self-start mb-4 text-xs font-bold text-text-muted hover:text-text-dark flex items-center gap-1"
              >
                ← Back to Pip&apos;s Lab
              </button>

              <div className="text-center mb-8">
                <span className="text-5xl mb-2 block">🌟</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark">
                  Who&apos;s Exploring Today?
                </h1>
                <p className="text-text-muted text-base mt-1.5">
                  Pick your path to enter the World of Materials
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                {/* Explorer (Child Mode) */}
                <motion.button
                  className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border-2 border-pip-blue/30 hover:border-pip-blue transition-all cursor-pointer shadow-soft text-center"
                  onClick={() => {
                    playDiscoverySound();
                    router.push("/play");
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-20 h-20 rounded-full bg-pip-blue/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    🧒
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark">
                      I&apos;m the Explorer
                    </h2>
                    <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                      Hands-on experiments, stories, fire & strength tests, and discovery book!
                    </p>
                  </div>
                  <div className="w-full py-2.5 px-4 rounded-xl bg-pip-blue text-white font-bold text-sm shadow-soft group-hover:bg-pip-blue-dark transition-colors">
                    Start Science Playground 🚀
                  </div>
                </motion.button>

                {/* Parent Mode */}
                <motion.button
                  className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border-2 border-lab-wood/30 hover:border-lab-wood transition-all cursor-pointer shadow-soft text-center"
                  onClick={() => {
                    playClickSound();
                    router.push("/parent");
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-20 h-20 rounded-full bg-lab-wood/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    👨‍👩‍👧
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark">
                      I&apos;m a Parent
                    </h2>
                    <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                      Calm progress analytics, concept mastery breakdown, and 5-min home activities.
                    </p>
                  </div>
                  <div className="w-full py-2.5 px-4 rounded-xl bg-white border-2 border-lab-wood text-text-dark font-bold text-sm hover:bg-lab-warm transition-colors">
                    View Learning Insights 📊
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Laboratory>
  );
}

/**
 * High quality SVG Pip character for home page with animated expressions
 */
function PipAnimatedCharacter({
  expression,
  size = 140,
}: {
  expression: "curious" | "happy" | "excited" | "thinking" | "surprised";
  size?: number;
}) {
  const eyeVariants = {
    happy: { leftY: 40, rightY: 40, leftR: 5, rightR: 5, pupilOffset: 0 },
    curious: { leftY: 37, rightY: 39, leftR: 5.5, rightR: 4.5, pupilOffset: 2 },
    excited: { leftY: 36, rightY: 36, leftR: 6.5, rightR: 6.5, pupilOffset: 0 },
    thinking: { leftY: 35, rightY: 35, leftR: 5, rightR: 5, pupilOffset: -3 },
    surprised: { leftY: 34, rightY: 34, leftR: 7, rightR: 7, pupilOffset: 0 },
  };

  const eyes = eyeVariants[expression] || eyeVariants.happy;
  const isJumping = expression === "excited";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={isJumping ? { y: [0, -8, 0] } : { y: [0, -3, 0] }}
      transition={{ duration: isJumping ? 0.6 : 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="filter drop-shadow-md"
    >
      {/* Body — Soft warm blue blob */}
      <ellipse cx="50" cy="58" rx="30" ry="28" fill="#4A90D9" />

      {/* Belly highlight */}
      <ellipse cx="50" cy="62" rx="20" ry="18" fill="#6DA8E8" opacity="0.4" />

      {/* Cute lab goggles on forehead */}
      <g>
        <ellipse cx="50" cy="32" rx="20" ry="6" fill="none" stroke="#C4956A" strokeWidth="2.5" />
        <circle cx="39" cy="32" r="7" fill="none" stroke="#C4956A" strokeWidth="2" />
        <circle cx="61" cy="32" r="7" fill="none" stroke="#C4956A" strokeWidth="2" />
        <circle cx="39" cy="32" r="5" fill="#E8F4FD" opacity="0.6" />
        <circle cx="61" cy="32" r="5" fill="#E8F4FD" opacity="0.6" />
        <line x1="46" y1="32" x2="54" y2="32" stroke="#C4956A" strokeWidth="2" />
      </g>

      {/* Left eye */}
      <circle cx="38" cy="42" r={eyes.leftR + 3} fill="white" />
      <circle cx={38 + eyes.pupilOffset} cy="42" r={eyes.leftR} fill="#2D2520" />
      <circle cx={36 + eyes.pupilOffset} cy="40" r="1.8" fill="white" />

      {/* Right eye */}
      <circle cx="62" cy="42" r={eyes.rightR + 3} fill="white" />
      <circle cx={62 + eyes.pupilOffset} cy="42" r={eyes.rightR} fill="#2D2520" />
      <circle cx={60 + eyes.pupilOffset} cy="40" r="1.8" fill="white" />

      {/* Mouth */}
      {expression === "happy" || expression === "excited" ? (
        <path d="M41 54 Q50 62 59 54" fill="none" stroke="#2D2520" strokeWidth="2.5" strokeLinecap="round" />
      ) : expression === "surprised" ? (
        <ellipse cx="50" cy="56" rx="4" ry="5" fill="#2D2520" />
      ) : expression === "curious" ? (
        <path d="M43 55 Q50 59 57 55" fill="none" stroke="#2D2520" strokeWidth="2.2" strokeLinecap="round" />
      ) : (
        <path d="M45 56 Q50 53 55 56" fill="none" stroke="#2D2520" strokeWidth="2.2" strokeLinecap="round" />
      )}

      {/* Arms */}
      {expression === "excited" ? (
        <>
          <path d="M22 55 L10 38" stroke="#3672B5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M78 55 L90 38" stroke="#3672B5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </>
      ) : expression === "curious" ? (
        <>
          <path d="M22 58 L12 50" stroke="#3672B5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M78 58 L85 64" stroke="#3672B5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M22 60 L14 66" stroke="#3672B5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M78 60 L86 66" stroke="#3672B5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Feet */}
      <ellipse cx="40" cy="85" rx="8" ry="4" fill="#3672B5" />
      <ellipse cx="60" cy="85" rx="8" ry="4" fill="#3672B5" />

      {/* Sparkles when excited */}
      {expression === "excited" && (
        <>
          <circle cx="80" cy="30" r="2.5" fill="#F5D76E" />
          <circle cx="20" cy="32" r="2" fill="#F5D76E" />
          <circle cx="85" cy="50" r="2" fill="#F5D76E" />
        </>
      )}
    </motion.svg>
  );
}
