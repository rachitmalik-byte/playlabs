"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, RotateCcw, Award } from "lucide-react";
import { speak, playSuccessSound, playPopSound, playDiscoverySound } from "@/lib/audio-manager";

interface SentenceVoiceReaderProps {
  sentence: string;
  conceptTitle: string;
  onSuccess?: () => void;
  className?: string;
}

export function SentenceVoiceReader({
  sentence,
  conceptTitle,
  onSuccess,
  className = ""
}: SentenceVoiceReaderProps) {
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasMicSupport, setHasMicSupport] = useState(true);

  // Normalize target words
  const targetWords = sentence
    .replace(/[.,!?;:"'()]/g, "")
    .toLowerCase()
    .split(/\s+/);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setHasMicSupport(false);
      }
    }
  }, []);

  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasMicSupport(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        playPopSound();
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(" ")
          .toLowerCase();

        setSpokenTranscript(transcript);

        // Check matching percentage
        const spokenWords = transcript.split(/\s+/);
        const matchCount = targetWords.filter(w => spokenWords.some(sw => sw.includes(w) || w.includes(sw))).length;
        const matchPercent = matchCount / targetWords.length;

        if (matchPercent >= 0.7 && !isCompleted) {
          setIsCompleted(true);
          setIsListening(false);
          recognition.stop();
          playSuccessSound();
          speak(`Incredible reading! You said: ${sentence}`);
          onSuccess?.();
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleHearSentence = () => {
    playPopSound();
    speak(sentence);
  };

  // Check if a word in the sentence has been spoken
  const checkWordSpoken = (word: string) => {
    const cleanWord = word.replace(/[.,!?;:"'()]/g, "").toLowerCase();
    return spokenTranscript.includes(cleanWord);
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-3xl p-6 border-2 border-indigo-200 shadow-soft text-center ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎙️</span>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-900 bg-white px-3 py-1 rounded-full border border-indigo-200">
            Read-Aloud Challenge • {conceptTitle}
          </span>
        </div>

        <button
          onClick={handleHearSentence}
          className="flex items-center gap-1 text-xs font-extrabold text-indigo-700 hover:text-indigo-900 bg-white px-3 py-1 rounded-xl border border-indigo-200 transition-colors shadow-xs"
          title="Hear Pip read the sentence"
        >
          <Volume2 size={14} />
          <span>Hear Pip 🗣️</span>
        </button>
      </div>

      {/* Target Sentence Display with Word-by-Word Highlight */}
      <div className="bg-white rounded-2xl p-5 border-2 border-indigo-100 mb-5 shadow-xs">
        <p className="text-xs text-text-muted font-bold mb-2">
          Read this science sentence aloud into your microphone:
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl font-black text-text-dark">
          {sentence.split(" ").map((word, idx) => {
            const isSpoken = checkWordSpoken(word);
            return (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  isSpoken
                    ? "bg-emerald-100 text-emerald-950 border border-emerald-400 scale-105"
                    : "text-text-dark"
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Mic Button & Status */}
      <div className="flex flex-col items-center gap-3">
        {!isCompleted ? (
          <>
            <motion.button
              onClick={startListening}
              disabled={isListening}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm shadow-warm flex items-center gap-2 transition-all cursor-pointer ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              <span>{isListening ? "Listening... Speak now! 🎙️" : "Tap & Read Sentence Aloud"}</span>
            </motion.button>

            {isListening && (
              <span className="text-xs font-bold text-indigo-700 animate-pulse">
                Listening to your voice... Speak clearly into your mic!
              </span>
            )}

            {!hasMicSupport && (
              <p className="text-[11px] text-text-muted">
                (Microphone not supported in this browser. Tap &apos;Hear Pip&apos; above to listen!)
              </p>
            )}
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-100 border-2 border-emerald-400 p-4 rounded-2xl w-full text-emerald-950 flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2 text-left">
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-black text-sm">Brilliant Reading! Full Sentence Mastered! ⭐</h4>
                <p className="text-xs text-emerald-800">You practiced real science communication!</p>
              </div>
            </div>

            <span className="text-xs font-black bg-white text-emerald-900 px-3 py-1 rounded-xl shadow-xs shrink-0">
              +50 XP 🚀
            </span>
          </motion.div>
        )}
      </div>

    </div>
  );
}
