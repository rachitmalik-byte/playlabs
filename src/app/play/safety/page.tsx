'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flame, Droplets, ArrowRight, ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2, Lightbulb, RotateCcw, Lock } from 'lucide-react';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playWarningSound, playClickSound, playPopSound, speak } from '@/lib/audio-manager';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { SentenceVoiceReader } from '@/components/learning/SentenceVoiceReader';
import { ParentPinGateModal } from '@/components/learning/ParentPinGateModal';

export default function SafetyMission() {
  const [activeTab, setActiveTab] = useState<'fire' | 'sweat'>('fire');
  const [fireStage, setFireStage] = useState<0 | 1 | 2 | 3>(0);
  const [sweatStage, setSweatStage] = useState<0 | 1 | 2>(0);
  const [draggedFabric, setDraggedFabric] = useState<string | null>(null);
  const [showPinGate, setShowPinGate] = useState(false);
  const router = useRouter();

  // Load saved stages from session
  useEffect(() => {
    try {
      const savedTab = sessionStorage.getItem("polyquest-safety-tab");
      if (savedTab === 'fire' || savedTab === 'sweat') setActiveTab(savedTab);
      const savedFire = sessionStorage.getItem("polyquest-safety-fire");
      if (savedFire) setFireStage(Number(savedFire) as any);
      const savedSweat = sessionStorage.getItem("polyquest-safety-sweat");
      if (savedSweat) setSweatStage(Number(savedSweat) as any);
    } catch {}
  }, []);

  const switchTab = (tab: 'fire' | 'sweat') => {
    playClickSound();
    setActiveTab(tab);
    try {
      sessionStorage.setItem("polyquest-safety-tab", tab);
    } catch {}
  };

  const updateFireStage = (stage: 0 | 1 | 2 | 3) => {
    playClickSound();
    setFireStage(stage);
    try {
      sessionStorage.setItem("polyquest-safety-fire", String(stage));
    } catch {}
  };

  const updateSweatStage = (stage: 0 | 1 | 2) => {
    playClickSound();
    setSweatStage(stage);
    try {
      sessionStorage.setItem("polyquest-safety-sweat", String(stage));
    } catch {}
  };

  const handleTestFabric = (fabric: string) => {
    setDraggedFabric(fabric);
    updateFireStage(2);
    if (fabric === 'cotton') {
      playDiscoverySound();
      speak("Look closely! The cotton fabric chars slowly and turns to soft grey ash without melting!");
      logChildAttempt('plastic_safety', true, 'Observed cotton chars safely to ash in flame test', 'safety');
    } else {
      playWarningSound();
      speak("Careful! The synthetic fabric shrinks, melts into a hot bead, and sticks! That is why we should never wear synthetic clothes near open fire!");
      logChildAttempt('plastic_safety', true, 'Observed synthetic fabric melting into sticky beads near flame', 'safety');
    }
  };

  const handleReset = () => {
    playPopSound();
    setFireStage(0);
    setSweatStage(0);
    setDraggedFabric(null);
    try {
      sessionStorage.removeItem("polyquest-safety-fire");
      sessionStorage.removeItem("polyquest-safety-sweat");
    } catch {}
    speak("Safety test reset! Choose Cotton or Synthetic fabric to test flame behavior!");
  };

  const isCompleted = fireStage >= 2 || sweatStage >= 1;

  const handleNextClick = () => {
    if (!isCompleted) {
      playPopSound();
      setShowPinGate(true);
    } else {
      playClickSound();
      router.push("/play/plastic");
    }
  };

  return (
    <div className="min-h-screen bg-lab-cream p-6 sm:p-8 font-nunito text-text-dark flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-lab-chalk p-4 rounded-2xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex items-center gap-3">
            <Link
              href="/play/experiments"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>← Mission 3 (Experiments)</span>
            </Link>

            <div>
              <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider block">
                Chapter 3 • Critical Safety
              </span>
              <h1 className="text-base sm:text-lg font-black text-text-dark">
                Mission 4: Fire Safety & Summer Sweat Lab
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all flex items-center gap-1"
              title="Redo Test"
            >
              <RotateCcw size={13} />
              <span>Redo 🔄</span>
            </button>

            <div className="flex gap-2 bg-white p-1 rounded-2xl border border-lab-wood/20 shadow-xs">
              <button
                onClick={() => switchTab('fire')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeTab === 'fire' ? 'bg-fire-red text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                <Flame size={15} />
                <span>Flame Test 🔥</span>
              </button>
              <button
                onClick={() => switchTab('sweat')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeTab === 'sweat' ? 'bg-water-blue text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                <Droplets size={15} />
                <span>Sweat Test 💧</span>
              </button>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-lab-wood/25 min-h-[440px]">
          
          {/* TAB 1: FLAME TEST */}
          {activeTab === 'fire' && (
            <div className="space-y-6">
              <div className="speech-bubble mx-auto max-w-xl text-center">
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;We are getting ready for fireworks and cooking. Why should we NEVER wear synthetic clothes near open fire? Let&apos;s run a safe virtual flame test!&rdquo;
                </p>
              </div>

              {fireStage === 0 && (
                <div className="space-y-6 text-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                    <button
                      onClick={() => handleTestFabric('cotton')}
                      className="p-6 rounded-3xl border-3 border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/80 transition-all flex flex-col items-center gap-2 cursor-pointer shadow-xs hover:scale-103"
                    >
                      <span className="text-5xl">👕</span>
                      <h4 className="font-black text-base text-emerald-950">Natural Cotton</h4>
                      <span className="text-xs text-emerald-700 font-bold">From cotton plants 🌿</span>
                      <span className="mt-2 text-[10px] font-black bg-emerald-600 text-white px-3 py-1 rounded-full">
                        Test in Flame 🔥
                      </span>
                    </button>

                    <button
                      onClick={() => handleTestFabric('synthetic')}
                      className="p-6 rounded-3xl border-3 border-orange-300 bg-orange-50/60 hover:bg-orange-100/80 transition-all flex flex-col items-center gap-2 cursor-pointer shadow-xs hover:scale-103"
                    >
                      <span className="text-5xl">🎽</span>
                      <h4 className="font-black text-base text-orange-950">Synthetic Polyester</h4>
                      <span className="text-xs text-orange-700 font-bold">Man-made polymer 🏭</span>
                      <span className="mt-2 text-[10px] font-black bg-orange-600 text-white px-3 py-1 rounded-full">
                        Test in Flame 🔥
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {fireStage >= 2 && (
                <div className="space-y-6">
                  {/* Flame Result Box */}
                  <div className="bg-slate-900 rounded-3xl p-6 text-white border-4 border-slate-700 flex flex-col sm:flex-row items-center justify-around gap-6">
                    <div className="flex flex-col items-center">
                      <motion.span 
                        className="text-6xl"
                        animate={{ scale: [1, 1.15, 1], rotate: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        🔥
                      </motion.span>
                      <span className="text-xs font-mono font-bold text-amber-400 mt-2">Virtual Flame Rig</span>
                    </div>

                    <div className="bg-white/10 p-5 rounded-2xl border border-white/20 text-center max-w-sm">
                      <span className="text-xs text-slate-300 font-bold block mb-1">
                        Tested: {draggedFabric === 'cotton' ? 'Natural Cotton 🌿' : 'Synthetic Polyester 🏭'}
                      </span>

                      {draggedFabric === 'cotton' ? (
                        <div className="space-y-1">
                          <span className="text-base font-black text-emerald-400 block">
                            ✓ Chars to soft ash powder
                          </span>
                          <p className="text-xs text-slate-300">
                            Cotton does NOT melt or stick. It simply burns to harmless carbon ash.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-base font-black text-rose-400 block animate-pulse">
                            ⚠️ MELTS INTO HOT STICKY BEAD!
                          </span>
                          <p className="text-xs text-rose-200">
                            Synthetic polymers melt rapidly when heated and stick tightly to skin, causing severe burns!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Exam Bridge */}
                  <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-xs text-text-dark font-mono leading-relaxed">
                    <strong>Class 8 Science Rule:</strong> Synthetic fibres melt on heating. If the clothes catch fire, the fabric melts and sticks to the body of the person wearing it. Therefore, we should NOT wear synthetic clothes while working in the kitchen or near Diwali fireworks!
                  </div>

                  <SentenceVoiceReader
                    sentence="Synthetic clothes melt on heating and stick to skin, so always wear cotton near fire!"
                    conceptTitle="Fire Safety"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SWEAT TEST */}
          {activeTab === 'sweat' && (
            <div className="space-y-6">
              <div className="speech-bubble mx-auto max-w-xl text-center">
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;Hot summer day! Which shirt should we wear under the burning sun? Let&apos;s pour water drops to test sweat absorption!&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                <div className="bg-emerald-50/70 border-2 border-emerald-300 p-5 rounded-3xl text-center space-y-2">
                  <span className="text-5xl">👕</span>
                  <h4 className="font-black text-sm text-emerald-950">Natural Cotton</h4>
                  <p className="text-xs text-emerald-800">
                    Hollow plant fibres absorb sweat and let skin breathe! Cool and fresh in summer.
                  </p>
                  <span className="text-[10px] font-black bg-emerald-600 text-white px-3 py-1 rounded-full inline-block">
                    ✓ Recommended for Summer
                  </span>
                </div>

                <div className="bg-orange-50/70 border-2 border-orange-300 p-5 rounded-3xl text-center space-y-2">
                  <span className="text-5xl">🎽</span>
                  <h4 className="font-black text-sm text-orange-950">Synthetic Polyester</h4>
                  <p className="text-xs text-orange-800">
                    Hydrophobic synthetic fibres repel water. Sweat stays trapped on skin, feeling sticky!
                  </p>
                  <span className="text-[10px] font-black bg-orange-600 text-white px-3 py-1 rounded-full inline-block">
                    Repels Water Droplets
                  </span>
                </div>
              </div>

              <SentenceVoiceReader
                sentence="Cotton absorbs body sweat and lets skin breathe during hot summer days!"
                conceptTitle="Summer Comfort Science"
              />
            </div>
          )}

        </main>

        <footer className="mt-8 flex justify-between items-center pt-4 border-t border-lab-wood/15">
          <Link 
            href="/play/experiments" 
            onClick={() => playClickSound()}
            className="px-5 py-2.5 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>← Mission 3 (Experiments)</span>
          </Link>

          <button 
            onClick={handleNextClick}
            className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-soft transition-all flex items-center gap-1.5 ${
              isCompleted
                ? "bg-nature-green hover:bg-nature-green-dark text-white cursor-pointer"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            <span>Next: Plastic & Power Station ➔</span>
            {!isCompleted && <Lock size={13} className="text-gray-600" />}
          </button>
        </footer>
      </div>

      {/* Parent PIN Lock Gate Modal */}
      <ParentPinGateModal
        isOpen={showPinGate}
        onClose={() => setShowPinGate(false)}
        onUnlockSuccess={() => router.push("/play/plastic")}
        activityTitle="Mission 4: Safety & Flame Tests"
      />
    </div>
  );
}
