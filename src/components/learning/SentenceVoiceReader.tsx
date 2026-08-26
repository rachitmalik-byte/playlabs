"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, RotateCcw, Award, Check, AlertCircle } from "lucide-react";
import { speak, playSuccessSound, playPopSound, playDiscoverySound, playWarningSound, stopSpeaking } from "@/lib/audio-manager";

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
  const [isPipReading, setIsPipReading] = useState(false);
  const [karaokeWordIdx, setKaraokeWordIdx] = useState(-1);
  const [spokenWordsMap, setSpokenWordsMap] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [hasMicSupport, setHasMicSupport] = useState(true);

  const recognitionRef = useRef<any>(null);
  const shouldKeepListeningRef = useRef(false);

  // Clean words array
  const rawWords = sentence.split(/\s+/);
  const cleanTargetWords = rawWords.map(w => w.replace(/[.,!?;:"'()]/g, "").toLowerCase());

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

    // Stop Pip speech if currently playing
    stopSpeaking();
    setIsPipReading(false);
    setKaraokeWordIdx(-1);
    setEvaluationResult(null);

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasMicSupport(false);
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Unlimited continuous listening
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognitionRef.current = recognition;
      shouldKeepListeningRef.current = true;

      recognition.onstart = () => {
        setIsListening(true);
        playPopSound();
      };

      recognition.onresult = (event: any) => {
        let fullTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += " " + event.results[i][0].transcript;
        }

        // Clean tokens from spoken speech
        const spokenTokens = fullTranscript
          .toLowerCase()
          .replace(/[.,!?;:"'()]/g, "")
          .split(/\s+/)
          .filter(Boolean);

        setSpokenWordsMap((prev) => {
          const nextMap = { ...prev };

          cleanTargetWords.forEach((targetWord) => {
            // Strict exact word match or close phonetic match (no loose substring matching on short words)
            const matched = spokenTokens.some((tok) => {
              if (tok === targetWord) return true;
              if (targetWord.length > 4 && (tok.startsWith(targetWord) || targetWord.startsWith(tok))) return true;
              return false;
            });

            if (matched) {
              nextMap[targetWord] = true;
            }
          });

          // Check if ALL words have been spoken
          const matchedCount = cleanTargetWords.filter((w) => nextMap[w]).length;
          if (matchedCount === cleanTargetWords.length && !isCompleted) {
            // Only auto-finish when 100% of the sentence is spoken!
            handleEvaluate(nextMap);
          }

          return nextMap;
        });
      };

      recognition.onerror = () => {
        if (shouldKeepListeningRef.current && !isCompleted) {
          try {
            recognition.start();
          } catch {}
        } else {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
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

  // Evaluate accuracy score based on currently spoken words
  const handleEvaluate = (currentMap = spokenWordsMap) => {
    stopListening();
    const matchedCount = cleanTargetWords.filter((w) => currentMap[w]).length;
    const score = Math.round((matchedCount / cleanTargetWords.length) * 100);

    if (score >= 70) {
      setIsCompleted(true);
      setEvaluationResult({ score, passed: true });
      playSuccessSound();
      speak(`Excellent reading! You achieved ${score} percent pronunciation accuracy!`);
      onSuccess?.();
    } else {
      setEvaluationResult({ score, passed: false });
      playWarningSound();
      speak(`You said ${matchedCount} out of ${cleanTargetWords.length} words correctly. Tap the yellow words to hear Pip, and try again!`);
    }
  };

  // Karaoke Listen to Pip speaking with synchronized word tracking
  const handleHearPip = () => {
    if (isListening) stopListening();
    playPopSound();
    setIsPipReading(true);
    setKaraokeWordIdx(0);

    speak(sentence, {
      onStart: () => {
        setIsPipReading(true);
      },
      onWordHighlight: (idx) => {
        setKaraokeWordIdx(idx);
      },
      onEnd: () => {
        setIsPipReading(false);
        setKaraokeWordIdx(-1);
      }
    });
  };

  // Pronounce a single target word for the child
  const handleHearSingleWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    const cleanWord = word.replace(/[.,!?;:"'()]/g, "");
    speak(cleanWord);
  };

  const handleReset = () => {
    playPopSound();
    stopListening();
    setSpokenWordsMap({});
    setIsCompleted(false);
    setEvaluationResult(null);
    setKaraokeWordIdx(-1);
  };

  const spokenCount = cleanTargetWords.filter((w) => spokenWordsMap[w]).length;

  return (
    <div className={`bg-gradient-to-br from-indigo-50/95 to-purple-50/95 rounded-3xl p-5 sm:p-6 border-2 border-indigo-200 shadow-soft text-center ${className}`}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎙️</span>
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-xs">
              Speech & Pronunciation Lab
            </span>
            <h3 className="text-xs sm:text-sm font-black text-text-dark">
              {conceptTitle}
            </h3>
          </div>
        </div>

        {/* Listen to Pip (Karaoke Mode) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleHearPip}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-all shadow-xs cursor-pointer ${
              isPipReading
                ? "bg-amber-400 text-amber-950 border-amber-500 animate-pulse"
                : "bg-white text-indigo-800 border-indigo-200 hover:bg-indigo-50"
            }`}
            title="Listen to Pip pronounce with word karaoke"
          >
            <Volume2 size={15} />
            <span>{isPipReading ? "Pip Speaking... 🗣️" : "Hear Pip & Follow 🗣️"}</span>
          </button>

          {(isCompleted || evaluationResult) && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-white text-text-muted hover:text-text-dark border border-lab-wood/20 shadow-xs cursor-pointer"
              title="Practice Again"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Target Sentence Display with Live Karaoke & Real-time Spoken Highlighting */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-indigo-100 mb-4 shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] text-text-muted font-bold">
            Tap any word to hear pronunciation • Spoken: {spokenCount} of {cleanTargetWords.length} words
          </span>
          <span className="text-[10px] font-black bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-full">
            Read all words
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-black leading-relaxed">
          {rawWords.map((word, idx) => {
            const cleanWord = cleanTargetWords[idx];
            const isSpoken = Boolean(spokenWordsMap[cleanWord]);
            const isKaraokeActive = isPipReading && karaokeWordIdx === idx;

            return (
              <motion.button
                key={idx}
                type="button"
                onClick={(e) => handleHearSingleWord(word, e)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer select-none ${
                  isKaraokeActive
                    ? "bg-amber-300 text-amber-950 border-amber-500 scale-110 shadow-md ring-4 ring-amber-200"
                    : isSpoken
                    ? "bg-emerald-100 text-emerald-950 border-emerald-400 font-black shadow-xs"
                    : "bg-lab-chalk/40 text-text-dark border-lab-wood/15 hover:border-indigo-300 hover:bg-indigo-50/50"
                }`}
                title={`Tap to hear: "${word}"`}
              >
                <span>{word}</span>
                {isSpoken && <span className="ml-1 text-[11px] text-emerald-600 font-black">✓</span>}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Speech Interaction Zone */}
      <div className="space-y-3">
        {!isCompleted ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                type="button"
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

              {/* Check My Reading button — user decides when to evaluate */}
              {spokenCount > 0 && !isCompleted && (
                <button
                  type="button"
                  onClick={() => handleEvaluate()}
                  className="px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs shadow-soft transition-all cursor-pointer"
                >
                  Check My Reading 🎯
                </button>
              )}
            </div>

            {/* Listening Wave Visualizer */}
            {isListening && (
              <div className="flex flex-col items-center gap-1.5 py-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-7 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="w-2 h-8 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
                  <span className="w-2 h-4 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
                </div>
                <span className="text-xs font-black text-indigo-900">
                  Microphone is active! Read the full sentence at your own pace.
                </span>
              </div>
            )}

            {/* If evaluation was attempted but score was too low */}
            {evaluationResult && !evaluationResult.passed && (
              <div className="bg-amber-100 border-2 border-amber-300 p-4 rounded-2xl text-amber-950 text-xs text-left space-y-2 mt-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-amber-600 shrink-0" />
                  <span className="font-black">
                    Accuracy: {evaluationResult.score}% (Spoke {spokenCount} of {cleanTargetWords.length} words)
                  </span>
                </div>
                <p>
                  You skipped or mispronounced some words. Tap the un-highlighted words above to hear Pip, then tap <strong>&ldquo;Tap & Read Aloud&rdquo;</strong> to try again!
                </p>
              </div>
            )}
          </>
        ) : (
          /* Detailed Success & Accuracy Report */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-emerald-300 p-5 rounded-3xl text-left shadow-soft space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-black text-sm text-text-dark">
                    Sentence Completed! 🎉
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Excellent pronunciation and full sentence reading.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-emerald-500 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-xs">
                  {evaluationResult?.score || 100}% Accuracy ⭐
                </div>
                <span className="text-xs font-black bg-purple-100 text-purple-900 px-3 py-1.5 rounded-xl border border-purple-200">
                  +50 XP 🚀
                </span>
              </div>
            </div>

            {/* Word-by-Word Practice Breakdown */}
            <div className="border-t border-lab-wood/10 pt-3">
              <span className="text-[11px] font-black text-text-muted block mb-1.5">
                Mastered Words (Tap any to hear):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {rawWords.map((word, i) => {
                  const clean = cleanTargetWords[i];
                  const passed = spokenWordsMap[clean];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => handleHearSingleWord(word, e)}
                      className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                        passed
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-amber-50 text-amber-900 border-amber-300"
                      }`}
                      title={`Tap to hear "${word}"`}
                    >
                      <span>{word}</span>
                      <span>{passed ? "✓" : "🔁"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
