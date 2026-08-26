'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VoiceUnlockModal } from '@/components/learning/VoiceUnlockModal';
import { Mic } from 'lucide-react';

const FABRICS = [
  {
    id: 'cotton',
    name: 'Cotton',
    emoji: '☁️',
    color: 'bg-white',
    superpower: 'Breathable & Soft',
    uses: [{ name: 'T-Shirts', emoji: '👕' }, { name: 'Towels', emoji: '🧖' }, { name: 'Jeans', emoji: '👖' }],
    description: 'Cotton comes from a fluffy plant. It lets air through easily, keeping you cool!'
  },
  {
    id: 'nylon',
    name: 'Nylon',
    emoji: '🧗',
    color: 'bg-pip-blue-light',
    superpower: 'Super Strong & Stretchy',
    uses: [{ name: 'Ropes', emoji: '🪢' }, { name: 'Tents', emoji: '⛺' }, { name: 'Parachutes', emoji: '🪂' }],
    description: 'Nylon is a synthetic (man-made) fibre. It is incredibly tough and lightweight.'
  },
  {
    id: 'polyester',
    name: 'Polyester',
    emoji: '🏃',
    color: 'bg-factory-orange/20',
    superpower: 'Wrinkle-Free & Quick-Dry',
    uses: [{ name: 'Sportswear', emoji: '🎽' }, { name: 'Raincoats', emoji: '🧥' }, { name: 'Backpacks', emoji: '🎒' }],
    description: 'Polyester dries super fast and hardly ever wrinkles. Great for active kids!'
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    emoji: '🧶',
    color: 'bg-fire-red/20',
    superpower: 'Warm & Wool-Like',
    uses: [{ name: 'Sweaters', emoji: '🧥' }, { name: 'Blankets', emoji: '🛌' }, { name: 'Winter Hats', emoji: '🧣' }],
    description: 'Acrylic feels like soft, warm wool but is much lighter and easier to wash.'
  }
];

export default function FibresMission() {
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [activeFabric, setActiveFabric] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const router = useRouter();

  const handleDiscover = (id: string) => {
    if (!discovered.includes(id)) {
      setDiscovered([...discovered, id]);
    }
    setActiveFabric(id);
  };

  const allDiscovered = discovered.length === FABRICS.length;

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-8 flex flex-col">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-dark font-mono">Mission: Meet the Fabrics</h1>
        <div className="flex gap-4">
          <span className="text-text-muted font-mono bg-lab-cream px-4 py-2 rounded-full shadow-sm border border-lab-wood-light">
            Found: {discovered.length}/{FABRICS.length}
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Pip's Guidance */}
        <div className="flex items-end gap-4 mb-12 max-w-2xl w-full">
          <div className="w-20 h-20 bg-pip-blue rounded-full flex items-center justify-center text-4xl shadow-md border-4 border-white shrink-0">
            🤖
          </div>
          <div className="speech-bubble bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-lab-wood-light flex-1">
            <p className="text-lg text-text-dark font-medium">
              {allDiscovered 
                ? "Amazing! You've discovered all the fabrics. They each have a special superpower!" 
                : "Welcome to the materials lab! Each fabric sample on the bench has a special power. Can you discover them all?"}
            </p>
          </div>
        </div>

        {/* Workbench */}
        <div className="bg-lab-wood p-8 rounded-3xl w-full max-w-5xl shadow-lg relative border-8 border-lab-wood-dark">
          <div className="absolute inset-0 bg-lab-wood-light opacity-20 rounded-2xl pointer-events-none mix-blend-overlay"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {FABRICS.map((fabric) => (
              <motion.button
                key={fabric.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDiscover(fabric.id)}
                className={`h-48 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 shadow-md border-4 border-white/50 ${fabric.color}`}
                style={{
                  filter: !discovered.includes(fabric.id) ? 'grayscale(80%) brightness(0.9)' : 'none',
                }}
              >
                <span className="text-6xl">{fabric.emoji}</span>
                <span className="font-bold text-text-dark text-xl">
                  {discovered.includes(fabric.id) ? fabric.name : '?'}
                </span>
                {!discovered.includes(fabric.id) && (
                  <span className="bg-hint-yellow text-text-dark text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                    Click to Inspect
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Details Panel */}
          <AnimatePresence mode="wait">
            {activeFabric && (
              <motion.div
                key={activeFabric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 bg-lab-cream p-6 rounded-2xl shadow-inner border border-lab-wood-light flex flex-col md:flex-row gap-8 items-center"
              >
                {(() => {
                  const fabric = FABRICS.find(f => f.id === activeFabric)!;
                  return (
                    <>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{fabric.emoji}</span>
                          <h2 className="text-3xl font-bold text-text-dark">{fabric.name}</h2>
                        </div>
                        <p className="text-xl text-pip-blue font-bold mb-4 flex items-center gap-2">
                          <span>✨</span> Superpower: {fabric.superpower}
                        </p>
                        <p className="text-text-dark text-lg mb-6 leading-relaxed">
                          {fabric.description}
                        </p>
                        <div className="bg-white p-4 rounded-xl border border-lab-chalk">
                          <p className="text-sm text-text-muted font-bold mb-3 uppercase tracking-wider">Often used for:</p>
                          <div className="flex gap-4">
                            {fabric.uses.map((use, i) => (
                              <div key={i} className="flex flex-col items-center gap-1">
                                <span className="text-3xl bg-lab-chalk p-2 rounded-lg">{use.emoji}</span>
                                <span className="text-sm font-medium text-text-dark">{use.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-64 aspect-square rounded-2xl bg-white border-4 border-lab-wood-light flex items-center justify-center p-4 relative overflow-hidden">
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/50"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-8xl relative z-10">{fabric.emoji}</span>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Exam Bridge / Summary */}
        <AnimatePresence>
          {allDiscovered && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 exam-bridge bg-blue-50 border-2 border-pip-blue p-6 rounded-2xl max-w-3xl w-full shadow-md"
            >
              <div className="flex gap-4 items-start">
                <span className="text-3xl">📝</span>
                <div>
                  <h3 className="text-xl font-bold text-text-dark mb-2 font-mono">Scientist's Notebook</h3>
                  <p className="text-text-dark leading-relaxed font-mono">
                    <span className="science-term font-bold text-pip-blue">Fibres</span> have different properties. Natural fibres like cotton are breathable. Synthetic fibres like nylon are strong, while polyester dries quickly.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/play" className="px-6 py-3 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors text-sm">
          ← Back to Map
        </Link>

        <div className="flex items-center gap-3">
          {allDiscovered && (
            <button
              onClick={() => setShowVoiceModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-hint-yellow via-factory-orange-light to-pip-blue text-text-dark font-extrabold shadow-soft hover:shadow-medium transition-all flex items-center gap-2 text-sm animate-pulse"
            >
              <Mic size={16} />
              <span>Say &ldquo;NYLON&rdquo; to Unlock 🪄</span>
            </button>
          )}

          <Link 
            href="/play/experiments" 
            className={`px-6 py-3 font-bold rounded-xl transition-colors shadow-sm text-sm ${allDiscovered ? 'bg-nature-green text-white hover:bg-nature-green-light' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={(e) => !allDiscovered && e.preventDefault()}
          >
            Next: Lab Tests →
          </Link>
        </div>

        <VoiceUnlockModal
          isOpen={showVoiceModal}
          targetWord="NYLON"
          wordMeaning="Super strong synthetic thread!"
          nextRoute="/play/experiments"
          onSuccess={() => {
            setShowVoiceModal(false);
            router.push("/play/experiments");
          }}
          onClose={() => setShowVoiceModal(false)}
        />
      </footer>
    </div>
  );
}
