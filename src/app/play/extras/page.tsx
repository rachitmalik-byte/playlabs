'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { SentenceVoiceReader } from '@/components/learning/SentenceVoiceReader';
import { ParentPinGateModal } from '@/components/learning/ParentPinGateModal';
import { LottieAnimation } from '@/components/lottie/LottieAnimation';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playPopSound, playClickSound, speak } from '@/lib/audio-manager';

export default function ExtrasMission() {
  const [activeTab, setActiveTab] = useState<'rubber' | 'glue'>('rubber');
  const [fixedItems, setFixedItems] = useState<string[]>([]);
  const [stretchedItems, setStretchedItems] = useState<string[]>([]);
  const [showPinGate, setShowPinGate] = useState(false);
  const router = useRouter();

  // Load session persistence
  useEffect(() => {
    try {
      const savedFixed = sessionStorage.getItem("polyquest-extras-fixed");
      if (savedFixed) setFixedItems(JSON.parse(savedFixed));
      const savedStretched = sessionStorage.getItem("polyquest-extras-stretched");
      if (savedStretched) setStretchedItems(JSON.parse(savedStretched));
    } catch {}
  }, []);

  const brokenItems = [
    { id: 'toy', name: 'Broken Toy Robot', icon: '🧸', sub: 'Plastic arm snapped' },
    { id: 'pipe', name: 'Leaking Joint Pipe', icon: '🚰', sub: 'Water dripping' },
    { id: 'shoe', name: 'Torn Shoe Sole', icon: '👟', sub: 'Rubber sole detached' },
  ];

  const handleFix = (itemId: string) => {
    if (!fixedItems.includes(itemId)) {
      playDiscoverySound();
      const updated = [...fixedItems, itemId];
      setFixedItems(updated);
      try {
        sessionStorage.setItem("polyquest-extras-fixed", JSON.stringify(updated));
      } catch {}
      speak(`Glued firmly! Synthetic adhesives form super-strong chemical bonds to repair ${itemId}!`);
      logChildAttempt('synthetic_adhesive', true, `Repaired ${itemId} using synthetic adhesive glue`, 'extras');
    }
  };

  const handleStretch = (name: string) => {
    playPopSound();
    if (!stretchedItems.includes(name)) {
      const updated = [...stretchedItems, name];
      setStretchedItems(updated);
      try {
        sessionStorage.setItem("polyquest-extras-stretched", JSON.stringify(updated));
      } catch {}
      speak(`Stretchy! Synthetic rubber is an elastic polymer that snaps right back into shape!`);
      logChildAttempt('synthetic_rubber', true, `Tested elasticity on synthetic rubber ${name}`, 'extras');
    }
  };

  const handleReset = () => {
    playPopSound();
    setFixedItems([]);
    setStretchedItems([]);
    try {
      sessionStorage.removeItem("polyquest-extras-fixed");
      sessionStorage.removeItem("polyquest-extras-stretched");
    } catch {}
    speak("Lab reset! Test rubber stretching or repair broken objects with glue!");
  };

  const isCompleted = fixedItems.length >= 2 || stretchedItems.length >= 2;

  const handleNextClick = () => {
    if (!isCompleted) {
      playPopSound();
      setShowPinGate(true);
    } else {
      playClickSound();
      router.push("/play/final-mission");
    }
  };

  return (
    <div className="min-h-screen bg-lab-cream p-6 sm:p-8 font-nunito text-text-dark flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-lab-chalk p-4 rounded-2xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex items-center gap-3">
            <Link
              href="/play/environment"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
            >
              <ArrowLeft size={14} />
              <span>← Mission 6 (Environment)</span>
            </Link>

            <div>
              <span className="text-[10px] font-black text-pip-blue uppercase tracking-wider block">
                Chapter 3 • Polymer Extras
              </span>
              <h1 className="text-base sm:text-lg font-black text-text-dark">
                Mission 7: Synthetic Rubber & Adhesives Lab
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all flex items-center gap-1"
              title="Redo Lab"
            >
              <RotateCcw size={13} />
              <span>Redo 🔄</span>
            </button>

            <div className="flex gap-1.5 bg-white p-1 rounded-2xl border border-lab-wood/20 shadow-xs">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('rubber');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === 'rubber' ? 'bg-earth-brown text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                <StretchHorizontal size={14} />
                <span>Synthetic Rubber</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('glue');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
                  activeTab === 'glue' ? 'bg-factory-orange text-white shadow-soft' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                <Wrench size={14} />
                <span>Synthetic Adhesives</span>
              </button>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border-2 border-lab-wood/25 min-h-[440px]">
          
          {/* TAB 1: SYNTHETIC RUBBER */}
          {activeTab === 'rubber' && (
            <div className="space-y-6 text-center">
              <div className="speech-bubble mx-auto max-w-xl flex flex-col items-center">
                <LottieAnimation preset="rubber_tree" width={80} height={80} className="mb-1" />
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;Synthetic rubber is an elastic <KidTermTooltip term="polymer" displayText="polymer" /> made in chemical plants. Drag or tap each object to test its stretchiness!&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6">
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -40, right: 40 }}
                    onClick={() => handleStretch('Tyre')}
                    whileDrag={{ scaleX: 1.4, scaleY: 0.85 }}
                    className="w-28 h-28 bg-slate-900 border-4 border-slate-700 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing text-5xl shadow-soft text-white"
                  >
                    🛞
                  </motion.div>
                  <h4 className="font-black text-sm text-text-dark">Vehicle Tyre</h4>
                  <span className="text-xs text-text-muted">High durability & friction</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -50, right: 50 }}
                    onClick={() => handleStretch('Rubber Band')}
                    whileDrag={{ scaleX: 1.8, scaleY: 0.7 }}
                    className="w-28 h-16 bg-amber-200 border-4 border-amber-400 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing text-3xl shadow-soft my-auto"
                  >
                    〰️
                  </motion.div>
                  <h4 className="font-black text-sm text-text-dark">Rubber Band</h4>
                  <span className="text-xs text-text-muted">Super high elasticity</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    onClick={() => handleStretch('Eraser')}
                    whileHover={{ scale: 1.1, rotate: -4 }}
                    whileTap={{ scale: 0.9, rotate: 4 }}
                    className="w-28 h-28 bg-pink-100 border-4 border-pink-300 rounded-2xl flex items-center justify-center cursor-pointer text-5xl shadow-soft"
                  >
                    ✏️
                  </motion.div>
                  <h4 className="font-black text-sm text-text-dark">Eraser</h4>
                  <span className="text-xs text-text-muted">Soft & moldable polymer</span>
                </div>
              </div>

              <div className="bg-earth-brown/10 p-5 rounded-2xl border border-earth-brown/30 text-xs text-text-dark max-w-xl mx-auto text-left leading-relaxed">
                <strong>Science Fact:</strong> Natural rubber comes from tree sap, but synthetic rubber is made using petroleum monomers. It handles heavy road friction and heat much better!
              </div>

              <SentenceVoiceReader
                sentence="Synthetic rubber is an elastic polymer with high durability!"
                conceptTitle="Synthetic Rubber"
              />
            </div>
          )}

          {/* TAB 2: SYNTHETIC ADHESIVES REPAIR GAME */}
          {activeTab === 'glue' && (
            <div className="space-y-6 text-center">
              <div className="speech-bubble mx-auto max-w-xl flex flex-col items-center">
                <LottieAnimation preset="adhesive_bond" width={110} height={110} className="mb-1" />
                <p className="text-base text-text-dark font-semibold">
                  Pip says: &ldquo;Objects are broken! Tap each item with synthetic adhesive glue to bond the molecules together!&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                {brokenItems.map((item) => {
                  const isFixed = fixedItems.includes(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleFix(item.id)}
                      className={`p-6 rounded-3xl border-3 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                        isFixed
                          ? 'border-nature-green bg-emerald-50/80 shadow-soft scale-102'
                          : 'border-lab-wood/20 bg-lab-chalk/50 hover:border-factory-orange'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="text-5xl">{item.icon}</span>
                      <div>
                        <h4 className="font-black text-sm text-text-dark">{item.name}</h4>
                        <p className="text-xs text-text-muted mt-0.5">{item.sub}</p>
                      </div>

                      <span className={`text-xs font-black px-3 py-1 rounded-full ${
                        isFixed ? 'bg-nature-green text-white' : 'bg-factory-orange text-white'
                      }`}>
                        {isFixed ? '✓ Repaired Firmly!' : '🧴 Apply Synthetic Glue'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {fixedItems.length > 0 && (
                <div className="bg-factory-orange/10 p-5 rounded-2xl border border-factory-orange/30 text-xs text-text-dark max-w-xl mx-auto text-left leading-relaxed">
                  <strong>Science Fact:</strong> Synthetic adhesives (like epoxy and superglue) create cross-linked polymer bonds between surfaces, holding airplanes, cars, and toys tightly together!
                </div>
              )}
            </div>
          )}

        </main>

        <footer className="mt-8 flex justify-between items-center pt-4 border-t border-lab-wood/15">
          <Link 
            href="/play/environment"
            onClick={() => playClickSound()}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-lab-wood text-white rounded-xl font-bold text-xs hover:bg-lab-wood-dark transition-colors"
          >
            <ArrowLeft size={14} />
            <span>← Mission 6 (Environment)</span>
          </Link>

          <button
            onClick={handleNextClick}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-black text-xs shadow-soft transition-all ${
              isCompleted
                ? "bg-nature-green hover:bg-nature-green-dark text-white cursor-pointer"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            <span>Finish to Mission 8 (Safe Camp) ➔</span>
            {!isCompleted && <Lock size={13} className="text-gray-600" />}
          </button>
        </footer>
      </div>

      {/* Parent PIN Lock Gate Modal */}
      <ParentPinGateModal
        isOpen={showPinGate}
        onClose={() => setShowPinGate(false)}
        onUnlockSuccess={() => router.push("/play/final-mission")}
        activityTitle="Mission 7: Synthetic Rubber & Adhesives"
      />
    </div>
  );
}
