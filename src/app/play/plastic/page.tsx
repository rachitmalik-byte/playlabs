'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Zap, ShieldAlert, ArrowRight, ArrowLeft, Lightbulb, Thermometer, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playWarningSound, playPopSound, playClickSound, speak } from '@/lib/audio-manager';

export default function PlasticMission() {
  const [activeSection, setActiveSection] = useState<'intro' | 'electrical' | 'heat'>('intro');
  const [wireMaterial, setWireMaterial] = useState<string | null>(null);
  const [handleMaterial, setHandleMaterial] = useState<string | null>(null);
  const [heatStatus, setHeatStatus] = useState<'idle' | 'testing' | 'result'>('idle');

  // Load session persistence
  useEffect(() => {
    try {
      const savedSection = sessionStorage.getItem("polyquest-plastic-sec");
      if (savedSection === 'intro' || savedSection === 'electrical' || savedSection === 'heat') {
        setActiveSection(savedSection);
      }
      const savedWire = sessionStorage.getItem("polyquest-plastic-wire");
      if (savedWire) setWireMaterial(savedWire);
      const savedHandle = sessionStorage.getItem("polyquest-plastic-handle");
      if (savedHandle) {
        setHandleMaterial(savedHandle);
        setHeatStatus('result');
      }
    } catch {}
  }, []);

  const switchSection = (sec: 'intro' | 'electrical' | 'heat') => {
    playClickSound();
    setActiveSection(sec);
    try {
      sessionStorage.setItem("polyquest-plastic-sec", sec);
    } catch {}
  };

  const handleSelectWire = (mat: string) => {
    setWireMaterial(mat);
    try {
      sessionStorage.setItem("polyquest-plastic-wire", mat);
    } catch {}

    if (mat === 'plastic' || mat === 'rubber') {
      playDiscoverySound();
      speak(`Safe! ${mat} is an electrical insulator. Electricity cannot escape through it!`);
      logChildAttempt('electrical_insulator', true, `Selected ${mat} for wire coating (safe insulator)`, 'plastic');
    } else {
      playWarningSound();
      speak(`Danger! ${mat} conducts electricity. You could get an electric shock!`);
      logChildAttempt('electrical_insulator', false, `Chose ${mat} for wire (unsafe conductor)`, 'plastic');
    }
  };

  const handleTestHeat = (material: string) => {
    playClickSound();
    setHandleMaterial(material);
    setHeatStatus('testing');
    try {
      sessionStorage.setItem("polyquest-plastic-handle", material);
    } catch {}

    setTimeout(() => {
      setHeatStatus('result');
      if (material === 'plastic' || material === 'wood') {
        playDiscoverySound();
        speak(`Safe touch! ${material} is a poor conductor of heat (heat insulator). The handle stays cool!`);
        logChildAttempt('heat_insulator', true, `Selected ${material} for kettle handle (heat insulator)`, 'plastic');
      } else {
        playWarningSound();
        speak(`Ouch! Metal is a good conductor of heat. The handle gets burning hot!`);
        logChildAttempt('heat_insulator', false, `Chose metal for kettle handle (conducts heat)`, 'plastic');
      }
    }, 1500);
  };

  const everydayObjects = [
    { name: 'Water Bottle', icon: '🧴', reason: 'Lightweight, durable & non-reactive' },
    { name: 'Switchboard', icon: '🎛️', reason: 'Electrical insulator (prevents shocks)' },
    { name: 'Toy Car', icon: '🧸', reason: 'Easily moldable into any fun shape' },
    { name: 'Kettle Handle', icon: '🍳', reason: 'Heat insulator (stays cool to touch)' },
  ];

  return (
    <div className="min-h-screen bg-lab-cream p-6 sm:p-8 font-sans text-text-dark">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-lab-chalk p-4 rounded-2xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex items-center gap-3">
            <Link
              href="/play/safety"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>← Mission 4</span>
            </Link>

            <div>
              <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider block">
                Chapter 3 • Plastic Science
              </span>
              <h1 className="text-base sm:text-lg font-black text-text-dark">
                Mission 5: Plastic & Power Lab
              </h1>
            </div>
          </div>

          <div className="flex gap-1.5 bg-white p-1 rounded-2xl border border-lab-wood/20 shadow-xs overflow-x-auto">
            <button
              onClick={() => switchSection('intro')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeSection === 'intro' ? 'bg-factory-orange text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              Why Plastic?
            </button>
            <button
              onClick={() => switchSection('electrical')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeSection === 'electrical' ? 'bg-pip-blue text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              ⚡ Electrical Wire
            </button>
            <button
              onClick={() => switchSection('heat')}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${
                activeSection === 'heat' ? 'bg-fire-red text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              🔥 Kettle Handle
            </button>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-lab-wood/25">
          {/* ============================================================
              TAB 1: WHY PLASTIC IS EVERYWHERE
              ============================================================ */}
          {activeSection === 'intro' && (
            <div className="space-y-6">
              <div className="speech-bubble">
                <p className="text-base text-text-dark font-medium">
                  Pip asks: &ldquo;Plastic is all around our house! Why did scientists choose <KidTermTooltip term="synthetic" displayText="synthetic plastic" /> for these items? Tap each to find out!&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {everydayObjects.map((obj) => (
                  <motion.div
                    key={obj.name}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-5 rounded-2xl border-2 border-lab-wood/20 bg-lab-chalk/40 flex items-center gap-4 cursor-pointer shadow-xs"
                    onClick={() => {
                      playPopSound();
                      speak(`${obj.name}! Made of plastic because it is ${obj.reason}`);
                    }}
                  >
                    <span className="text-4xl p-3 bg-white rounded-2xl shadow-xs border border-lab-wood/15">{obj.icon}</span>
                    <div>
                      <h4 className="font-black text-sm text-text-dark">{obj.name}</h4>
                      <p className="text-xs text-pip-blue-dark font-bold mt-0.5">{obj.reason}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-pip-blue/10 p-5 rounded-2xl border border-pip-blue/30 text-xs text-text-dark leading-relaxed">
                <strong>Science Fact:</strong> Plastics are synthetic <KidTermTooltip term="polymer" displayText="polymers" /> that are lightweight, durable, and easily moldable into any shape. Crucially, they are <KidTermTooltip term="insulators" displayText="poor conductors (insulators)" /> of both electricity and heat!
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => switchSection('electrical')}
                  className="px-6 py-3 bg-pip-blue hover:bg-pip-blue-dark text-white font-black rounded-2xl shadow-soft text-xs transition-all"
                >
                  Test Electrical Wire Insulation →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 2: ELECTRICAL INSULATION TEST
              ============================================================ */}
          {activeSection === 'electrical' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-text-dark flex items-center gap-2">
                  <Zap className="text-amber-500" />
                  <span>Wire Coating Experiment</span>
                </h3>

                <button
                  onClick={() => switchSection('intro')}
                  className="flex items-center gap-1 text-xs font-bold text-text-muted hover:text-text-dark"
                >
                  ← Back
                </button>
              </div>

              <p className="text-xs sm:text-sm text-text-muted">
                Copper wire carries dangerous electric voltage ⚡. Which material should we wrap around it as an <KidTermTooltip term="electrical insulator" displayText="electrical insulator" />?
              </p>

              {/* Wire Simulation Box */}
              <div className="h-44 bg-slate-900 rounded-2xl border-4 border-lab-wood flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-4">
                {/* Copper Core */}
                <div className="w-full h-4 bg-amber-600 rounded-full relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-amber-400 opacity-60 animate-pulse" />
                  
                  {/* Coating Layer */}
                  {wireMaterial && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className={`absolute inset-0 h-10 -top-3 rounded-full flex items-center justify-center font-black text-[10px] text-white shadow-medium ${
                        wireMaterial === 'plastic' ? 'bg-blue-500 border-2 border-blue-300' :
                        wireMaterial === 'rubber' ? 'bg-slate-700 border-2 border-slate-500' :
                        wireMaterial === 'metal' ? 'bg-slate-400 border-2 border-amber-400' :
                        'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {wireMaterial.toUpperCase()} COATING
                    </motion.div>
                  )}
                </div>

                <div className="mt-8">
                  {wireMaterial === 'plastic' || wireMaterial === 'rubber' ? (
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                      ✓ SAFE: <KidTermTooltip term="electrical insulator" displayText="Insulator" /> blocks current!
                    </span>
                  ) : wireMaterial === 'metal' ? (
                    <span className="text-xs font-black text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-500 animate-bounce">
                      ⚠️ DANGER: <KidTermTooltip term="conductor" displayText="Metal conducts current" />! Electric shock!
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Select a material below to wrap the wire:</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'plastic', name: 'Plastic Coating', icon: '🧴' },
                  { id: 'rubber', name: 'Rubber Coating', icon: '🧤' },
                  { id: 'metal', name: 'Metal Sleeve', icon: '🔩' },
                  { id: 'cotton', name: 'Cotton Wrap', icon: '☁️' },
                ].map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => handleSelectWire(mat.id)}
                    className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                      wireMaterial === mat.id
                        ? 'bg-pip-blue text-white border-pip-blue-dark shadow-soft scale-102'
                        : 'bg-white border-lab-wood/20 hover:border-pip-blue/40'
                    }`}
                  >
                    <span className="text-2xl">{mat.icon}</span>
                    <span>{mat.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => switchSection('intro')}
                  className="text-text-muted hover:text-text-dark text-xs font-bold"
                >
                  ← Back to Why Plastic
                </button>

                <button
                  onClick={() => switchSection('heat')}
                  className="px-6 py-2.5 bg-fire-red hover:bg-red-600 text-white font-black rounded-xl shadow-soft text-xs transition-all"
                >
                  Next: Kettle Heat Test →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 3: HEAT INSULATION KETTLE HANDLE TEST
              ============================================================ */}
          {activeSection === 'heat' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-text-dark flex items-center gap-2">
                  <Thermometer className="text-fire-red" />
                  <span>Kettle Handle Heat Test</span>
                </h3>

                <button
                  onClick={() => switchSection('electrical')}
                  className="flex items-center gap-1 text-xs font-bold text-text-muted hover:text-text-dark"
                >
                  ← Back to Wire Test
                </button>
              </div>

              <p className="text-xs sm:text-sm text-text-muted">
                The kettle body boils at 100°C 🔥. Which material should we use for the handle so our hands don&apos;t burn?
              </p>

              {/* Kettle Simulation Box */}
              <div className="h-48 bg-lab-chalk/60 rounded-2xl border-2 border-lab-wood p-6 flex items-center justify-center gap-6 relative">
                {/* Kettle Body */}
                <div className="relative flex flex-col items-center">
                  <span className="text-6xl animate-pulse">🫖</span>
                  <span className="text-[10px] font-bold text-fire-red mt-1">Water Boiling (100°C)</span>
                </div>

                {/* Handle Simulation */}
                <div className="p-4 bg-white rounded-2xl border-2 border-lab-wood/30 shadow-xs text-center min-w-[160px]">
                  <span className="text-xs text-text-muted block mb-1">Handle Material:</span>
                  <span className="font-black text-sm text-text-dark capitalize block">
                    {handleMaterial ? handleMaterial : "None Chosen"}
                  </span>

                  {heatStatus === 'testing' && (
                    <span className="text-xs text-factory-orange font-bold animate-pulse mt-2 block">
                      Heating up... ⏳
                    </span>
                  )}

                  {heatStatus === 'result' && (
                    <span className={`text-xs font-black mt-2 block ${
                      handleMaterial === 'metal' ? 'text-fire-red' : 'text-nature-green-dark'
                    }`}>
                      {handleMaterial === 'metal' ? '✋🔥 Burning Hot!' : '✋✅ Stays Cool & Safe!'}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'metal', name: 'Metal Handle', icon: '🔩' },
                  { id: 'plastic', name: 'Plastic (Bakelite)', icon: '🧴' },
                  { id: 'wood', name: 'Wooden Handle', icon: '🪵' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTestHeat(item.id)}
                    className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                      handleMaterial === item.id
                        ? 'bg-fire-red text-white border-fire-red-dark shadow-soft scale-102'
                        : 'bg-white border-lab-wood/20 hover:border-fire-red/40'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>

              <div className="exam-bridge bg-amber-50/70 border-2 border-lab-wood p-4 rounded-2xl text-xs text-text-dark font-mono font-bold">
                Exam Key Point: Plastics are <KidTermTooltip term="heat insulator" displayText="poor conductors of heat" /> and electricity. That is why electrical wires have plastic coverings and handles of frying pans are made of plastic.
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => switchSection('electrical')}
                  className="text-text-muted hover:text-text-dark text-xs font-bold"
                >
                  ← Back to Electrical Test
                </button>

                <Link
                  href="/play/environment"
                  onClick={() => playClickSound()}
                  className="px-6 py-2.5 bg-nature-green text-white font-black rounded-xl hover:bg-nature-green-dark transition-all text-xs shadow-soft flex items-center gap-1.5"
                >
                  <span>Next: Environment Mission →</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
