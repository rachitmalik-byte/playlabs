'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ExperimentsMission() {
  const [activeTab, setActiveTab] = useState<'nylon' | 'polyester'>('nylon');
  
  // Nylon Test State
  const [predicted, setPredicted] = useState<string | null>(null);
  const [weight, setWeight] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  
  // Polyester Shop State
  const [inspectedItems, setInspectedItems] = useState<string[]>([]);

  const handleAddWeight = () => {
    if (weight < 120) {
      const newWeight = weight + 20;
      setWeight(newWeight);
      if (newWeight >= 120) {
        setTestComplete(true);
      }
    }
  };

  const polyesterItems = [
    { id: 'raincoat', name: 'Raincoat', emoji: '🧥', property: 'Water-Resistant' },
    { id: 'sportswear', name: 'Sportswear', emoji: '🎽', property: 'Quick-Drying' },
    { id: 'dress', name: 'Dress', emoji: '👗', property: 'Wrinkle-Resistant' },
    { id: 'cushion', name: 'Cushion', emoji: '🛋️', property: 'Lightweight Filling' },
  ];

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-8 flex flex-col">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-dark font-mono">Mission: Lab Experiments</h1>
        <div className="flex bg-lab-cream p-1 rounded-xl border border-lab-wood-light">
          <button 
            onClick={() => setActiveTab('nylon')}
            className={`px-4 py-2 font-bold rounded-lg transition-colors ${activeTab === 'nylon' ? 'bg-white shadow-sm text-pip-blue' : 'text-text-muted hover:text-text-dark'}`}
          >
            Nylon Test
          </button>
          <button 
            onClick={() => setActiveTab('polyester')}
            className={`px-4 py-2 font-bold rounded-lg transition-colors ${activeTab === 'polyester' ? 'bg-white shadow-sm text-factory-orange' : 'text-text-muted hover:text-text-dark'}`}
          >
            Polyester Shop
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {activeTab === 'nylon' && (
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Pip Intro */}
            <div className="flex items-end gap-4 mb-8 max-w-2xl w-full">
              <div className="w-16 h-16 bg-pip-blue rounded-full flex items-center justify-center text-3xl shadow-md border-4 border-white shrink-0">
                🤖
              </div>
              <div className="speech-bubble bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-lab-wood-light flex-1">
                <p className="text-text-dark font-medium">
                  {!predicted 
                    ? "Time for a Strength Test! We have Steel Wire and Nylon Thread. Predict: Which will hold more weight before breaking?" 
                    : testComplete 
                      ? "Wow! The Nylon held strong. It has very high tensile strength." 
                      : "Let's add weight and see what happens!"}
                </p>
              </div>
            </div>

            {!predicted ? (
              <div className="flex gap-8 mt-8">
                <button 
                  onClick={() => setPredicted('steel')}
                  className="bg-white p-8 rounded-2xl border-4 border-gray-300 hover:border-gray-500 shadow-md flex flex-col items-center gap-4 transition-all hover:scale-105"
                >
                  <span className="text-6xl">⛓️</span>
                  <span className="text-xl font-bold text-text-dark">Steel Wire</span>
                </button>
                <button 
                  onClick={() => setPredicted('nylon')}
                  className="bg-white p-8 rounded-2xl border-4 border-pip-blue hover:border-pip-blue-dark shadow-md flex flex-col items-center gap-4 transition-all hover:scale-105"
                >
                  <span className="text-6xl">🧵</span>
                  <span className="text-xl font-bold text-text-dark">Nylon Thread</span>
                </button>
              </div>
            ) : (
              <div className="bg-lab-cream p-8 rounded-3xl w-full shadow-lg border border-lab-wood-light flex flex-col items-center">
                <div className="flex gap-24 items-start h-[400px]">
                  {/* Steel */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold text-text-dark mb-4 text-xl">Steel Wire</h3>
                    <div className="relative w-8 h-64 bg-gray-200 rounded-full flex justify-center">
                      <motion.div 
                        className="w-2 bg-gray-600 rounded-full"
                        animate={{ height: weight >= 80 ? '60%' : '100%' }}
                        style={{ transformOrigin: 'top' }}
                      />
                      {weight >= 80 && (
                        <div className="absolute top-[60%] text-2xl animate-bounce">💥 Snap!</div>
                      )}
                    </div>
                    {/* Weights */}
                    <div className="mt-4 flex flex-col-reverse gap-1">
                      {Array.from({ length: Math.min(weight/20, 3) }).map((_, i) => (
                        <div key={i} className="w-16 h-6 bg-gray-800 rounded-sm flex items-center justify-center text-white text-xs font-bold shadow-md">20kg</div>
                      ))}
                    </div>
                  </div>

                  {/* Nylon */}
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold text-pip-blue mb-4 text-xl">Nylon Thread</h3>
                    <div className="relative w-8 h-64 bg-blue-50 rounded-full flex justify-center">
                      <motion.div 
                        className="w-1 bg-pip-blue rounded-full"
                        animate={{ 
                          height: '100%',
                          scaleX: weight > 80 ? 0.8 : 1 // Stretches slightly
                        }}
                      />
                    </div>
                     {/* Weights */}
                     <div className="mt-4 flex flex-col-reverse gap-1">
                      {Array.from({ length: weight/20 }).map((_, i) => (
                        <div key={i} className="w-16 h-6 bg-gray-800 rounded-sm flex items-center justify-center text-white text-xs font-bold shadow-md">20kg</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <span className="font-mono text-xl font-bold">Total Load: {weight} kg</span>
                  {!testComplete ? (
                    <button 
                      onClick={handleAddWeight}
                      className="px-8 py-4 bg-fire-red text-white font-bold rounded-2xl shadow-md hover:bg-red-600 active:scale-95 transition-all text-xl"
                    >
                      Add 20kg Weight ⬇️
                    </button>
                  ) : (
                    <div className="exam-bridge bg-blue-50 border-2 border-pip-blue p-4 rounded-xl max-w-lg mt-4">
                      <p className="font-mono font-bold text-text-dark text-center">
                        <span className="science-term text-pip-blue">Nylon</span> has incredibly high <span className="science-term">tensile strength</span>. It is stronger than many metals of the same thickness! Used in 🪂 🧗 🪥.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'polyester' && (
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Pip Intro */}
            <div className="flex items-end gap-4 mb-8 max-w-2xl w-full">
              <div className="w-16 h-16 bg-factory-orange rounded-full flex items-center justify-center text-3xl shadow-md border-4 border-white shrink-0 text-white font-bold">
                P
              </div>
              <div className="speech-bubble bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-lab-wood-light flex-1">
                <p className="text-text-dark font-medium">
                  {inspectedItems.length === 4 
                    ? "Polyester is amazing! It's water-resistant, dries quickly, resists wrinkles, and is very light." 
                    : "Welcome to the Polyester Shop! Inspect the items to see why polyester is used to make them."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full">
              {polyesterItems.map((item) => {
                const isInspected = inspectedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => !isInspected && setInspectedItems([...inspectedItems, item.id])}
                    className={`bg-white p-6 rounded-3xl border-4 transition-all ${isInspected ? 'border-factory-orange shadow-md' : 'border-lab-chalk shadow-sm hover:border-gray-300 hover:scale-[1.02]'} flex items-center gap-6 text-left`}
                  >
                    <div className="w-24 h-24 bg-lab-cream rounded-2xl flex items-center justify-center text-5xl shrink-0 shadow-inner border border-lab-wood-light">
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-dark mb-2">{item.name}</h3>
                      {isInspected ? (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-block bg-factory-orange/20 text-factory-orange px-3 py-1 rounded-lg font-bold text-sm"
                        >
                          ✓ {item.property}
                        </motion.span>
                      ) : (
                        <span className="text-text-muted text-sm font-bold bg-gray-100 px-3 py-1 rounded-lg">Click to Inspect 🔍</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {inspectedItems.length === 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 exam-bridge bg-orange-50 border-2 border-factory-orange p-6 rounded-2xl max-w-3xl w-full shadow-md text-center"
              >
                <h3 className="text-xl font-bold text-text-dark mb-2 font-mono">Scientist's Notebook</h3>
                <p className="text-text-dark font-mono text-lg">
                  <span className="science-term font-bold text-factory-orange">Polyester</span> is highly versatile. Its low water absorption makes it quick-drying and water-resistant, while its resilience keeps it wrinkle-free.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </main>
      
      <footer className="mt-12 flex justify-between w-full">
        <Link href="/play/fibres" className="px-6 py-3 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors">
          Back to Fibres
        </Link>
        <Link 
          href="/play/environment" 
          className="px-6 py-3 bg-nature-green text-white font-bold rounded-xl hover:bg-nature-green-light transition-colors shadow-sm"
        >
          Next Mission: Environment
        </Link>
      </footer>
    </div>
  );
}
