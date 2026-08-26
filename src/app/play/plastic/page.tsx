'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Zap, ShieldAlert, ArrowRight, ArrowLeft, Lightbulb, Thermometer, Info } from 'lucide-react';

export default function PlasticMission() {
  const [activeSection, setActiveSection] = useState<'intro' | 'electrical' | 'heat'>('intro');
  const [wireMaterial, setWireMaterial] = useState<string | null>(null);
  const [handleMaterial, setHandleMaterial] = useState<string | null>(null);
  const [heatStatus, setHeatStatus] = useState<'idle' | 'testing' | 'result'>('idle');

  const everydayObjects = [
    { name: 'Water Bottle', icon: '🧴', reason: 'Lightweight & durable' },
    { name: 'Switchboard', icon: '🎛️', reason: 'Electrical insulator' },
    { name: 'Toy', icon: '🧸', reason: 'Easily moldable' },
    { name: 'Pan Handle', icon: '🍳', reason: 'Heat insulator' },
  ];

  const handleTestHeat = (material: string) => {
    setHandleMaterial(material);
    setHeatStatus('testing');
    setTimeout(() => {
      setHeatStatus('result');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-lab-cream p-8 font-sans text-text-dark">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center bg-lab-chalk p-4 rounded-xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('intro')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                activeSection === 'intro' ? 'bg-factory-orange text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              Why Plastic?
            </button>
            <button
              onClick={() => setActiveSection('electrical')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                activeSection === 'electrical' ? 'bg-pip-blue text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              Electrical Insulation
            </button>
            <button
              onClick={() => setActiveSection('heat')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                activeSection === 'heat' ? 'bg-fire-red text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              Heat Insulation
            </button>
          </div>
          <div className="text-xl font-mono text-pip-blue-dark font-bold">Lab Station 4</div>
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-xl border-4 border-lab-wood min-h-[500px]">
          
          {/* INTRO SECTION */}
          {activeSection === 'intro' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center mb-8">Why is Plastic Everywhere?</h2>
              <p className="text-center text-xl text-text-muted mb-8">Click objects to discover why plastic was chosen to make them.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {everydayObjects.map((obj, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer bg-lab-chalk rounded-2xl p-6 flex flex-col items-center border-2 border-lab-wood-light"
                  >
                    <span className="text-5xl mb-4">{obj.icon}</span>
                    <span className="font-bold text-center">{obj.name}</span>
                    
                    <div className="absolute inset-0 bg-factory-orange/90 rounded-2xl p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold text-center">{obj.reason}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 bg-factory-orange/10 p-6 rounded-xl border-l-4 border-factory-orange">
                <p className="text-lg">
                  Plastics are chosen because they are <strong>lightweight, lower in price, have good strength, and are easy to handle</strong>. Let's test two of their most important properties!
                </p>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setActiveSection('electrical')} className="px-6 py-2 bg-pip-blue text-white font-bold rounded-lg hover:bg-pip-blue-dark">
                  Test Electricity Next →
                </button>
              </div>
            </div>
          )}

          {/* ELECTRICAL SECTION */}
          {activeSection === 'electrical' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 bg-pip-blue/10 p-6 rounded-xl border-2 border-pip-blue/20">
                <Zap className="w-8 h-8 text-pip-blue" />
                <p className="text-xl">Wrap the exposed electrical wire safely. Choose a material:</p>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => setWireMaterial('plastic')} className="px-6 py-3 bg-lab-chalk border-2 border-factory-orange rounded-xl font-bold hover:bg-factory-orange hover:text-white transition-all">Plastic Coating</button>
                <button onClick={() => setWireMaterial('metal')} className="px-6 py-3 bg-lab-chalk border-2 border-gray-400 rounded-xl font-bold hover:bg-gray-400 hover:text-white transition-all">Metal Sleeve</button>
              </div>

              <div className="relative h-64 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-slate-700">
                {/* The Wire */}
                <div className="relative w-3/4 h-6 flex items-center">
                  <div className="absolute inset-0 bg-amber-600 rounded-full" />
                  
                  {/* Electricity particles */}
                  <div className="absolute inset-0 flex items-center justify-around overflow-hidden">
                    {[1,2,3,4,5].map(i => (
                      <motion.div
                        key={i}
                        animate={{ x: [0, 200, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                        className="w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]"
                      />
                    ))}
                  </div>

                  {/* Wrapper Material */}
                  <AnimatePresence>
                    {wireMaterial && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        className={`absolute inset-0 -mx-4 -my-2 rounded-full border-b-4 ${
                          wireMaterial === 'plastic' ? 'bg-factory-orange border-orange-700 opacity-90' : 'bg-gray-400 border-gray-600 opacity-90'
                        }`}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {wireMaterial === null && <span className="text-red-400 font-bold flex items-center gap-2"><ShieldAlert /> DANGER: EXPOSED WIRE</span>}
                  {wireMaterial === 'plastic' && <span className="text-green-400 font-bold flex items-center gap-2"><ShieldAlert /> SAFE: ELECTRICITY CONTAINED</span>}
                  {wireMaterial === 'metal' && (
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity }} className="text-red-500 font-bold flex items-center gap-2">
                      <Zap /> DANGER: SHOCK HAZARD!
                    </motion.span>
                  )}
                </div>
              </div>

              {wireMaterial && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="exam-bridge bg-white p-6 rounded-xl border-l-4 border-pip-blue shadow-sm">
                  <p className="font-mono text-lg">
                    <strong>Observation:</strong> {wireMaterial === 'plastic' ? "Plastic does not allow electricity to pass through it." : "Metals allow electricity to pass through easily."}
                    <br/><br/>
                    <strong>Concept:</strong> Plastics are <strong>poor conductors of electricity (insulators)</strong>. That is why electrical wires have plastic covering, and handles of screwdrivers are made of plastic.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* HEAT SECTION */}
          {activeSection === 'heat' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 bg-fire-red-light/10 p-6 rounded-xl border-2 border-fire-red/20">
                <Thermometer className="w-8 h-8 text-fire-red" />
                <p className="text-xl">Which material should we use for the handle of this electric kettle?</p>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => handleTestHeat('plastic')} className="px-6 py-3 bg-lab-chalk border-2 border-factory-orange rounded-xl font-bold hover:bg-factory-orange hover:text-white transition-all">Plastic Handle</button>
                <button onClick={() => handleTestHeat('metal')} className="px-6 py-3 bg-lab-chalk border-2 border-gray-400 rounded-xl font-bold hover:bg-gray-400 hover:text-white transition-all">Metal Handle</button>
              </div>

              <div className="relative h-72 bg-lab-cream rounded-2xl flex items-end justify-center pb-8 border-4 border-lab-wood-light overflow-hidden">
                {/* Heating Element / Base */}
                <div className="absolute bottom-4 w-48 h-8 bg-slate-800 rounded-lg">
                  {heatStatus !== 'idle' && (
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity }} className="absolute inset-x-2 top-0 h-1 bg-fire-red shadow-[0_0_15px_rgba(224,90,90,0.8)]" />
                  )}
                </div>

                {/* Kettle Body */}
                <div className="w-40 h-48 bg-slate-200 rounded-3xl rounded-b-xl border-4 border-slate-300 relative z-10 flex flex-col items-center justify-center">
                   {heatStatus !== 'idle' && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="absolute text-fire-red flex flex-col items-center opacity-50"
                     >
                       <Thermometer className="w-8 h-8 animate-pulse" />
                       <span className="font-bold text-xs">HOT</span>
                     </motion.div>
                   )}
                </div>

                {/* Handle */}
                <div className="absolute top-16 right-[calc(50%-6rem)] w-16 h-32 z-0">
                  <div className={`w-full h-full border-r-8 border-y-8 rounded-r-3xl ${
                    handleMaterial === 'plastic' ? 'border-factory-orange' : 
                    handleMaterial === 'metal' ? 'border-gray-400' : 'border-dashed border-lab-wood-light'
                  }`}>
                    {/* Heat spreading effect on metal */}
                    {handleMaterial === 'metal' && heatStatus !== 'idle' && (
                       <motion.div 
                        initial={{ backgroundColor: 'rgba(255,0,0,0)' }}
                        animate={{ backgroundColor: 'rgba(255,0,0,0.5)' }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full rounded-r-2xl" 
                       />
                    )}
                  </div>
                </div>
                
                {/* Result indicator */}
                {heatStatus === 'result' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-12 top-24 z-20">
                    {handleMaterial === 'metal' ? (
                      <div className="bg-fire-red text-white p-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
                        ✋🔥 OUCH! It burns!
                      </div>
                    ) : (
                      <div className="bg-nature-green text-white p-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
                        ✋✅ Safe to touch!
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {heatStatus === 'result' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="exam-bridge bg-white p-6 rounded-xl border-l-4 border-fire-red shadow-sm">
                  <p className="font-mono text-lg">
                    <strong>Concept:</strong> Plastics are <strong>poor conductors of heat (heat insulators)</strong>. 
                    <br/><br/>
                    This makes them perfect for handles of cooking utensils, kettles, and frying pans, protecting our hands from getting burned.
                  </p>
                </motion.div>
              )}
            </div>
          )}

        </main>

        <footer className="mt-8 flex justify-between">
          <Link href="/play/safety" className="flex items-center gap-2 px-6 py-3 bg-lab-chalk rounded-xl font-bold hover:bg-lab-wood-light transition-colors">
            <ArrowLeft className="w-5 h-5" /> Safety Test
          </Link>
          <Link href="/play/extras" className="flex items-center gap-2 px-6 py-3 bg-pip-blue text-white rounded-xl font-bold hover:bg-pip-blue-dark transition-colors shadow-md">
            Next: Rubber & Adhesives <ArrowRight className="w-5 h-5" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
