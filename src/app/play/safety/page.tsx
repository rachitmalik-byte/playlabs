'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Flame, Droplets, ArrowRight, ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2, Lightbulb, RotateCcw } from 'lucide-react';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playWarningSound, playClickSound, playPopSound, speak } from '@/lib/audio-manager';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';

export default function SafetyMission() {
  const [activeTab, setActiveTab] = useState<'fire' | 'sweat'>('fire');
  const [fireStage, setFireStage] = useState<0 | 1 | 2 | 3>(0);
  const [sweatStage, setSweatStage] = useState<0 | 1 | 2>(0);
  const [draggedFabric, setDraggedFabric] = useState<string | null>(null);

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

  const handleDragEnd = (fabric: string, _info: any) => {
    handleTestFabric(fabric);
  };

  return (
    <div className="min-h-screen bg-lab-cream p-6 sm:p-8 font-sans text-text-dark">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-lab-chalk p-4 rounded-2xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex items-center gap-3">
            <Link
              href="/play/experiments"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>← Mission 3</span>
            </Link>

            <div>
              <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider block">
                Chapter 3 • Critical Science Safety
              </span>
              <h1 className="text-base sm:text-lg font-black text-text-dark">
                Mission 4: Fire Safety & Summer Sweat Lab
              </h1>
            </div>
          </div>

          <div className="flex gap-2 bg-white p-1 rounded-2xl border border-lab-wood/20 shadow-xs">
            <button
              onClick={() => switchTab('fire')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'fire' ? 'bg-fire-red text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              <Flame size={14} />
              <span>Fire Safety</span>
            </button>
            <button
              onClick={() => switchTab('sweat')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'sweat' ? 'bg-water-blue text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              <Droplets size={14} />
              <span>Summer Sweat Test</span>
            </button>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-lab-wood/25">
          {activeTab === 'fire' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-7 h-7 text-fire-red" />
                  <h2 className="text-xl sm:text-2xl font-black text-text-dark">Fire Safety Experience</h2>
                </div>

                {fireStage > 0 && (
                  <button
                    onClick={() => updateFireStage((fireStage - 1) as any)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
                  >
                    <ArrowLeft size={13} />
                    <span>← Previous Step</span>
                  </button>
                )}
              </div>

              {fireStage === 0 && (
                <div className="space-y-6">
                  <div className="speech-bubble">
                    <p className="text-base text-text-dark font-medium">
                      Pip says: &ldquo;We are getting ready for a festival! Should we choose cotton or synthetic clothes near sparklers and diyas?&rdquo;
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-nature-green/40 bg-nature-green/5 p-6 rounded-2xl flex flex-col items-center cursor-pointer shadow-xs"
                    >
                      <span className="text-6xl mb-2">👕</span>
                      <span className="font-extrabold text-base text-nature-green-dark">Cotton Shirt</span>
                      <span className="text-xs text-text-muted mt-1"><KidTermTooltip term="natural" displayText="Natural plant fibre" /></span>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-factory-orange/40 bg-factory-orange/5 p-6 rounded-2xl flex flex-col items-center cursor-pointer shadow-xs"
                    >
                      <span className="text-6xl mb-2">🎽</span>
                      <span className="font-extrabold text-base text-factory-orange-dark">Synthetic (Polyester) Shirt</span>
                      <span className="text-xs text-text-muted mt-1"><KidTermTooltip term="synthetic" displayText="Man-made polymer" /></span>
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => updateFireStage(1)}
                      className="px-8 py-3.5 bg-fire-red hover:bg-red-600 active:scale-95 text-white font-black rounded-2xl shadow-soft transition-all text-sm"
                    >
                      Test Near Controlled Flame →
                    </button>
                  </div>
                </div>
              )}

              {fireStage === 1 && (
                <div className="flex flex-col items-center gap-6 relative min-h-[380px] border-2 border-dashed border-lab-wood-light rounded-2xl p-8 bg-lab-chalk/50">
                  <div className="text-center">
                    <p className="text-xl font-bold mb-1">Click or drag a fabric into the flame zone</p>
                    <p className="text-xs text-text-muted">Observe how each material reacts differently to heat!</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-6 z-10">
                    <motion.div
                      drag
                      dragSnapToOrigin={true}
                      onClick={() => handleTestFabric('cotton')}
                      onDragEnd={(e, info) => handleDragEnd('cotton', info)}
                      className="cursor-pointer bg-white p-4 rounded-2xl shadow-medium border-2 border-nature-green hover:border-nature-green-dark flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-4xl">👕</span>
                      <span className="font-bold text-sm">Cotton Shirt</span>
                      <span className="text-[11px] font-extrabold text-white bg-nature-green px-3 py-1 rounded-full shadow-xs">
                        🔥 Test Cotton in Flame
                      </span>
                    </motion.div>

                    <motion.div
                      drag
                      dragSnapToOrigin={true}
                      onClick={() => handleTestFabric('synthetic')}
                      onDragEnd={(e, info) => handleDragEnd('synthetic', info)}
                      className="cursor-pointer bg-white p-4 rounded-2xl shadow-medium border-2 border-factory-orange hover:border-factory-orange-dark flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-4xl">🎽</span>
                      <span className="font-bold text-sm">Synthetic Shirt</span>
                      <span className="text-[11px] font-extrabold text-white bg-factory-orange px-3 py-1 rounded-full shadow-xs">
                        🔥 Test Synthetic in Flame
                      </span>
                    </motion.div>
                  </div>

                  <div className="mt-4 w-44 h-44 drop-zone flex flex-col items-center justify-center border-4 border-dashed border-fire-red/40 bg-fire-red-light/10 rounded-full shadow-inner">
                    <Flame className="w-16 h-16 text-fire-red animate-pulse" />
                    <span className="font-bold text-sm text-fire-red mt-1">Flame Test Zone</span>
                  </div>
                </div>
              )}

              {fireStage === 2 && (
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-full max-w-md bg-lab-chalk p-8 rounded-3xl border-2 border-lab-wood shadow-soft">
                    <h3 className="text-xl font-black mb-4 text-center">Observation Step</h3>
                    
                    {draggedFabric === 'cotton' ? (
                      <div className="flex flex-col items-center mb-6">
                        <motion.div 
                          initial={{ filter: 'brightness(1)' }}
                          animate={{ filter: 'brightness(0.3) sepia(0.5)' }}
                          transition={{ duration: 2 }}
                          className="text-6xl mb-4"
                        >
                          👕
                        </motion.div>
                        <p className="font-bold text-base text-center text-nature-green-dark">
                          It chars slowly and turns to soft grey ash without melting!
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center mb-6">
                        <motion.div 
                          initial={{ scale: 1 }}
                          animate={{ scale: 0.6, borderRadius: '50%', y: 15 }}
                          transition={{ duration: 2 }}
                          className="text-6xl mb-4"
                        >
                          🎽
                        </motion.div>
                        <p className="font-bold text-base text-center text-fire-red">
                          It shrinks, melts into a hot sticky bead, and adheres!
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <p className="font-bold text-xs text-text-muted text-center uppercase tracking-wider">What did you observe?</p>
                      <button 
                        onClick={() => updateFireStage(3)}
                        className="w-full text-left p-4 rounded-2xl border-2 border-lab-wood bg-white hover:bg-lab-cream font-bold text-xs sm:text-sm transition-all shadow-xs"
                      >
                        {draggedFabric === 'cotton' 
                          ? "✓ The cotton burned slowly and crumbled safely into ash." 
                          : "⚠️ The synthetic fabric melted and formed a dangerous sticky bead!"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {fireStage === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-fire-red/10 border-2 border-fire-red/30 p-6 rounded-3xl flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-fire-red shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-black text-fire-red">CRITICAL SAFETY RULE</h4>
                      <p className="text-xs sm:text-sm text-text-dark mt-1 leading-relaxed">
                        Synthetic fabrics (polyester, nylon, acrylic) <strong>MELT ON HEATING</strong>. If they catch fire, the hot melted plastic sticks to the skin, causing severe burns. That is why we should never wear synthetic clothes in kitchens or near festival fires!
                      </p>
                    </div>
                  </div>

                  <div className="exam-bridge bg-amber-50/70 border-2 border-lab-wood p-5 rounded-2xl">
                    <p className="font-mono text-xs font-bold text-text-dark">
                      Exam Key Point: Synthetic fibres melt on heating and stick to the body of the person wearing them. Therefore, cotton clothing is recommended when working with fire.
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <button 
                      onClick={() => switchTab('sweat')}
                      className="px-6 py-3 bg-water-blue hover:bg-blue-600 text-white font-extrabold rounded-2xl shadow-soft text-xs transition-all"
                    >
                      Now Try the Summer Sweat Test →
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'sweat' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-7 h-7 text-water-blue" />
                  <h2 className="text-xl sm:text-2xl font-black text-text-dark">Summer Sweat Test</h2>
                </div>

                {sweatStage > 0 && (
                  <button
                    onClick={() => updateSweatStage((sweatStage - 1) as any)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lab-chalk hover:bg-lab-warm text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
                  >
                    <ArrowLeft size={13} />
                    <span>← Previous Step</span>
                  </button>
                )}
              </div>

              {sweatStage === 0 && (
                <div className="space-y-6 text-center">
                  <div className="speech-bubble mx-auto max-w-xl">
                    <p className="text-base text-text-dark font-medium">
                      Pip is feeling warm on a hot sunny day ☀️. Let&apos;s see how cotton and synthetic fabrics handle sweat!
                    </p>
                  </div>

                  <div className="text-6xl my-6 animate-pulse">☀️ 🥵</div>

                  <button 
                    onClick={() => {
                      updateSweatStage(1);
                      playDiscoverySound();
                      speak("Watch how sweat drops interact with both fabrics!");
                    }}
                    className="px-8 py-3.5 bg-water-blue hover:bg-blue-600 text-white font-black rounded-2xl shadow-soft transition-all text-sm"
                  >
                    Pour Water / Sweat Drops 💧
                  </button>
                </div>
              )}

              {sweatStage === 1 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Cotton */}
                    <div className="border-2 border-water-blue/40 bg-blue-50/30 p-6 rounded-3xl flex flex-col items-center relative overflow-hidden">
                      <span className="text-5xl mb-3">👕</span>
                      <h4 className="font-extrabold text-base text-text-dark">Cotton</h4>
                      <p className="text-xs text-text-muted mb-4"><KidTermTooltip term="breathable" displayText="Breathable & Absorbent" /></p>
                      
                      <div className="relative w-32 h-20 bg-emerald-100 rounded-2xl border-2 border-emerald-300 flex items-center justify-center p-2 text-center">
                        <span className="text-xs font-bold text-emerald-800">Sweat absorbs into hollow pores!</span>
                      </div>
                    </div>

                    {/* Synthetic */}
                    <div className="border-2 border-factory-orange/40 bg-orange-50/30 p-6 rounded-3xl flex flex-col items-center relative overflow-hidden">
                      <span className="text-5xl mb-3">🎽</span>
                      <h4 className="font-extrabold text-base text-text-dark">Synthetic</h4>
                      <p className="text-xs text-text-muted mb-4"><KidTermTooltip term="synthetic" displayText="Hydrophobic Polymer" /></p>
                      
                      <div className="relative w-32 h-20 bg-amber-100 rounded-2xl border-2 border-amber-300 flex items-center justify-center p-2 text-center">
                        <span className="text-xs font-bold text-amber-800">Sweat beads on surface & sticks!</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => {
                        updateSweatStage(2);
                        logChildAttempt('plastic_safety', true, 'Learned why cotton is preferred in summer for sweat absorption', 'safety');
                      }}
                      className="px-8 py-3.5 bg-nature-green hover:bg-nature-green-dark text-white font-black rounded-2xl shadow-soft transition-all text-sm"
                    >
                      See Summer Recommendation ✓
                    </button>
                  </div>
                </div>
              )}

              {sweatStage === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-nature-green/10 border-2 border-nature-green/30 p-6 rounded-3xl flex items-start gap-4">
                    <ShieldCheck className="w-8 h-8 text-nature-green shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-black text-nature-green-dark">Why Cotton is Best for Summer</h4>
                      <p className="text-xs sm:text-sm text-text-dark mt-1 leading-relaxed">
                        Cotton is a <KidTermTooltip term="breathable" displayText="breathable" /> natural fabric. It absorbs body sweat and exposes it to air for quick cooling evaporation. Synthetic fabrics do not absorb sweat, making you feel sticky and trapped in heat!
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-lab-wood/15">
                    <button 
                      onClick={() => switchTab('fire')}
                      className="text-text-muted hover:text-text-dark text-xs font-bold"
                    >
                      ← Back to Fire Safety
                    </button>

                    <Link 
                      href="/play/plastic"
                      onClick={() => playClickSound()}
                      className="px-6 py-2.5 bg-nature-green text-white font-extrabold rounded-xl hover:bg-nature-green-dark transition-all text-xs shadow-soft flex items-center gap-1.5"
                    >
                      <span>Next: Plastic & Power →</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
