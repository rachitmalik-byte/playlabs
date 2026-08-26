"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Sparkles, CheckCircle2, ArrowRight, Volume2 } from "lucide-react";
import { MagicVoiceListener, isSpeechRecognitionSupported } from "@/lib/speech-recognition";
import { playSuccessSound, playClickSound, playPopSound, speak } from "@/lib/audio-manager";

interface VoiceUnlockModalProps {
  isOpen: boolean;
  targetWord: string;
  wordMeaning?: string;
  nextRoute: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function VoiceUnlockModal({
  isOpen,
  targetWord,
  wordMeaning = "the magic science concept!",
  nextRoute,
  onSuccess,
  onClose,
}: VoiceUnlockModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const listenerRef = useRef<MagicVoiceListener | null>(null);

  useEffect(() => {
    setSupported(isSpeechRecognitionSupported());
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setTranscript("");
      setHasError(null);

      // Pip speaks the prompt
      speak(`Say the magic science word: ${targetWord}! To unlock the next mission!`);

      // Start listening automatically if supported
      if (isSpeechRecognitionSupported()) {
        const listener = new MagicVoiceListener();
        listenerRef.current = listener;

        listener.start({
          targetWords: [targetWord, targetWord.replace(/\s+/g, "")],
          onTranscript: (heardText) => {
            setTranscript(heardText);
          },
          onMatch: (matchedWord) => {
            setIsSuccess(true);
            playSuccessSound();
            speak(`Hurray! You said ${matchedWord}! Mission Unlocked!`);
            setTimeout(() => {
              onSuccess();
            }, 1800);
          },
          onError: (err) => {
            if (err === "not-allowed") {
              setHasError("Microphone access was denied. You can tap the button below instead!");
            }
            setIsListening(false);
          },
          onEnd: () => {
            setIsListening(false);
          },
        });

        setIsListening(true);
      }
    } else {
      listenerRef.current?.stop();
      setIsListening(false);
    }

    return () => {
      listenerRef.current?.stop();
    };
  }, [isOpen, targetWord, onSuccess]);

  const toggleMic = () => {
    playClickSound();
    if (isListening) {
      listenerRef.current?.stop();
      setIsListening(false);
    } else if (listenerRef.current) {
      listenerRef.current.start({
        targetWords: [targetWord],
        onTranscript: (heardText) => setTranscript(heardText),
        onMatch: (matched) => {
          setIsSuccess(true);
          playSuccessSound();
          speak(`Great job! You said ${matched}!`);
          setTimeout(() => onSuccess(), 1800);
        },
        onEnd: () => setIsListening(false),
      });
      setIsListening(true);
    }
  };

  const handleManualUnlock = () => {
    playPopSound();
    setIsSuccess(true);
    speak(`Great job! Unlocking next mission!`);
    setTimeout(() => {
      onSuccess();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-4 border-pip-blue/40 shadow-warm text-center overflow-hidden"
        >
          {/* Top magic sparkles */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-pip-blue-dark mb-3">
            <Sparkles size={16} className="text-hint-yellow animate-spin" />
            <span>Voice Magic Unlock</span>
            <Sparkles size={16} className="text-hint-yellow animate-spin" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark mb-1">
            Say the Magic Word!
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mb-6">
            Speak into your microphone to cast the science spell and unlock the next level!
          </p>

          {/* Magic Word Highlight Card */}
          <motion.div
            className="bg-gradient-to-r from-pip-blue/15 via-hint-yellow/20 to-nature-green/15 border-2 border-dashed border-pip-blue rounded-2xl p-4 mb-6 shadow-xs"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
              Your Magic Word:
            </span>
            <span className="text-3xl sm:text-4xl font-black text-pip-blue-dark tracking-wider uppercase">
              &ldquo;{targetWord}&rdquo;
            </span>
            <p className="text-xs text-text-muted font-medium mt-1">
              ({wordMeaning})
            </p>
          </motion.div>

          {/* Success State or Listening Mic */}
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-2 py-4 text-success"
            >
              <CheckCircle2 size={64} className="animate-bounce" />
              <h3 className="text-xl font-extrabold text-success">
                Magic Word Recognized! 🎉
              </h3>
              <p className="text-xs text-text-muted">
                Opening the next science level...
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {/* Pulsing Mic Button */}
              <div className="relative">
                {isListening && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-pip-blue/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <motion.button
                  onClick={toggleMic}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-medium text-white transition-all ${
                    isListening ? "bg-fire-red animate-pulse" : "bg-pip-blue hover:bg-pip-blue-dark"
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening ? <Mic size={36} /> : <MicOff size={36} />}
                </motion.button>
              </div>

              {/* Status Indicator */}
              <p className="text-sm font-bold text-text-dark">
                {isListening ? "🎙️ Listening... Speak clearly!" : "Mic paused. Tap to listen!"}
              </p>

              {/* Live Transcript Bubble */}
              {transcript && (
                <div className="bg-lab-chalk border border-lab-wood/20 rounded-xl px-4 py-2 text-xs font-semibold text-text-dark max-w-xs">
                  I heard: &ldquo;{transcript}&rdquo;
                </div>
              )}

              {/* Error fallback */}
              {hasError && (
                <p className="text-xs text-fire-red font-medium">
                  {hasError}
                </p>
              )}

              {!supported && (
                <p className="text-xs text-text-muted">
                  (Voice recognition is best in Chrome or Edge)
                </p>
              )}

              {/* Fallback Unlock button */}
              <div className="flex items-center justify-center gap-3 mt-3 w-full">
                <button
                  onClick={handleManualUnlock}
                  className="w-full py-3 px-4 rounded-xl bg-nature-green hover:bg-nature-green-dark text-white font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition-all"
                >
                  <span>Unlock Next Mission</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Close modal X */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-muted hover:text-text-dark font-bold text-base p-1"
          >
            ✕
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
