'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, ShieldAlert, ArrowRight, ArrowLeft, Lightbulb, Thermometer, Info, CheckCircle2, RotateCcw, Lock } from 'lucide-react';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { SentenceVoiceReader } from '@/components/learning/SentenceVoiceReader';
import { ParentPinGateModal } from '@/components/learning/ParentPinGateModal';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playWarningSound, playPopSound, playClickSound, speak } from '@/lib/audio-manager';

export default function PlasticMission() {
  const [activeSection, setActiveSection] = useState<'intro' | 'electrical' | 'heat'>('intro');
  const [wireMaterial, setWireMaterial] = useState<string | null>(null);
  const [handleMaterial, setHandleMaterial] = useState<string | null>(null);
  const [heatStatus, setHeatStatus] = useState<'idle' | 'testing' | 'result'>('idle');
  const [showPinGate, setShowPinGate] = useState(false);
  const router = useRouter();

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
        speak(`Safe touch! ${material} is a heat insulator. The handle stays cool even when water boils at 100°C!`);
        logChildAttempt('heat_insulator', true, `Selected ${material} for kettle handle (heat insulator)`, 'plastic');
      } else {
        playWarningSound();
        speak(`Ouch! Metal conducts heat. The handle gets burning hot!`);
        logChildAttempt('heat_insulator', false, `Chose metal for kettle handle (conducts heat)`, 'plastic');
      }
    }, 1200);
  };

  const resetAllTests = () => {
    playPopSound();
    setWireMaterial(null);
    setHandleMaterial(null);
    setHeatStatus('idle');
    setActiveSection('intro');
    try {
      sessionStorage.removeItem("polyquest-plastic-wire");
      sessionStorage.removeItem("polyquest-plastic-handle");
      sessionStorage.removeItem("polyquest-plastic-sec");
    } catch {}
    speak("Plastic workshop reset! Test wire insulation and kettle handle heat resistance!");
  };

  const isCompleted = (wireMaterial === 'plastic' || wireMaterial === 'rubber') && heatStatus === 'result';

  const handleNextClick = () => {
    if (!isCompleted) {
      playPopSound();
      setShowPinGate(true);
    } else {
      playClickSound();
      router.push("/play/environment");
    }
  };

  return (
    <div className="min-h-screen bg-lab-cream p-6 sm:p-8 font-nunito text-text-dark flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-lab-chalk p-4 rounded-2xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex items-center gap-3">
            <Link
              href="/play/safety"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>← Mission 4 (Safety)</span>
            </Link>

            <div>
              <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider block">
                Chapter 3 • Electrical & Thermal Insulation
              </span>
              <h1 className="text-base sm:text-lg font-black text-text-dark">
                Mission 5: Plastic & Power Station
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAllTests}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all flex items-center gap-1"
              title="Redo All Tests"
            >
              <RotateCcw size={13} />
              <span>Redo 🔄</span>
            </button>

            <div className="flex bg-white p-1 rounded-2xl border border-lab-wood/20 shadow-xs">
              <button
                onClick={() => switchSection('intro')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeSection === 'intro' ? 'bg-pip-blue text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                1. Workshop
              </button>
              <button
                onClick={() => switchSection('electrical')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeSection === 'electrical' ? 'bg-hint-yellow-dark text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                2. Wire Circuit
              </button>
              <button
                onClick={() => switchSection('heat')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  activeSection === 'heat' ? 'bg-fire-red text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                3. Kettle Handle
              </button>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-lab-wood/25 min-h-[440px]">
          
          {/* SECTION 1: EVERYDAY PLASTIC USES */}
          {activeSection === 'intro' && (
            <div className="space-y-6">
              <div className="speech-bubble mx-auto max-w-xl text-center">
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;Why is plastic used in so many everyday objects? Inspect each item on the workbench to see why!&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'Water Bottle', icon: '🧴', reason: 'Lightweight & moldable' },
                  { name: 'Switchboard', icon: '🎛️', reason: 'Blocks electrical shocks' },
                  { name: 'Toy Car', icon: '🧸', reason: 'Tough & colorful' },
                  { name: 'Kettle Handle', icon: '🍳', reason: 'Stays cool in heat' },
                ].map((obj) => (
                  <div
                    key={obj.name}
                    className="p-4 rounded-3xl bg-lab-chalk/50 border-2 border-lab-wood/20 text-center flex flex-col items-center gap-2 shadow-xs"
                  >
                    <span className="text-4xl">{obj.icon}</span>
                    <h4 className="font-black text-xs text-text-dark">{obj.name}</h4>
                    <span className="text-[10px] font-bold text-pip-blue bg-white px-2 py-0.5 rounded-full border border-pip-blue/20">
                      {obj.reason}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => switchSection('electrical')}
                  className="px-8 py-3.5 bg-gradient-to-r from-pip-blue to-indigo-600 text-white font-black rounded-2xl shadow-soft text-sm inline-flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Test Electrical Wire Insulation ➔</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: ELECTRICAL CIRCUIT EXPERIMENT */}
          {activeSection === 'electrical' && (
            <div className="space-y-6">
              <div className="speech-bubble mx-auto max-w-xl text-center">
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;Live electric wire carries 220V power! Wrap the wire with different materials to prevent shocks!&rdquo;
                </p>
              </div>

              {/* Working Circuit Simulator */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white border-4 border-slate-700 shadow-inner flex flex-col items-center justify-between min-h-[220px]">
                <div className="flex justify-between items-center w-full text-xs font-mono">
                  <span className="text-amber-400 font-black">⚡ Live Circuit: 220V Power Flowing</span>
                  <span className={wireMaterial === 'plastic' || wireMaterial === 'rubber' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    Status: {wireMaterial ? (wireMaterial === 'metal' ? '⚠️ DANGER: SHOCK RISK!' : '✅ SAFE INSULATED!') : '⚠️ EXPOSED COPPER WIRE'}
                  </span>
                </div>

                {/* Animated Wire & Lightbulb */}
                <div className="flex items-center justify-center gap-8 my-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">🔋</span>
                    <span className="text-xs font-mono font-bold text-slate-300">Battery</span>
                  </div>

                  <div className={`relative h-6 w-48 rounded-full border-2 transition-all flex items-center justify-center ${
                    wireMaterial === 'plastic'
                      ? 'bg-blue-600 border-blue-400 shadow-md'
                      : wireMaterial === 'rubber'
                      ? 'bg-amber-800 border-amber-600 shadow-md'
                      : wireMaterial === 'metal'
                      ? 'bg-yellow-400 border-yellow-200 animate-pulse'
                      : 'bg-amber-600 border-amber-400'
                  }`}>
                    <span className="text-[10px] font-black text-white px-2">
                      {wireMaterial ? `${wireMaterial.toUpperCase()} COATING` : 'EXPOSED COPPER'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-4xl transition-all ${
                      wireMaterial === 'plastic' || wireMaterial === 'rubber'
                        ? 'text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.9)] animate-bounce'
                        : wireMaterial === 'metal'
                        ? 'text-rose-400 animate-ping'
                        : 'text-gray-500 opacity-60'
                    }`}>
                      💡
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">Bulb</span>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-300">
                  {wireMaterial === 'plastic' || wireMaterial === 'rubber'
                    ? '🛡️ Plastic stops electricity from leaking out, safely powering the bulb!'
                    : wireMaterial === 'metal'
                    ? '💥 Warning! Metal conducts electricity — touching this gives an electric shock!'
                    : 'Tap a material below to wrap and insulate the wire!'}
                </span>
              </div>

              {/* Material Selection Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'plastic', name: 'Plastic Wrap', icon: '🛡️', type: 'Insulator' },
                  { id: 'rubber', name: 'Rubber Sleeve', icon: '🌴', type: 'Insulator' },
                  { id: 'metal', name: 'Metal Foil', icon: '🔩', type: 'Conductor' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectWire(item.id)}
                    className={`p-4 rounded-2xl border-2 font-black text-xs flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      wireMaterial === item.id
                        ? item.type === 'Insulator'
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-soft scale-103'
                          : 'bg-rose-500 text-white border-rose-600 shadow-soft scale-103 animate-shake'
                        : 'bg-lab-chalk/60 border-lab-wood/20 hover:border-pip-blue'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.name}</span>
                    <span className="text-[10px] opacity-80">{item.type}</span>
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => switchSection('heat')}
                  className="px-8 py-3.5 bg-gradient-to-r from-fire-red to-amber-600 text-white font-black rounded-2xl shadow-soft text-sm inline-flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Next: Kettle Handle Heat Test ➔</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: KETTLE HANDLE HEAT TEST */}
          {activeSection === 'heat' && (
            <div className="space-y-6">
              <div className="speech-bubble mx-auto max-w-xl text-center">
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;The metal kettle heats to 100°C! Choose the handle material so your hands stay safe from burns!&rdquo;
                </p>
              </div>

              {/* Boiling Kettle Simulator */}
              <div className="bg-lab-chalk/60 rounded-3xl border-2 border-lab-wood/25 p-6 flex flex-col sm:flex-row items-center justify-around gap-6 min-h-[180px]">
                <div className="flex flex-col items-center text-center">
                  <span className="text-6xl animate-bounce">🫖</span>
                  <span className="text-xs font-black text-fire-red mt-1">Water Boiling (100°C) 🔥</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border-2 border-lab-wood/30 shadow-xs text-center min-w-[200px]">
                  <span className="text-xs text-text-muted font-bold block mb-1">Handle Material:</span>
                  <span className="font-black text-base text-text-dark capitalize block">
                    {handleMaterial ? handleMaterial : "None Chosen"}
                  </span>

                  {heatStatus === 'testing' && (
                    <span className="text-xs text-factory-orange font-bold animate-pulse mt-2 block">
                      Heating element testing... ⏳
                    </span>
                  )}

                  {heatStatus === 'result' && (
                    <span className={`text-xs font-black mt-2 block ${
                      handleMaterial === 'metal' ? 'text-fire-red' : 'text-nature-green-dark'
                    }`}>
                      {handleMaterial === 'metal' ? '✋🔥 Burning Hot! (Conductor)' : '✋✅ Cool & Safe! (Heat Insulator)'}
                    </span>
                  )}
                </div>
              </div>

              {/* Handle Options */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'metal', name: 'Metal Handle', icon: '🔩' },
                  { id: 'plastic', name: 'Plastic Handle (Bakelite)', icon: '🧴' },
                  { id: 'wood', name: 'Wooden Handle', icon: '🪵' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTestHeat(item.id)}
                    className={`p-4 rounded-2xl border-2 font-black text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
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

              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-xs text-text-dark font-mono">
                <strong>Class 8 Science Bridge:</strong> Plastics are <KidTermTooltip term="heat insulator" displayText="poor conductors of heat" /> and electricity. That is why electrical wires are coated in PVC plastic and pan handles are made of bakelite plastic.
              </div>

              <SentenceVoiceReader
                sentence="Plastics are poor conductors of heat and electricity and act as insulators!"
                conceptTitle="Electrical & Heat Insulation"
              />
            </div>
          )}

        </main>

        <footer className="mt-8 flex justify-between items-center pt-4 border-t border-lab-wood/15">
          <Link 
            href="/play/safety" 
            onClick={() => playClickSound()}
            className="px-5 py-2.5 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors text-xs flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>← Mission 4 (Safety)</span>
          </Link>
          <button 
            onClick={handleNextClick}
            className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-soft transition-all flex items-center gap-1.5 ${
              isCompleted
                ? "bg-nature-green hover:bg-nature-green-dark text-white cursor-pointer"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            <span>Next: Environment Mission ➔</span>
            {!isCompleted && <Lock size={13} className="text-gray-600" />}
          </button>
        </footer>
      </div>

      {/* Parent PIN Lock Gate Modal */}
      <ParentPinGateModal
        isOpen={showPinGate}
        onClose={() => setShowPinGate(false)}
        onUnlockSuccess={() => router.push("/play/environment")}
        activityTitle="Mission 5: Plastic & Insulation Tests"
      />
    </div>
  );
}
