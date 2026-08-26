"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RotateCcw, Sparkles, Shield, Zap } from "lucide-react";
import { playPopSound, playDiscoverySound, playSuccessSound, speak } from "@/lib/audio-manager";

export function PolymerChainBuilder() {
  const [monomers, setMonomers] = useState<number[]>([1]);

  const addMonomer = () => {
    if (monomers.length < 8) {
      playPopSound();
      const nextList = [...monomers, monomers.length + 1];
      setMonomers(nextList);

      if (nextList.length === 2) {
        speak("You joined two monomers together!");
      } else if (nextList.length === 5) {
        playDiscoverySound();
        speak("The chain is getting longer! Notice how its tensile strength and solid structure are rising!");
      } else if (nextList.length === 8) {
        playSuccessSound();
        speak("Incredible! You synthesized a high-molecular-weight polymer chain! It is now super tough and durable!");
      }
    }
  };

  const resetChain = () => {
    playPopSound();
    setMonomers([1]);
  };

  const strengthPercent = Math.round((monomers.length / 8) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-lab-wood/20 shadow-soft w-full max-w-4xl mx-auto text-center">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-factory-orange/10 flex items-center justify-center text-2xl shadow-inner shrink-0">
            🧪
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-dark">
              Interactive Polymer Chain Builder
            </h2>
            <p className="text-xs text-text-muted">
              Connect small monomer units together to synthesize a super-strong synthetic polymer!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetChain}
            className="p-2 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-muted hover:text-text-dark transition-colors"
            title="Reset Chain"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Polymer Chain Visual Canvas */}
      <div className="bg-gradient-to-br from-lab-chalk to-lab-warm/40 rounded-3xl p-6 sm:p-8 border-2 border-dashed border-lab-wood/30 mb-6 min-h-[180px] flex items-center justify-center overflow-x-auto">
        <div className="flex items-center gap-2 py-4">
          <AnimatePresence>
            {monomers.map((num, idx) => (
              <motion.div
                key={num}
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center"
              >
                {/* Monomer Bead */}
                <div className="relative group flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-pip-blue to-indigo-500 text-white font-black text-sm sm:text-base flex flex-col items-center justify-center shadow-medium border-2 border-white/80">
                    <span>Monomer</span>
                    <span className="text-[10px] text-blue-100 font-mono">#{num}</span>
                  </div>
                </div>

                {/* Connecting Polymer Bond */}
                {idx < monomers.length - 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    transition={{ duration: 0.3 }}
                    className="h-3 bg-gradient-to-r from-indigo-500 to-pip-blue rounded-full shadow-xs mx-0.5"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls & Real-time Material Strength Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Strength Progress Bar */}
        <div className="bg-lab-chalk/80 rounded-2xl p-4 border border-lab-wood/20 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-extrabold text-text-dark uppercase tracking-wider flex items-center gap-1.5">
              <Shield size={14} className="text-pip-blue" />
              <span>Material Tensile Strength:</span>
            </span>
            <span className="text-xs font-mono font-black text-pip-blue-dark">
              {strengthPercent}% ({monomers.length >= 6 ? "High Polymer" : monomers.length >= 3 ? "Oligomer" : "Monomer"})
            </span>
          </div>

          <div className="w-full h-3 bg-lab-wood-light/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                monomers.length >= 6
                  ? "bg-nature-green"
                  : monomers.length >= 3
                  ? "bg-factory-orange"
                  : "bg-pip-blue"
              }`}
              style={{ width: `${strengthPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-text-muted mt-2">
            {monomers.length === 1 && "Single unit (monomer): Weak and easily broken."}
            {monomers.length >= 2 && monomers.length < 6 && "Short chain: Gaining flexibility and cohesion."}
            {monomers.length >= 6 && "Long polymer chain: Unmatched tensile strength and toughness!"}
          </p>
        </div>

        {/* Action Button */}
        <div>
          {monomers.length < 8 ? (
            <motion.button
              onClick={addMonomer}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pip-blue to-indigo-600 hover:from-pip-blue-dark hover:to-indigo-700 text-white font-extrabold text-base shadow-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus size={20} />
              <span>Link Next Monomer Unit 🧪</span>
            </motion.button>
          ) : (
            <div className="p-3.5 rounded-2xl bg-nature-green/10 border-2 border-nature-green text-nature-green-dark font-extrabold text-sm flex items-center justify-center gap-2">
              <Sparkles size={18} />
              <span>Polymerization Complete! High Strength Achieved!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
