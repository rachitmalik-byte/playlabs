"use client";

import { useState, useEffect, useRef } from "react";
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
  const [spokenWordsSet, setSpokenWordsSet] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasMicSupport, setHasMicSupport] = useState(true);
  const recognitionRef = useRef<any>(null);
  const shouldKeepListeningRef = useRef(false);

  // Normalize target words
  const cleanTargetWords = sentence
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

    return () => {
      shouldKeepListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const stopListening = () => {
    shouldKeepListeningRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasMicSupport(false);
      return;
    }

    // Stop any existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Continuous listening so kid has plenty of time
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognitionRef.current = recognition;
      shouldKeepListeningRef.current = true;

      recognition.onstart = () => {
        setIsListening(true);
        playPopSound();
      };

      recognition.onresult = (event: any) => {
        let currentFullTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentFullTranscript += " " + event.results[i][0].transcript;
        }

        const spokenWords = currentFullTranscript.toLowerCase().split(/\s+/);
        
        // Add all spoken words to our matched set
        setSpokenWordsSet((prev) => {
          const nextSet = new Set(prev);
          cleanTargetWords.forEach((targetWord) => {
            if (spokenWords.some(sw => sw.includes(targetWord) || targetWord.includes(sw))) {
              nextSet.add(targetWord);
            }
          });

          // Check if at least 65% of words in the sentence have been matched
          const matchedCount = cleanTargetWords.filter(w => nextSet.has(w)).length;
          const matchPercent = matchedCount / cleanTargetWords.length;

          if (matchPercent >= 0.65 && !isCompleted) {
            setIsCompleted(true);
            shouldKeepListeningRef.current = false;
            try {
              recognition.stop();
            } catch {}
            setIsListening(false);
            playSuccessSound();
            speak(`Awesome reading! You said: ${sentence}`);
            onSuccess?.();
          }

          return nextSet;
        });
      };

      recognition.onerror = () => {
        // Keep listening unless explicitly stopped
        if (shouldKeepListeningRef.current && !isCompleted) {
          try {
            recognition.start();
          } catch {}
        } else {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        // Auto-restart if child is still reading and hasn't finished
        if (shouldKeepListeningRef.current && !isCompleted) {
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
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

  const handleManualDone = () => {
    playSuccessSound();
    setIsCompleted(true);
    stopListening();
    speak(`Great effort reading! Full sentence completed.`);
    onSuccess?.();
  };

  // Check if a word in the sentence has been spoken
  const checkWordSpoken = (word: string) => {
    const clean = word.replace(/[.,!?;:"'()]/g, "").toLowerCase();
    return spokenWordsSet.has(clean);
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-50/90 to-purple-50/90 rounded-3xl p-6 border-2 border-indigo-200 shadow-soft text-center ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎙️</span>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-900 bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-xs">
            Read-Aloud Challenge • {conceptTitle}
          </span>
        </div>

        <button
          onClick={handleHearSentence}
          className="flex items-center gap-1 text-xs font-extrabold text-indigo-700 hover:text-indigo-900 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors shadow-xs cursor-pointer"
          title="Hear Pip read the sentence"
        >
          <Volume2 size={14} />
          <span>Hear Pip 🗣️</span>
        </button>
      </div>

      {/* Target Sentence Display with Live Word-by-Word Highlight */}
      <div className="bg-white rounded-2xl p-5 border-2 border-indigo-100 mb-5 shadow-xs">
        <p className="text-xs text-text-muted font-bold mb-3">
          Read this science sentence aloud in your own time:
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-black text-text-dark leading-relaxed">
          {sentence.split(" ").map((word, idx) => {
            const isSpoken = checkWordSpoken(word);
            return (
              <motion.span
                key={idx}
                animate={isSpoken ? { scale: [1, 1.1, 1] } : {}}
                className={`px-2.5 py-1 rounded-xl transition-all duration-300 ${
                  isSpoken
                    ? "bg-emerald-100 text-emerald-950 border-2 border-emerald-400 font-black shadow-xs"
                    : "text-text-dark bg-lab-chalk/40 border border-lab-wood/10"
                }`}
              >
                {word}
                {isSpoken && <span className="ml-1 text-[10px] text-emerald-600">✓</span>}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Mic Controls & Animated Sound Waves */}
      <div className="flex flex-col items-center gap-3">
        {!isCompleted ? (
          <>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={isListening ? stopListening : startListening}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm shadow-warm flex items-center gap-2.5 transition-all cursor-pointer ${
                  isListening
                    ? "bg-rose-500 hover:bg-rose-600 text-white ring-4 ring-rose-200"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                <span>{isListening ? "Listening... Tap to Pause" : "Tap & Read Aloud 🎙️"}</span>
              </motion.button>

              {isListening && (
                <button
                  onClick={handleManualDone}
                  className="px-4 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs shadow-soft transition-all"
                  title="Mark finished reading"
                >
                  Done Reading ✓
                </button>
              )}
            </div>

            {isListening && (
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-2 h-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-7 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="w-2 h-8 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
                <span className="w-2 h-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
                <span className="text-xs font-black text-indigo-900 ml-2">
                  Microphone is active! Take your time to read each word.
                </span>
              </div>
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
            <div className="flex items-center gap-2.5 text-left">
              <CheckCircle2 size={26} className="text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-black text-sm">Brilliant Science Reading! Sentence Mastered! ⭐</h4>
                <p className="text-xs text-emerald-800">You practiced science vocabulary with clear enunciation.</p>
              </div>
            </div>

            <span className="text-xs font-black bg-white text-emerald-900 px-3 py-1.5 rounded-xl shadow-xs shrink-0 border border-emerald-300">
              +50 XP 🚀
            </span>
          </motion.div>
        )}
      </div>

    </div>
  );
}
