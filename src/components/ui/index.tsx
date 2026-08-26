"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Music, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import {
  toggleBackgroundMusic,
  getIsMusicPlaying,
  getIsVoiceEnabled,
  setVoiceEnabled,
  replayLastSpeech,
  playClickSound,
  startBackgroundMusic,
  setupGlobalAudioUnlock
} from "@/lib/audio-manager";

export function SoundControl() {
  const [musicOn, setMusicOn] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);

  useEffect(() => {
    setupGlobalAudioUnlock();
    setMusicOn(getIsMusicPlaying());
    setVoiceOn(getIsVoiceEnabled());

    const handleAudioState = () => {
      setMusicOn(getIsMusicPlaying());
      setVoiceOn(getIsVoiceEnabled());
    };

    window.addEventListener("polyquest-audio-state", handleAudioState);
    return () => {
      window.removeEventListener("polyquest-audio-state", handleAudioState);
    };
  }, []);

  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const isPlaying = toggleBackgroundMusic();
    setMusicOn(isPlaying);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    const next = !voiceOn;
    setVoiceEnabled(next);
    setVoiceOn(next);
  };

  const handleReplayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    replayLastSpeech();
  };

  return (
    <div className="fixed top-3.5 right-4 z-50 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-lab-wood/25 shadow-soft">
      {/* Music Toggle */}
      <motion.button
        onClick={handleToggleMusic}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          musicOn
            ? "bg-nature-green text-white shadow-xs"
            : "bg-lab-chalk text-text-muted hover:text-text-dark"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title={musicOn ? "Music Playing (Click to Mute)" : "Music Off (Click to Play Kids Melody)"}
        aria-label="Toggle Background Music"
      >
        <Music size={15} className={musicOn ? "animate-pulse" : ""} />
      </motion.button>

      {/* Voice Toggle */}
      <motion.button
        onClick={handleToggleVoice}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          voiceOn
            ? "bg-pip-blue text-white shadow-xs"
            : "bg-lab-chalk text-text-muted hover:text-text-dark"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title={voiceOn ? "Pip Voice On" : "Pip Voice Muted"}
        aria-label="Toggle Pip Voice"
      >
        {voiceOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </motion.button>

      {/* Replay Speech Button */}
      <motion.button
        onClick={handleReplayVoice}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-lab-chalk hover:bg-lab-warm text-text-muted hover:text-pip-blue transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title="Replay Pip's Last Words 🗣️"
        aria-label="Replay Voice"
      >
        <RotateCcw size={14} />
      </motion.button>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "nature" | "factory";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-pip-blue text-white hover:bg-pip-blue-dark active:bg-pip-blue-dark shadow-soft",
    secondary:
      "bg-white text-text-dark border-2 border-lab-wood/25 hover:border-lab-wood hover:bg-lab-warm active:bg-lab-chalk shadow-xs",
    ghost:
      "bg-transparent text-text-muted hover:text-text-dark hover:bg-lab-chalk",
    nature:
      "bg-nature-green text-white hover:bg-nature-green-dark active:bg-nature-green-dark shadow-soft",
    factory:
      "bg-factory-orange text-white hover:bg-factory-orange-dark active:bg-factory-orange-dark shadow-soft",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  return (
    <motion.button
      onClick={() => {
        if (!disabled) {
          playClickSound();
          onClick?.();
        }
      }}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

export function ProgressDots({
  total,
  current,
  className = "",
}: {
  total: number;
  current: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? "w-2.5 h-2.5 bg-pip-blue"
              : i === current
              ? "w-3 h-3 bg-pip-blue ring-2 ring-pip-blue/30"
              : "w-2 h-2 bg-lab-wood-light/40"
          }`}
          initial={false}
          animate={
            i === current
              ? { scale: [1, 1.25, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
}
