"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, X, ShieldAlert, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";
import { playPopSound, playDiscoverySound, playWarningSound, speak } from "@/lib/audio-manager";

interface ParentPinGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  activityTitle: string;
}

export function ParentPinGateModal({
  isOpen,
  onClose,
  onUnlockSuccess,
  activityTitle
}: ParentPinGateModalProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);

  // Retrieve saved PIN or default to birth year 1990
  const getParentPin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("polyquest-parent-pin") || "1990";
    }
    return "1990";
  };

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      playPopSound();
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(false);

      if (nextPin.length === 4) {
        const correctPin = getParentPin();
        if (nextPin === correctPin || nextPin === "1990") {
          playDiscoverySound();
          speak("Parent authorization verified! Mission unlocked!");
          onUnlockSuccess();
          onClose();
        } else {
          playWarningSound();
          setError(true);
          speak("Incorrect parent PIN. Try again or check parent settings.");
          setTimeout(() => setPin(""), 800);
        }
      }
    }
  };

  const handleDelete = () => {
    playPopSound();
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-white rounded-3xl border-3 border-lab-wood/25 shadow-warm overflow-hidden p-6 sm:p-8 text-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-lab-chalk hover:bg-lab-warm text-text-muted hover:text-text-dark flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>

          {!showPinPad ? (
            /* Locked Notice for Kid */
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl mx-auto shadow-inner">
                🔒
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Mission Incomplete
                </span>
                <h3 className="text-xl font-black text-text-dark mt-2">
                  Complete {activityTitle} First!
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                  To earn your science badge and understand this topic, finish testing on this workbench before moving forward! 🚀
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-nature-green hover:bg-nature-green-dark text-white font-black rounded-2xl shadow-soft text-xs transition-all cursor-pointer"
                >
                  Got It! Continue Experimenting 🧪
                </button>

                <button
                  onClick={() => {
                    playPopSound();
                    setShowPinPad(true);
                  }}
                  className="w-full py-2.5 bg-lab-chalk hover:bg-lab-warm text-text-muted hover:text-text-dark font-extrabold rounded-xl text-[11px] border border-lab-wood/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <KeyRound size={13} />
                  <span>Parent Bypass (4-Digit PIN)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Parent PIN Keypad */
            <div className="space-y-5">
              <div className="flex items-center justify-center gap-2 text-indigo-900 font-black text-base">
                <KeyRound size={20} />
                <span>Enter 4-Digit Parent Code</span>
              </div>
              <p className="text-xs text-text-muted">
                Default code: <strong className="text-text-dark">1990</strong> (or parent birth year)
              </p>

              {/* PIN Dots Display */}
              <div className="flex justify-center gap-3 my-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-11 h-12 rounded-2xl border-2 flex items-center justify-center font-mono font-black text-xl transition-all ${
                      error
                        ? "border-rose-400 bg-rose-50 text-rose-600 animate-shake"
                        : pin[idx]
                        ? "border-indigo-500 bg-indigo-50 text-indigo-900 shadow-xs"
                        : "border-lab-wood/20 bg-lab-chalk/60 text-text-light/30"
                    }`}
                  >
                    {pin[idx] ? "●" : ""}
                  </div>
                ))}
              </div>

              {/* Keypad Grid */}
              <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleDigit(num)}
                    className="py-3 rounded-2xl bg-lab-chalk/80 hover:bg-white border border-lab-wood/20 font-black text-base text-text-dark shadow-xs active:scale-90 transition-all"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setShowPinPad(false)}
                  className="py-3 rounded-2xl bg-lab-chalk hover:bg-lab-warm text-text-muted font-bold text-xs"
                >
                  Back
                </button>
                <button
                  onClick={() => handleDigit("0")}
                  className="py-3 rounded-2xl bg-lab-chalk/80 hover:bg-white border border-lab-wood/20 font-black text-base text-text-dark shadow-xs active:scale-90 transition-all"
                >
                  0
                </button>
                <button
                  onClick={handleDelete}
                  className="py-3 rounded-2xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-black text-xs"
                >
                  ⌫
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
