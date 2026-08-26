'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VoiceUnlockModal } from '@/components/learning/VoiceUnlockModal';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { SentenceVoiceReader } from '@/components/learning/SentenceVoiceReader';
import { ParentPinGateModal } from '@/components/learning/ParentPinGateModal';
import { Mic, ArrowLeft, ArrowRight, Sparkles, Volume2, CheckCircle2, RotateCcw, Lock } from 'lucide-react';
import { playPopSound, playDiscoverySound, playClickSound, speak } from '@/lib/audio-manager';
import { logChildAttempt } from '@/lib/learning-engine';

const FABRICS = [
  {
    id: 'cotton',
    name: 'Cotton',
    emoji: '☁️',
    image: '/images/cotton_plant_fabric.jpg',
    color: 'bg-white',
    superpower: 'Breathable & Soft',
    termKey: 'breathable',
    uses: [{ name: 'T-Shirts', emoji: '👕' }, { name: 'Towels', emoji: '🧖' }, { name: 'Jeans', emoji: '👖' }],
    description: 'Cotton comes from a fluffy plant. It lets fresh air pass through easily, keeping you cool in summer!',
    traitExplanation: 'Natural cellulose hollow tubes absorb sweat and let skin breathe.'
  },
  {
    id: 'nylon',
    name: 'Nylon',
    emoji: '🧗',
    image: '/images/nylon_climbing_rope.jpg',
    color: 'bg-pip-blue-light/40',
    superpower: 'Super Strong & Elastic',
    termKey: 'tensile strength',
    uses: [{ name: 'Ropes', emoji: '🪢' }, { name: 'Tents', emoji: '⛺' }, { name: 'Parachutes', emoji: '🪂' }],
    description: 'Nylon is a synthetic fibre that is stronger than steel wire! It is tough, elastic, and lightweight.',
    traitExplanation: 'Polymer chains distribute heavy pulling weight without snapping.'
  },
  {
    id: 'polyester',
    name: 'Polyester',
    emoji: '🏃',
    image: '/images/polyester_jacket_fabric.jpg',
    color: 'bg-factory-orange/20',
    superpower: 'Wrinkle-Resistant & Quick-Dry',
    termKey: 'wrinkle-resistant',
    uses: [{ name: 'Sportswear', emoji: '🎽' }, { name: 'Raincoats', emoji: '🧥' }, { name: 'Backpacks', emoji: '🎒' }],
    description: 'Polyester dries fast and resists wrinkles. It bounces back into smooth shape without creasing.',
    traitExplanation: 'Synthetic hydrophobic fibers repel water droplets.'
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    emoji: '🧶',
    image: '/images/wool_sheep_fleece.jpg',
    color: 'bg-fire-red/20',
    superpower: 'Warm & Wool-Like',
    termKey: 'heat insulator',
    uses: [{ name: 'Sweaters', emoji: '🧥' }, { name: 'Blankets', emoji: '🛌' }, { name: 'Winter Hats', emoji: '🧣' }],
    description: 'Acrylic feels like soft, warm wool. It is man-made artificial wool that traps body heat nicely!',
    traitExplanation: 'Crimped fibers trap warm air pockets to keep you cozy in winter.'
  }
];

export default function FibresMission() {
  const [selectedFabric, setSelectedFabric] = useState<string>('cotton');
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showPinGate, setShowPinGate] = useState(false);
  const router = useRouter();

  // Load session persistence
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("polyquest-fibres-discovered");
      if (saved) {
        setDiscovered(JSON.parse(saved));
      }
      const savedSelected = sessionStorage.getItem("polyquest-fibres-selected");
      if (savedSelected) {
        setSelectedFabric(savedSelected);
      }
    } catch {}
  }, []);

  const handleDiscover = (id: string) => {
    setSelectedFabric(id);
    try {
      sessionStorage.setItem("polyquest-fibres-selected", id);
    } catch {}

    if (!discovered.includes(id)) {
      playDiscoverySound();
      const updated = [...discovered, id];
      setDiscovered(updated);
      try {
        sessionStorage.setItem("polyquest-fibres-discovered", JSON.stringify(updated));
      } catch {}

      const item = FABRICS.find((f) => f.id === id);
      if (item) {
        speak(`You discovered ${item.name}! Its superpower is ${item.superpower}. ${item.description}`);
        logChildAttempt(
          id as any,
          true,
          `Discovered ${item.name} fabric and inspected properties`,
          'fibres'
        );
      }
    } else {
      playPopSound();
      const item = FABRICS.find((f) => f.id === id);
      if (item) {
        speak(`${item.name} fabric! ${item.description}`);
      }
    }
  };

  const handleResetActivity = () => {
    playPopSound();
    setDiscovered([]);
    setSelectedFabric('cotton');
    try {
      sessionStorage.removeItem("polyquest-fibres-discovered");
    } catch {}
    speak("Fabric specimens reset! Tap each swatch on the table to discover their superpowers!");
  };

  const isCompleted = discovered.length === FABRICS.length;
  const currentFabricData = FABRICS.find((f) => f.id === selectedFabric);

  const handleNextClick = () => {
    if (!isCompleted) {
      playPopSound();
      setShowPinGate(true);
    } else {
      playClickSound();
      router.push("/play/experiments");
    }
  };

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-6 sm:p-8 flex flex-col justify-between">
      <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center">
        
        {/* Top Controls: Back, Step, Reset */}
        <div className="w-full flex items-center justify-between gap-4 mb-6">
          <Link
            href="/play/origins"
            onClick={() => playClickSound()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
          >
            <ArrowLeft size={14} />
            <span>← Mission 1 (Origins)</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetActivity}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-chalk text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
              title="Redo Fabric Investigation"
            >
              <RotateCcw size={13} />
              <span>Redo Activity 🔄</span>
            </button>

            <span className="text-xs font-black text-pip-blue bg-pip-blue/10 px-3 py-1.5 rounded-full">
              Mission 2 • Meet the 4 Fabrics
            </span>
          </div>
        </div>

        {/* Pip Guidance */}
        <div className="speech-bubble bg-white p-5 rounded-2xl shadow-soft border-2 border-lab-wood/30 mb-8 w-full text-center">
          <p className="text-base sm:text-lg font-extrabold text-text-dark">
            {isCompleted
              ? "🎉 Excellent job! You unlocked all 4 fabric superpower specimens!"
              : "Pip says: 'Tap all 4 fabric swatches on the lab bench to unlock their secret powers!'"}
          </p>
        </div>

        {/* 4 Fabric Specimens Workbench */}
        <div className="w-full bg-lab-cream/60 border-2 border-lab-wood/25 rounded-3xl p-6 sm:p-8 shadow-soft mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-black uppercase tracking-wider text-text-muted">
              Laboratory Specimen Table ({discovered.length} of 4 Discovered)
            </span>
            <span className="text-xs font-black text-pip-blue">
              {isCompleted ? "✓ All Unlocked!" : "Tap each card 🔍"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FABRICS.map((fabric) => {
              const isFound = discovered.includes(fabric.id);
              const isSelected = selectedFabric === fabric.id;

              return (
                <motion.button
                  key={fabric.id}
                  onClick={() => handleDiscover(fabric.id)}
                  className={`p-4 rounded-3xl border-3 flex flex-col items-center text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-pip-blue ring-4 ring-pip-blue/20 bg-white shadow-soft scale-103'
                      : isFound
                      ? 'border-nature-green/60 bg-white shadow-xs'
                      : 'border-lab-wood/20 bg-lab-chalk/80 hover:border-pip-blue/40'
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover mb-2 border border-lab-wood/15 shadow-xs"
                  />
                  <h3 className="font-black text-sm text-text-dark">{fabric.name}</h3>
                  <span className="text-[10px] text-pip-blue-dark font-extrabold mt-0.5">
                    {isFound ? fabric.superpower : "Tap to Discover 🔍"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Specimen Deep-Dive Card */}
        <AnimatePresence mode="wait">
          {currentFabricData && (
            <motion.div
              key={currentFabricData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl p-6 border-2 border-lab-wood/20 shadow-soft w-full mb-8 text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentFabricData.emoji}</span>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-text-dark">
                      {currentFabricData.name} Specimen
                    </h2>
                    <p className="text-xs text-pip-blue font-bold">
                      Superpower: <KidTermTooltip term={currentFabricData.termKey} displayText={currentFabricData.superpower} />
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playPopSound();
                    speak(`${currentFabricData.name}. ${currentFabricData.description} ${currentFabricData.traitExplanation}`);
                  }}
                  className="p-2 rounded-xl bg-pip-blue/10 hover:bg-pip-blue/20 text-pip-blue transition-colors flex items-center gap-1 text-xs font-bold"
                >
                  <Volume2 size={15} />
                  <span>Listen 🗣️</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                {currentFabricData.description}
              </p>

              <div className="bg-lab-chalk/80 rounded-2xl p-3.5 border border-lab-wood/15">
                <span className="text-[11px] font-black text-text-muted uppercase tracking-wider block mb-2">
                  Everyday Items Made From {currentFabricData.name}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentFabricData.uses.map((use) => (
                    <div
                      key={use.name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-lab-wood/20 shadow-xs text-xs font-bold text-text-dark"
                    >
                      <span>{use.emoji}</span>
                      <span>{use.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Read-Aloud Voice Recognition Practice */}
        {isCompleted && (
          <div className="w-full mb-8">
            <SentenceVoiceReader
              sentence="Nylon thread has super high tensile strength and is stronger than steel wire!"
              conceptTitle="Nylon Tensile Power"
              onSuccess={() => {
                logChildAttempt('nylon', true, 'Successfully read aloud nylon tensile sentence in mic', 'fibres');
              }}
            />
          </div>
        )}

        {/* Footer Navigation & Lock Check */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-4 border-t border-lab-wood/15">
          <Link
            href="/play/origins"
            onClick={() => playClickSound()}
            className="text-text-muted hover:text-text-dark text-xs font-bold flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            <span>← Previous: Mission 1</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playDiscoverySound();
                setShowVoiceModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-hint-yellow via-factory-orange to-pip-blue text-text-dark font-extrabold text-xs shadow-soft hover:shadow-medium transition-all flex items-center gap-1.5"
            >
              <Mic size={14} />
              <span>Say &ldquo;NYLON&rdquo; 🪄</span>
            </button>

            <button
              onClick={handleNextClick}
              className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-soft transition-all flex items-center gap-1.5 ${
                isCompleted
                  ? "bg-nature-green hover:bg-nature-green-dark text-white cursor-pointer"
                  : "bg-gray-300 text-gray-700 cursor-not-allowed"
              }`}
            >
              <span>{isCompleted ? "Next: Experiments ➔" : "Next: Experiments"}</span>
              {!isCompleted && <Lock size={13} className="text-gray-600" />}
            </button>
          </div>
        </div>

      </main>

      {/* Voice Unlock Modal */}
      <VoiceUnlockModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        targetWord="NYLON"
        wordMeaning="Super strong synthetic fibre used in climbing ropes and parachutes!"
        nextRoute="/play/experiments"
        onSuccess={() => {
          setShowVoiceModal(false);
          router.push("/play/experiments");
        }}
      />

      {/* Parent PIN Lock Gate Modal */}
      <ParentPinGateModal
        isOpen={showPinGate}
        onClose={() => setShowPinGate(false)}
        onUnlockSuccess={() => router.push("/play/experiments")}
        activityTitle="Mission 2: Discover All 4 Fabrics"
      />
    </div>
  );
}
