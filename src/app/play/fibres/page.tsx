'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VoiceUnlockModal } from '@/components/learning/VoiceUnlockModal';
import { KidTermTooltip } from '@/components/learning/KidTermTooltip';
import { Mic, ArrowLeft, ArrowRight, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { playPopSound, playDiscoverySound, playClickSound, speak } from '@/lib/audio-manager';
import { logChildAttempt } from '@/lib/learning-engine';

const FABRICS = [
  {
    id: 'cotton',
    name: 'Cotton',
    emoji: '☁️',
    color: 'bg-white',
    superpower: 'Breathable & Soft',
    termKey: 'breathable',
    uses: [{ name: 'T-Shirts', emoji: '👕' }, { name: 'Towels', emoji: '🧖' }, { name: 'Jeans', emoji: '👖' }],
    description: 'Cotton comes from a fluffy plant. It lets air pass through easily, keeping you cool in hot weather!',
    traitExplanation: 'Natural cellulose hollow tubes absorb sweat and let skin breathe.'
  },
  {
    id: 'nylon',
    name: 'Nylon',
    emoji: '🧗',
    color: 'bg-pip-blue-light/40',
    superpower: 'Super Strong & Elastic',
    termKey: 'tensile strength',
    uses: [{ name: 'Ropes', emoji: '🪢' }, { name: 'Tents', emoji: '⛺' }, { name: 'Parachutes', emoji: '🪂' }],
    description: 'Nylon is a synthetic (man-made) fibre with high tensile strength. It is tough, elastic, and lightweight.',
    traitExplanation: 'Polymer chains distribute pulling weight without snapping.'
  },
  {
    id: 'polyester',
    name: 'Polyester',
    emoji: '🏃',
    color: 'bg-factory-orange/20',
    superpower: 'Wrinkle-Resistant & Quick-Dry',
    termKey: 'wrinkle-resistant',
    uses: [{ name: 'Sportswear', emoji: '🎽' }, { name: 'Raincoats', emoji: '🧥' }, { name: 'Backpacks', emoji: '🎒' }],
    description: 'Polyester dries fast and resists wrinkles. It springs back to smooth shape without creasing.',
    traitExplanation: 'Synthetic hydrophobic fibers repel water droplets.'
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    emoji: '🧶',
    color: 'bg-fire-red/20',
    superpower: 'Warm & Wool-Like',
    termKey: 'heat insulator',
    uses: [{ name: 'Sweaters', emoji: '🧥' }, { name: 'Blankets', emoji: '🛌' }, { name: 'Winter Hats', emoji: '🧣' }],
    description: 'Acrylic feels like soft, warm wool. It is an artificial wool made from chemicals that traps heat nicely!',
    traitExplanation: 'Crimped fibers trap warm air bubbles to insulate against the cold.'
  }
];

export default function FibresMission() {
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [activeFabric, setActiveFabric] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const router = useRouter();

  // Load saved state on refresh
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("polyquest-fibres-discovered");
      if (saved) {
        setDiscovered(JSON.parse(saved));
      }
      const savedActive = sessionStorage.getItem("polyquest-fibres-active");
      if (savedActive) {
        setActiveFabric(savedActive);
      }
    } catch {}
  }, []);

  const handleDiscover = (id: string) => {
    playDiscoverySound();
    const nextDiscovered = discovered.includes(id) ? discovered : [...discovered, id];
    setDiscovered(nextDiscovered);
    setActiveFabric(id);

    try {
      sessionStorage.setItem("polyquest-fibres-discovered", JSON.stringify(nextDiscovered));
      sessionStorage.setItem("polyquest-fibres-active", id);
    } catch {}

    const fab = FABRICS.find(f => f.id === id);
    if (fab) {
      speak(`${fab.name}! Its superpower is ${fab.superpower}. ${fab.description}`);
      logChildAttempt('fibre', true, `Discovered and inspected ${fab.name} (${fab.superpower})`, 'fibres');
    }
  };

  const allDiscovered = discovered.length === FABRICS.length;
  const currentFabricData = FABRICS.find(f => f.id === activeFabric);

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-6 sm:p-8 flex flex-col">
      {/* Top Header with Back Navigation & Progress */}
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/play/origins"
            onClick={() => playClickSound()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-lab-cream text-text-dark font-extrabold text-xs border border-lab-wood/20 shadow-xs transition-all"
          >
            <ArrowLeft size={14} />
            <span>← Back to Mission 1 (Origins)</span>
          </Link>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text-dark">
              Mission 2: Meet the 4 Fabrics
            </h1>
            <p className="text-xs text-text-muted">
              Chapter 3 • <KidTermTooltip term="natural" displayText="Natural" /> vs <KidTermTooltip term="synthetic" displayText="Synthetic" /> Fibres
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-text-dark bg-white px-4 py-2 rounded-2xl shadow-xs border border-lab-wood/20 flex items-center gap-2">
            <span>Discovered:</span>
            <span className="text-pip-blue font-mono font-black">{discovered.length}/{FABRICS.length}</span>
            {allDiscovered && <span className="text-nature-green">✓</span>}
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Pip's Guidance Speech Bubble */}
        <div className="flex items-end gap-3 mb-8 w-full max-w-2xl">
          <div className="w-16 h-16 bg-pip-blue rounded-2xl flex items-center justify-center text-3xl shadow-soft border-2 border-white shrink-0">
            🤖
          </div>
          <div className="speech-bubble bg-white p-4 rounded-2xl shadow-soft border border-lab-wood/20 flex-1">
            <p className="text-sm sm:text-base text-text-dark font-bold">
              {allDiscovered 
                ? "🎉 Fantastic! You discovered all 4 fabric superpowers! Tap any sample to review its properties or unlock the next mission!" 
                : "Welcome to the fabrics bench! Tap each fabric sample to inspect its special superpowers and real-world uses!"}
            </p>
          </div>
        </div>

        {/* Workbench with 4 Fabrics */}
        <div className="bg-lab-wood p-6 sm:p-8 rounded-3xl w-full shadow-medium relative border-4 border-lab-wood-dark mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
            {FABRICS.map((fabric) => {
              const isFound = discovered.includes(fabric.id);
              const isSelected = activeFabric === fabric.id;

              return (
                <motion.button
                  key={fabric.id}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleDiscover(fabric.id)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-between min-h-[160px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white ring-4 ring-pip-blue shadow-warm'
                      : isFound
                      ? 'bg-white/95 shadow-soft'
                      : 'bg-white/70 hover:bg-white border-2 border-dashed border-white/60 shadow-xs'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl my-2">{fabric.emoji}</span>
                  <div className="text-center w-full">
                    <span className="block font-black text-sm text-text-dark">{fabric.name}</span>
                    <span className="text-[11px] font-bold text-pip-blue-dark">
                      {isFound ? `✓ ${fabric.superpower}` : 'Tap to discover 🔍'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Specimen Deep-Dive Card */}
        <AnimatePresence mode="wait">
          {currentFabricData && (
            <motion.div
              key={currentFabricData.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl p-6 border-2 border-lab-wood/20 shadow-soft w-full mb-8 text-left"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentFabricData.emoji}</span>
                  <div>
                    <h2 className="text-xl font-black text-text-dark">
                      {currentFabricData.name} Fabric
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

              <p className="text-sm text-text-dark leading-relaxed mb-4">
                {currentFabricData.description}
              </p>

              <div className="bg-lab-chalk/80 rounded-2xl p-4 border border-lab-wood/15 mb-4">
                <span className="text-[11px] font-extrabold text-text-muted uppercase tracking-wider block mb-2">
                  Everyday Items Made From {currentFabricData.name}:
                </span>
                <div className="flex flex-wrap gap-3">
                  {currentFabricData.uses.map((use) => (
                    <div
                      key={use.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-lab-wood/20 shadow-xs text-xs font-bold text-text-dark"
                    >
                      <span className="text-lg">{use.emoji}</span>
                      <span>{use.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-pip-blue/8 rounded-xl border border-pip-blue/20 text-xs text-text-dark flex items-start gap-2">
                <Sparkles size={16} className="text-pip-blue mt-0.5 shrink-0" />
                <span>
                  <strong>The Science Reason:</strong> {currentFabricData.traitExplanation}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation & Voice Magic Modal */}
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
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-hint-yellow via-factory-orange to-pip-blue text-text-dark font-extrabold text-xs shadow-soft hover:shadow-medium transition-all flex items-center gap-1.5 animate-pulse"
            >
              <Mic size={14} />
              <span>Say &ldquo;NYLON&rdquo; to Unlock 🪄</span>
            </button>

            <Link
              href="/play/experiments"
              onClick={() => playClickSound()}
              className="px-6 py-2.5 rounded-xl bg-nature-green hover:bg-nature-green-dark text-white font-extrabold text-xs shadow-soft transition-all flex items-center gap-1.5"
            >
              <span>Next: Experiments →</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </main>

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
    </div>
  );
}
