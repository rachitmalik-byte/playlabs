'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { logChildAttempt } from '@/lib/learning-engine';
import { playDiscoverySound, playPopSound, playClickSound, speak } from '@/lib/audio-manager';
import { Sparkles, Dumbbell, ShoppingBag, Lightbulb } from 'lucide-react';

export default function ExperimentsMission() {
  const [activeTab, setActiveTab] = useState<'nylon' | 'polyester'>('nylon');
  
  // Nylon Test State
  const [predicted, setPredicted] = useState<string | null>(null);
  const [weight, setWeight] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  
  // Polyester Shop State
  const [inspectedItems, setInspectedItems] = useState<string[]>([]);

  const handlePredict = (choice: 'steel' | 'nylon') => {
    playClickSound();
    setPredicted(choice);
    const isCorrect = choice === 'nylon';
    logChildAttempt(
      'nylon',
      isCorrect,
      `Predicted that ${choice === 'nylon' ? 'Nylon thread' : 'Steel wire'} holds more tensile weight`,
      'experiments'
    );
    if (isCorrect) {
      speak("Great hypothesis! Let's start adding 20kg weights to test it!");
    } else {
      speak("Interesting guess! Most people think metal is stronger. Let's test what happens!");
    }
  };

  const handleAddWeight = () => {
    if (weight < 120) {
      playPopSound();
      const newWeight = weight + 20;
      setWeight(newWeight);

      if (newWeight === 80) {
        speak("Look! At 80 kilograms, the steel wire snaps! But the nylon thread is still holding strong!");
      }

      if (newWeight >= 120) {
        setTestComplete(true);
        playDiscoverySound();
        speak("Incredible! Nylon held over 120 kilograms without snapping! A nylon thread is actually stronger than a steel wire of the same thickness!");
        logChildAttempt(
          'nylon',
          true,
          'Completed tensile weight load test demonstrating nylon tensile strength',
          'experiments'
        );
      }
    }
  };

  const handleInspectPolyester = (item: { id: string; name: string; property: string; reason: string }) => {
    if (!inspectedItems.includes(item.id)) {
      playDiscoverySound();
      setInspectedItems((prev) => [...prev, item.id]);
      speak(`${item.name} uses polyester because it is ${item.property}! ${item.reason}`);
      logChildAttempt(
        'polyester',
        true,
        `Inspected ${item.name}: learned polyester property (${item.property})`,
        'experiments'
      );
    }
  };

  const polyesterItems = [
    { 
      id: 'raincoat', 
      name: 'Raincoat', 
      emoji: '🧥', 
      property: 'Water-Resistant',
      reason: 'Synthetic polyester fibres do not absorb water droplets, keeping you dry!'
    },
    { 
      id: 'sportswear', 
      name: 'Sportswear', 
      emoji: '🎽', 
      property: 'Quick-Drying',
      reason: 'Sweat evaporates quickly off the smooth surface of polyester threads!'
    },
    { 
      id: 'dress', 
      name: 'Dress & Shirts', 
      emoji: '👗', 
      property: 'Wrinkle-Resistant',
      reason: 'Polymer chains have elastic memory and spring right back into shape without creases!'
    },
    { 
      id: 'cushion', 
      name: 'Cushion Filling', 
      emoji: '🛋️', 
      property: 'Lightweight & Fluffy',
      reason: 'Hollow polyester microfibres trap air without adding heavy weight!'
    },
  ];

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-6 sm:p-8 flex flex-col">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark font-mono">
            Mission: Virtual Lab Experiments
          </h1>
          <p className="text-xs text-text-muted">Test material tensile strength and investigate everyday uses</p>
        </div>

        <div className="flex bg-lab-cream p-1 rounded-2xl border border-lab-wood-light shadow-xs">
          <button 
            onClick={() => {
              playClickSound();
              setActiveTab('nylon');
            }}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'nylon' 
                ? 'bg-white shadow-soft text-pip-blue' 
                : 'text-text-muted hover:text-text-dark'
            }`}
          >
            <Dumbbell size={16} />
            <span>Nylon Strength Test</span>
          </button>

          <button 
            onClick={() => {
              playClickSound();
              setActiveTab('polyester');
            }}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'polyester' 
                ? 'bg-white shadow-soft text-factory-orange' 
                : 'text-text-muted hover:text-text-dark'
            }`}
          >
            <ShoppingBag size={16} />
            <span>Polyester Shop</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* ============================================================
            TAB 1: NYLON TENSILE STRENGTH TEST
            ============================================================ */}
        {activeTab === 'nylon' && (
          <div className="w-full flex flex-col items-center">
            {/* Pip Intro */}
            <div className="speech-bubble bg-white p-5 rounded-2xl shadow-soft border-2 border-lab-wood/30 mb-8 w-full text-center">
              <p className="text-base sm:text-lg font-extrabold text-text-dark">
                {!predicted 
                  ? "Predict: Which holds more weight before snapping — a Steel Wire or a Nylon Thread of the same thickness?" 
                  : testComplete 
                    ? "🎉 Look at that! The Nylon thread held over 120kg! It has incredible tensile strength." 
                    : "Add weights one by one and watch the strain on each material!"}
              </p>
            </div>

            {!predicted ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mt-4">
                <button 
                  onClick={() => handlePredict('steel')}
                  className="bg-white p-8 rounded-3xl border-4 border-gray-200 hover:border-gray-400 shadow-soft flex flex-col items-center gap-3 transition-all hover:scale-105"
                >
                  <span className="text-6xl">⛓️</span>
                  <span className="text-xl font-extrabold text-text-dark">Steel Wire</span>
                  <span className="text-xs text-text-muted">Heavy metal alloy</span>
                </button>

                <button 
                  onClick={() => handlePredict('nylon')}
                  className="bg-white p-8 rounded-3xl border-4 border-pip-blue hover:border-pip-blue-dark shadow-soft flex flex-col items-center gap-3 transition-all hover:scale-105"
                >
                  <span className="text-6xl">🧵</span>
                  <span className="text-xl font-extrabold text-pip-blue-dark">Nylon Thread</span>
                  <span className="text-xs text-text-muted">Synthetic polymer</span>
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-3xl w-full shadow-soft border-2 border-lab-wood/25 flex flex-col items-center">
                <div className="flex justify-around items-start w-full min-h-[320px] max-w-lg mb-6">
                  {/* Steel */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-extrabold text-text-dark mb-3 text-base">⛓️ Steel Wire</h3>
                    <div className="relative w-8 h-48 bg-gray-100 rounded-full flex justify-center border border-gray-300">
                      <motion.div 
                        className="w-2.5 bg-gray-600 rounded-full"
                        animate={{ height: weight >= 80 ? '55%' : '100%' }}
                        style={{ transformOrigin: 'top' }}
                      />
                      {weight >= 80 && (
                        <div className="absolute top-[55%] text-xs font-black text-fire-red bg-white px-2 py-0.5 rounded-full border border-fire-red shadow-xs animate-bounce">
                          💥 Snapped at 80kg!
                        </div>
                      )}
                    </div>
                    {/* Weights */}
                    <div className="mt-3 flex flex-col-reverse gap-1">
                      {Array.from({ length: Math.min(weight / 20, 3) }).map((_, i) => (
                        <div key={i} className="w-16 h-5 bg-gray-800 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                          20 kg
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nylon */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-extrabold text-pip-blue mb-3 text-base">🧵 Nylon Thread</h3>
                    <div className="relative w-8 h-48 bg-blue-50 rounded-full flex justify-center border border-pip-blue/30">
                      <motion.div 
                        className="w-2 bg-pip-blue rounded-full"
                        animate={{ 
                          height: '100%',
                          scaleX: weight > 80 ? 0.85 : 1
                        }}
                      />
                      {weight >= 120 && (
                        <div className="absolute -bottom-2 text-xs font-black text-nature-green-dark bg-nature-green/20 px-2 py-0.5 rounded-full border border-nature-green">
                          ✓ Holds 120kg+
                        </div>
                      )}
                    </div>
                    {/* Weights */}
                    <div className="mt-3 flex flex-col-reverse gap-1">
                      {Array.from({ length: weight / 20 }).map((_, i) => (
                        <div key={i} className="w-16 h-5 bg-gray-800 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                          20 kg
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 w-full">
                  <span className="font-mono text-lg font-black text-text-dark">
                    Current Hanging Load: <span className="text-pip-blue">{weight} kg</span>
                  </span>

                  {!testComplete ? (
                    <button 
                      onClick={handleAddWeight}
                      className="px-8 py-3.5 bg-fire-red hover:bg-red-600 active:scale-95 text-white font-extrabold rounded-2xl shadow-soft transition-all text-base flex items-center gap-2"
                    >
                      <span>Add +20kg Weight ⬇️</span>
                    </button>
                  ) : (
                    <div className="space-y-4 w-full">
                      {/* Science Reasoning Card */}
                      <div className="bg-pip-blue/10 border-2 border-pip-blue p-5 rounded-2xl w-full text-left">
                        <div className="flex items-center gap-2 text-pip-blue-dark font-extrabold text-sm mb-1.5">
                          <Lightbulb size={18} />
                          <span>Scientific Reasoning: Why is Nylon so Strong?</span>
                        </div>
                        <p className="text-xs text-text-dark leading-relaxed">
                          Nylon molecules are long, linear synthetic polymer chains aligned perfectly parallel to each other. Strong intermolecular forces (hydrogen bonds) lock the chains together, giving nylon exceptional <strong>tensile strength</strong>. That&apos;s why it is used in parachutes, climbing ropes, and heavy-duty toothbrush bristles!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            TAB 2: POLYESTER SHOP INVESTIGATION
            ============================================================ */}
        {activeTab === 'polyester' && (
          <div className="w-full flex flex-col items-center">
            {/* Pip Intro */}
            <div className="speech-bubble bg-white p-5 rounded-2xl shadow-soft border-2 border-lab-wood/30 mb-8 w-full text-center">
              <p className="text-base sm:text-lg font-extrabold text-text-dark">
                {inspectedItems.length === 4 
                  ? "🎉 You investigated all 4 items! Polyester is waterproof, wrinkle-free, fast-drying, and durable." 
                  : "Welcome to the Polyester Shop! Tap each item to inspect the scientific reason polyester was chosen."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {polyesterItems.map((item) => {
                const isInspected = inspectedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleInspectPolyester(item)}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4 text-left ${
                      isInspected 
                        ? 'bg-factory-orange/8 border-factory-orange shadow-soft' 
                        : 'bg-white border-lab-wood/20 hover:border-factory-orange/50 shadow-xs hover:scale-[1.01]'
                    }`}
                  >
                    <div className="w-16 h-16 bg-lab-cream rounded-2xl flex items-center justify-center text-4xl shrink-0 border border-lab-wood/20">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-text-dark">{item.name}</h3>
                        {isInspected && (
                          <span className="text-[10px] font-bold bg-factory-orange text-white px-2 py-0.5 rounded-full">
                            ✓ {item.property}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        {isInspected ? item.reason : "Tap to inspect why polyester is used 🔍"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {inspectedItems.length === 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white border-2 border-factory-orange p-6 rounded-3xl w-full shadow-soft text-left"
              >
                <div className="flex items-center gap-2 text-factory-orange-dark font-extrabold text-base mb-2">
                  <Lightbulb size={18} />
                  <span>The Science of Polyester (PET)</span>
                </div>
                <p className="text-xs text-text-dark leading-relaxed">
                  Polyester fibres have very low moisture absorbency. Water cannot penetrate into the compact synthetic polymer structure, so droplets simply roll off (water resistance) and sweat dries rapidly in minutes!
                </p>
              </motion.div>
            )}
          </div>
        )}
      </main>
      
      <footer className="mt-12 flex justify-between w-full max-w-4xl mx-auto">
        <Link href="/play/fibres" className="px-6 py-3 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors text-sm">
          ← Back to Fibres
        </Link>
        <Link 
          href="/play/safety" 
          className="px-6 py-3 bg-nature-green text-white font-bold rounded-xl hover:bg-nature-green-dark transition-colors shadow-soft text-sm"
        >
          Next: Safety & Flame Tests →
        </Link>
      </footer>
    </div>
  );
}
