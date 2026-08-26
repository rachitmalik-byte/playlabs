'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { SentenceVoiceReader } from '@/components/learning/SentenceVoiceReader';
import { ParentPinGateModal } from '@/components/learning/ParentPinGateModal';
import { LottieAnimation } from '@/components/lottie/LottieAnimation';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playPopSound, playClickSound, speak } from '@/lib/audio-manager';

const STAGES = [
  { days: 1, label: 'Day 1' },
  { days: 30, label: '1 Month' },
  { days: 180, label: '6 Months' },
  { days: 365, label: '1 Year' },
  { days: 3650, label: '10 Years' },
  { days: 18250, label: '50 Years' },
  { days: 36500, label: '100 Years' },
];

export default function EnvironmentMission() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [hasReached100, setHasReached100] = useState(false);
  const [showPinGate, setShowPinGate] = useState(false);
  const router = useRouter();

  const currentStage = STAGES[sliderIndex];

  // Helper to determine visual state based on days
  const getDecompState = (days: number, decompDays: number) => {
    if (days >= decompDays) return { opacity: 0, scale: 0, showSoil: true };
    if (days >= decompDays / 2) return { opacity: 0.5, scale: 0.8, filter: 'sepia(100%)', showSoil: false };
    return { opacity: 1, scale: 1, filter: 'none', showSoil: false };
  };

  const is100Years = sliderIndex === STAGES.length - 1;

  const handleSliderChange = (newIdx: number) => {
    playPopSound();
    setSliderIndex(newIdx);
    if (newIdx === STAGES.length - 1) {
      setHasReached100(true);
      playDiscoverySound();
      speak("Look closely! After 100 years, natural apple and cotton are completely gone. But the synthetic plastic bottle is 100% unchanged! Plastic is non-biodegradable.");
      logChildAttempt('non_biodegradable', true, 'Observed 100-year biodegradation difference between natural vs plastic', 'environment');
    }
  };

  const handleReset = () => {
    playPopSound();
    setSliderIndex(0);
    speak("Time machine reset to Day 1! Drag the slider across 100 years to watch decomposition!");
  };

  const handleNextClick = () => {
    if (!hasReached100) {
      playPopSound();
      setShowPinGate(true);
    } else {
      playClickSound();
      router.push("/play/extras");
    }
  };

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-6 sm:p-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-2xl border-2 border-lab-wood/20 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/play/plastic"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>← Mission 5 (Plastic)</span>
            </Link>

            <div>
              <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider block">
                Chapter 3 • Environmental Science
              </span>
              <h1 className="text-base sm:text-lg font-black text-text-dark">
                Mission 6: Underground 100-Year Time Journey
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all flex items-center gap-1"
              title="Reset Time Machine"
            >
              <RotateCcw size={13} />
              <span>Reset Time 🔄</span>
            </button>

            <span className="bg-pip-blue/10 text-pip-blue-dark font-mono font-black text-xs px-3.5 py-1.5 rounded-xl border border-pip-blue/30">
              ⏳ {currentStage.label}
            </span>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center">
          {/* Pip Dialogue & Lottie Soil Timeline */}
          <div className="speech-bubble bg-white p-5 rounded-2xl shadow-soft border-2 border-lab-wood/30 mb-4 w-full text-center flex flex-col items-center">
            <LottieAnimation preset="biodegradation" width={110} height={110} className="mb-2" />
            <p className="text-base sm:text-lg font-extrabold text-text-dark">
              {is100Years 
                ? "😱 The plastic bottle is STILL THERE after 100 years! Bacteria cannot digest synthetic polymers." 
                : "Pip says: 'Bury these items in the soil and drag the time slider to travel 100 years into the future!'"}
            </p>
          </div>

          {/* Underground Soil Box */}
          <div className="w-full bg-[#3d2b1f] rounded-3xl overflow-hidden relative shadow-inner border-t-8 border-nature-green p-6 min-h-[360px] flex flex-col justify-between">
            {/* Top Grass line */}
            <div className="flex justify-between items-center text-xs font-bold text-nature-green-light mb-4">
              <span>🌱 Top Soil & Grass Level</span>
              <span>Earth Cross-Section 🪱</span>
            </div>

            {/* Buried Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 my-auto">
              
              {/* Apple */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-black/20 border border-white/10 text-center">
                <span className="text-xs font-black text-white/90 mb-2">Apple Core</span>
                <div className="w-20 h-20 flex items-center justify-center relative">
                  <motion.span 
                    className="text-5xl absolute"
                    animate={getDecompState(currentStage.days, 60)}
                  >
                    🍎
                  </motion.span>
                  <motion.span 
                    className="text-4xl absolute"
                    animate={{ opacity: getDecompState(currentStage.days, 60).showSoil ? 1 : 0 }}
                  >
                    🪴
                  </motion.span>
                </div>
                <span className="text-[10px] font-bold text-amber-200 mt-2">
                  {currentStage.days >= 60 ? "✓ Decomposed into soil!" : "Decomposing..."}
                </span>
              </div>

              {/* Cotton Cloth */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-black/20 border border-white/10 text-center">
                <span className="text-xs font-black text-white/90 mb-2">Cotton Cloth</span>
                <div className="w-20 h-20 flex items-center justify-center relative">
                  <motion.span 
                    className="text-5xl absolute"
                    animate={getDecompState(currentStage.days, 180)}
                  >
                    👕
                  </motion.span>
                  <motion.span 
                    className="text-4xl absolute"
                    animate={{ opacity: getDecompState(currentStage.days, 180).showSoil ? 1 : 0 }}
                  >
                    🪴
                  </motion.span>
                </div>
                <span className="text-[10px] font-bold text-amber-200 mt-2">
                  {currentStage.days >= 180 ? "✓ Decomposed into soil!" : "Decomposing..."}
                </span>
              </div>

              {/* Jute Bag */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-black/20 border border-white/10 text-center">
                <span className="text-xs font-black text-white/90 mb-2">Jute Bag</span>
                <div className="w-20 h-20 flex items-center justify-center relative">
                  <motion.span 
                    className="text-5xl absolute"
                    animate={getDecompState(currentStage.days, 365)}
                  >
                    🛍️
                  </motion.span>
                  <motion.span 
                    className="text-4xl absolute"
                    animate={{ opacity: getDecompState(currentStage.days, 365).showSoil ? 1 : 0 }}
                  >
                    🪴
                  </motion.span>
                </div>
                <span className="text-[10px] font-bold text-amber-200 mt-2">
                  {currentStage.days >= 365 ? "✓ Decomposed into soil!" : "Decomposing..."}
                </span>
              </div>

              {/* Plastic Bottle (Dramatic) */}
              <div className="flex flex-col items-center p-3 rounded-2xl bg-black/30 border-2 border-fire-red/50 text-center">
                <span className="text-xs font-black text-white mb-2">Plastic Bottle</span>
                <div className="w-20 h-20 flex items-center justify-center relative">
                  <motion.span 
                    className="text-5xl"
                    animate={{ scale: is100Years ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: is100Years ? Infinity : 0, duration: 1.5 }}
                  >
                    🧴
                  </motion.span>
                </div>
                <span className="text-[10px] font-black text-fire-red bg-white px-2 py-0.5 rounded-full mt-2">
                  ⚠️ NOT DECOMPOSED!
                </span>
              </div>

            </div>

            {/* Time Machine Slider */}
            <div className="bg-white/95 rounded-2xl p-4 mt-6 shadow-soft flex items-center gap-4">
              <span className="text-xs font-black text-text-dark whitespace-nowrap">
                ⏳ Time Machine:
              </span>
              <input
                type="range"
                min="0"
                max={STAGES.length - 1}
                value={sliderIndex}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-3 bg-lab-chalk rounded-lg appearance-none cursor-pointer accent-pip-blue"
              />
              <span className="text-xs font-black text-pip-blue font-mono whitespace-nowrap">
                {currentStage.label}
              </span>
            </div>
          </div>

          {/* Discovery Card */}
          {is100Years && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white border-2 border-fire-red p-6 rounded-3xl w-full shadow-soft text-left space-y-3"
            >
              <div className="flex items-center gap-2 text-fire-red font-black text-base">
                <Lightbulb size={20} />
                <span>The Science of Non-Biodegradability</span>
              </div>
              <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                Natural materials (cotton, jute, wool) are <KidTermTooltip term="natural" displayText="biodegradable" /> and return nutrients to soil. Synthetic <KidTermTooltip term="synthetic" displayText="plastics" /> are <KidTermTooltip term="non-biodegradable" displayText="non-biodegradable" /> and remain unchanged for 500+ years. That is why we must practice the <strong>4R Principle: Reduce, Reuse, Recycle, and Recover!</strong>
              </p>

              <SentenceVoiceReader
                sentence="Plastics are non-biodegradable and take hundreds of years to decompose!"
                conceptTitle="Environmental Science"
              />
            </motion.div>
          )}
        </main>

        <footer className="mt-8 flex justify-between items-center pt-4 border-t border-lab-wood/15">
          <Link 
            href="/play/plastic" 
            onClick={() => playClickSound()}
            className="px-5 py-2.5 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>← Mission 5 (Plastic)</span>
          </Link>
          <button 
            onClick={handleNextClick}
            className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-soft transition-all flex items-center gap-1.5 ${
              hasReached100
                ? "bg-nature-green hover:bg-nature-green-dark text-white cursor-pointer"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            <span>Next: Rubber & Adhesives Lab ➔</span>
            {!hasReached100 && <Lock size={13} className="text-gray-600" />}
          </button>
        </footer>
      </div>

      {/* Parent PIN Lock Gate Modal */}
      <ParentPinGateModal
        isOpen={showPinGate}
        onClose={() => setShowPinGate(false)}
        onUnlockSuccess={() => router.push("/play/extras")}
        activityTitle="Mission 6: 100-Year Underground Time Travel"
      />
    </div>
  );
}
