'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Wrench, StretchHorizontal, PlusCircle } from 'lucide-react';

export default function ExtrasMission() {
  const [activeTab, setActiveTab] = useState<'rubber' | 'glue'>('rubber');
  const [fixedItems, setFixedItems] = useState<string[]>([]);
  const [draggedGlue, setDraggedGlue] = useState<string | null>(null);

  const brokenItems = [
    { id: 'toy', name: 'Broken Toy', icon: '🧸', style: 'text-amber-600' },
    { id: 'pipe', name: 'Leaking Pipe', icon: '🚰', style: 'text-blue-500' },
    { id: 'mug', name: 'Cracked Mug', icon: '☕', style: 'text-emerald-600' },
  ];

  const handleFix = (itemId: string) => {
    if (!fixedItems.includes(itemId)) {
      setFixedItems([...fixedItems, itemId]);
    }
  };

  return (
    <div className="min-h-screen bg-lab-cream p-8 font-sans text-text-dark">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center bg-lab-chalk p-4 rounded-xl shadow-sm border-2 border-lab-wood-light">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('rubber')}
              className={`px-6 py-2 rounded-full font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'rubber' ? 'bg-earth-brown text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              <StretchHorizontal className="w-4 h-4" /> Synthetic Rubber
            </button>
            <button
              onClick={() => setActiveTab('glue')}
              className={`px-6 py-2 rounded-full font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'glue' ? 'bg-factory-orange text-white' : 'bg-lab-cream border-2 border-lab-wood'
              }`}
            >
              <Wrench className="w-4 h-4" /> Synthetic Adhesives
            </button>
          </div>
          <div className="text-xl font-mono text-pip-blue-dark font-bold">Lab Station 5</div>
        </header>

        <main className="bg-white rounded-3xl p-8 shadow-xl border-4 border-lab-wood min-h-[500px]">
          
          {activeTab === 'rubber' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center mb-4 text-earth-brown">Synthetic Rubber</h2>
              <p className="text-center text-lg text-text-muted max-w-2xl mx-auto">
                Unlike natural rubber from trees, synthetic rubber is made using chemicals. Try stretching these items!
              </p>

              <div className="flex justify-center gap-12 py-12">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -50, right: 50 }}
                    whileDrag={{ scaleX: 1.5, scaleY: 0.8 }}
                    className="w-32 h-32 bg-lab-chalk border-4 border-earth-brown rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing text-6xl shadow-inner"
                  >
                    🚗
                  </motion.div>
                  <span className="font-bold">Tyre</span>
                  <span className="text-sm text-text-muted text-center w-32">Durable & tough</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -30, right: 30 }}
                    whileDrag={{ scaleX: 2, backgroundColor: '#fcd34d' }}
                    className="w-32 h-16 bg-yellow-200 border-4 border-yellow-500 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing text-2xl shadow-sm"
                  >
                    〰️
                  </motion.div>
                  <span className="font-bold">Rubber Band</span>
                  <span className="text-sm text-text-muted text-center w-32">Highly elastic</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9, rotate: 5 }}
                    className="w-32 h-32 bg-pink-200 border-4 border-pink-400 rounded-lg flex items-center justify-center cursor-pointer text-5xl"
                  >
                    ✏️
                  </motion.div>
                  <span className="font-bold">Eraser</span>
                  <span className="text-sm text-text-muted text-center w-32">Soft & flexible</span>
                </div>
              </div>

              <div className="exam-bridge bg-earth-brown/10 p-6 rounded-xl border-l-4 border-earth-brown shadow-sm mt-8">
                <p className="font-mono text-lg">
                  <strong>Concept:</strong> Synthetic rubber has many of the same properties as natural rubber (elasticity, water resistance) but can be engineered to be stronger or resistant to specific chemicals and temperatures.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'glue' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center mb-4 text-factory-orange">Repair Workshop</h2>
              <p className="text-center text-lg text-text-muted">
                Drag the synthetic adhesive (glue) to fix the broken items!
              </p>

              <div className="flex flex-col items-center relative h-96 bg-lab-chalk/50 rounded-2xl border-2 border-dashed border-lab-wood p-8">
                
                {/* Draggable Glue */}
                <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragStart={() => setDraggedGlue('superglue')}
                  onDragEnd={(e, info) => {
                    setDraggedGlue(null);
                    // Simple hit detection for demonstration
                    const rects = document.querySelectorAll('.repair-target');
                    rects.forEach(rect => {
                      const bounds = rect.getBoundingClientRect();
                      if (
                        info.point.x >= bounds.left && info.point.x <= bounds.right &&
                        info.point.y >= bounds.top && info.point.y <= bounds.bottom
                      ) {
                        handleFix(rect.id);
                      }
                    });
                  }}
                  className="z-50 w-24 h-24 bg-white rounded-xl shadow-lg border-2 border-factory-orange flex flex-col items-center justify-center cursor-grab active:cursor-grabbing mb-12 absolute top-8"
                >
                  <span className="text-3xl">🧴</span>
                  <span className="text-xs font-bold mt-1">Super Glue</span>
                </motion.div>

                <div className="grid grid-cols-3 gap-12 mt-32 w-full place-items-center">
                  {brokenItems.map((item) => {
                    const isFixed = fixedItems.includes(item.id);
                    return (
                      <div key={item.id} id={item.id} className="repair-target flex flex-col items-center gap-4 p-4">
                        <div className="relative text-6xl h-20 w-20 flex items-center justify-center">
                          {isFixed ? (
                            <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="drop-shadow-lg">
                              {item.icon}
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -bottom-2 -right-2 bg-nature-green text-white rounded-full p-1 border-2 border-white"
                              >
                                <PlusCircle className="w-5 h-5" />
                              </motion.div>
                            </motion.span>
                          ) : (
                            <div className="relative">
                              <span className={`opacity-80 drop-shadow-sm ${item.style}`}>{item.icon}</span>
                              <div className="absolute inset-0 bg-white/40 flex items-center justify-center transform rotate-45 border-t-2 border-b-2 border-gray-400" style={{ height: '4px', top: '50%' }}></div>
                            </div>
                          )}
                        </div>
                        <span className="font-bold font-mono text-sm">{isFixed ? 'Fixed!' : item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {fixedItems.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="exam-bridge bg-factory-orange/10 p-6 rounded-xl border-l-4 border-factory-orange shadow-sm">
                  <p className="font-mono text-lg">
                    <strong>Concept:</strong> Synthetic adhesives are man-made glues used to join materials firmly. They are essential in modern manufacturing, from building cars and airplanes to making furniture and fixing broken toys.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </main>

        <footer className="mt-8 flex justify-between">
          <Link href="/play/plastic" className="flex items-center gap-2 px-6 py-3 bg-lab-chalk rounded-xl font-bold hover:bg-lab-wood-light transition-colors">
            <ArrowLeft className="w-5 h-5" /> Plastic Workshop
          </Link>
          <Link href="/play/final" className="flex items-center gap-2 px-6 py-3 bg-nature-green text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md">
            Finish Mission <ArrowRight className="w-5 h-5" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
