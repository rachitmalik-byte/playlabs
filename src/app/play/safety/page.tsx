'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Flame, Droplets, ArrowRight, ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SafetyMission() {
  const [activeTab, setActiveTab] = useState<'fire' | 'sweat'>('fire');
  const [fireStage, setFireStage] = useState<0 | 1 | 2 | 3>(0);
  const [sweatStage, setSweatStage] = useState<0 | 1 | 2>(0);
  const [draggedFabric, setDraggedFabric] = useState<string | null>(null);

  const handleTestFabric = (fabric: string) => {
    setDraggedFabric(fabric);
    setFireStage(2);
  };

  const handleDragEnd = (fabric: string, _info: any) => {
    // Whenever dragged, trigger flame test
    handleTestFabric(fabric);
  };

  return (
    <div className="min-h-screen bg-lab-cream p-8 font-sans text-text-dark">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center bg-lab-chalk p-4 rounded-xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('fire')}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${
                activeTab === 'fire' ? 'bg-fire-red text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              Fire Safety
            </button>
            <button
              onClick={() => setActiveTab('sweat')}
              className={`px-6 py-2 rounded-full font-bold transition-colors ${
                activeTab === 'sweat' ? 'bg-water-blue text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              Summer Sweat Test
            </button>
          </div>
          <div className="text-xl font-mono text-pip-blue-dark font-bold">Lab Station 3</div>
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-xl border-4 border-lab-wood">
          {activeTab === 'fire' && (
            <div className="space-y-8">
              <div className="speech-bubble bg-pip-blue-light/20 p-6 rounded-2xl relative border-2 border-pip-blue-dark/20">
                <p className="text-xl font-medium">
                  Pip says: "We're getting ready for a festival with diyas and sparklers. Which clothes should we choose? Let's test them safely in the lab!"
                </p>
              </div>

              {fireStage === 0 && (
                <div className="flex flex-col items-center justify-center space-y-8">
                  <div className="flex gap-12">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFireStage(1)}
                      className="cursor-pointer flex flex-col items-center bg-nature-green-light/20 p-6 rounded-xl border-2 border-nature-green"
                    >
                      <div className="w-32 h-32 bg-lab-chalk flex items-center justify-center text-4xl mb-4 rounded-lg border-2 border-lab-wood-light">👕</div>
                      <span className="font-bold text-lg">Cotton Shirt</span>
                      <span className="text-sm text-text-muted mt-2">Natural Fiber</span>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setFireStage(1)}
                      className="cursor-pointer flex flex-col items-center bg-factory-orange/20 p-6 rounded-xl border-2 border-factory-orange"
                    >
                      <div className="w-32 h-32 bg-lab-chalk flex items-center justify-center text-4xl mb-4 rounded-lg border-2 border-lab-wood-light">🎽</div>
                      <span className="font-bold text-lg">Synthetic Shirt</span>
                      <span className="text-sm text-text-muted mt-2">Polyester</span>
                    </motion.div>
                  </div>
                  <p className="text-lg text-text-muted italic">Click on a fabric to investigate it.</p>
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
                  <div className="relative w-full max-w-md bg-lab-chalk p-8 rounded-xl border-4 border-lab-wood">
                    <h3 className="text-2xl font-bold mb-6 text-center">Observation Step</h3>
                    
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
                        <p className="font-bold text-lg text-center">It chars slowly and crumbles to ash.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center mb-6">
                        <motion.div 
                          initial={{ scale: 1 }}
                          animate={{ scale: 0.5, borderRadius: '50%', y: 20 }}
                          transition={{ duration: 2 }}
                          className="text-6xl mb-4 bg-factory-orange rounded"
                        >
                          🎽
                        </motion.div>
                        <p className="font-bold text-lg text-center">It shrinks, melts into a bead, and sticks!</p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <p className="font-bold">What happened?</p>
                      <button 
                        onClick={() => setFireStage(3)}
                        className="w-full text-left p-4 rounded-lg border-2 border-lab-wood hover:bg-lab-cream transition-colors"
                      >
                        {draggedFabric === 'cotton' ? "The cotton burned slowly and turned to ash." : "The synthetic one melted and formed a sticky glob!"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {fireStage === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-fire-red-light/10 p-8 rounded-2xl border-2 border-fire-red/30 space-y-6"
                >
                  <div className="flex items-center gap-4 text-fire-red">
                    <AlertTriangle className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">Important Safety Lesson</h3>
                  </div>
                  <p className="text-xl">
                    Some synthetic fabrics <span className="science-term font-mono font-bold text-fire-red bg-white px-2 py-1 rounded">MELT ON HEATING</span> and the hot material can stick to skin, causing severe burns.
                  </p>
                  <div className="exam-bridge bg-white p-6 rounded-xl border-l-4 border-nature-green shadow-sm">
                    <div className="flex items-start gap-4">
                      <ShieldCheck className="w-8 h-8 text-nature-green flex-shrink-0" />
                      <p className="font-mono text-lg">
                        <strong>Lab Note:</strong> Always wear cotton clothes around open flames, diyas, sparklers, or when working in a kitchen or laboratory. Cotton is safer because it does not melt.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => { setFireStage(0); setDraggedFabric(null); }}
                      className="px-6 py-2 bg-lab-wood text-white rounded-lg hover:bg-lab-wood-dark transition-colors"
                    >
                      Test Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'sweat' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-water-blue-light/20 p-6 rounded-2xl border-2 border-water-blue/20">
                <p className="text-xl font-medium">
                  It's a hot sunny day! Which fabric will keep you more comfortable when you sweat?
                </p>
              </div>

              {sweatStage === 0 && (
                <div className="flex justify-center gap-12">
                  <div className="relative group cursor-pointer" onClick={() => setSweatStage(1)}>
                    <div className="w-48 h-48 bg-lab-chalk rounded-2xl border-4 border-nature-green flex items-center justify-center text-6xl relative overflow-hidden">
                      👕
                      <div className="absolute inset-0 bg-nature-green/10 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-bold text-center">Cotton</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer" onClick={() => setSweatStage(1)}>
                    <div className="w-48 h-48 bg-lab-chalk rounded-2xl border-4 border-factory-orange flex items-center justify-center text-6xl relative overflow-hidden">
                      🎽
                      <div className="absolute inset-0 bg-factory-orange/10 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-bold text-center">Synthetic</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {sweatStage === 1 && (
                <div className="flex flex-col items-center space-y-12 py-8">
                  <div className="flex gap-16">
                    {/* Cotton Test */}
                    <div className="flex flex-col items-center">
                      <h4 className="font-bold text-lg mb-4">Cotton Fabric</h4>
                      <div className="relative">
                        <motion.div 
                          className="w-32 h-32 bg-lab-chalk rounded-lg border-2 border-lab-wood relative overflow-hidden"
                          animate={{ backgroundColor: ['#F5F0E8', '#e0d8c8'] }}
                          transition={{ delay: 1, duration: 2 }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">👕</div>
                        </motion.div>
                        <motion.div
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 20, opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: 2 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 text-water-blue"
                        >
                          <Droplets className="w-8 h-8 fill-water-blue" />
                        </motion.div>
                      </div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3 }}
                        className="mt-4 font-bold text-nature-green flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Absorbs water
                      </motion.p>
                    </div>

                    {/* Synthetic Test */}
                    <div className="flex flex-col items-center">
                      <h4 className="font-bold text-lg mb-4">Synthetic Fabric</h4>
                      <div className="relative">
                        <div className="w-32 h-32 bg-lab-chalk rounded-lg border-2 border-lab-wood relative flex items-center justify-center">
                           <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">🎽</div>
                           <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute z-10 grid grid-cols-2 gap-2"
                           >
                              <div className="w-3 h-3 rounded-full bg-water-blue shadow-sm" />
                              <div className="w-4 h-4 rounded-full bg-water-blue shadow-sm" />
                              <div className="w-2 h-2 rounded-full bg-water-blue shadow-sm" />
                           </motion.div>
                        </div>
                        <motion.div
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 20, opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: 2 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 text-water-blue"
                        >
                          <Droplets className="w-8 h-8 fill-water-blue" />
                        </motion.div>
                      </div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3 }}
                        className="mt-4 font-bold text-fire-red flex items-center gap-2"
                      >
                        <AlertTriangle className="w-5 h-5" /> Water beads on surface
                      </motion.p>
                    </div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                    onClick={() => setSweatStage(2)}
                    className="px-8 py-3 bg-pip-blue text-white font-bold rounded-xl shadow-md hover:bg-pip-blue-dark"
                  >
                    What does this mean?
                  </motion.button>
                </div>
              )}

              {sweatStage === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-water-blue-light/10 p-8 rounded-2xl border-2 border-water-blue/30 space-y-6"
                >
                  <p className="text-xl">
                    Cotton absorbs sweat from your body, exposing it to the atmosphere for easy evaporation. This evaporation cools your body.
                  </p>
                  <div className="exam-bridge bg-white p-6 rounded-xl border-l-4 border-water-blue shadow-sm">
                    <p className="font-mono text-lg">
                      <strong>Exam Concept:</strong> We wear cotton clothes in summer because cotton is a good absorber of water. Synthetic clothes do not absorb sweat easily and make us feel hot and uncomfortable.
                    </p>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => setSweatStage(0)}
                      className="px-6 py-2 bg-lab-wood text-white rounded-lg hover:bg-lab-wood-dark transition-colors"
                    >
                      Observe Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </main>

        <footer className="mt-8 flex justify-between">
          <Link href="/play" className="flex items-center gap-2 px-6 py-3 bg-lab-chalk rounded-xl font-bold hover:bg-lab-wood-light transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Map
          </Link>
          <Link href="/play/plastic" className="flex items-center gap-2 px-6 py-3 bg-pip-blue text-white rounded-xl font-bold hover:bg-pip-blue-dark transition-colors shadow-md">
            Next: Plastic & Power <ArrowRight className="w-5 h-5" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
