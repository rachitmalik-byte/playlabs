'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const STAGES = [
  { days: 1, label: 'Day 1' },
  { days: 30, label: '1 Month' },
  { days: 180, label: '6 Months' },
  { days: 365, label: '1 Year' },
  { days: 3650, label: '10 Years' },
  { days: 18250, label: '50 Years' },
  { days: 36500, label: '100 Years' },
];

export default function EnvironmentMission() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const currentStage = STAGES[sliderIndex];

  // Helper to determine visual state based on days
  const getDecompState = (days: number, decompDays: number) => {
    if (days >= decompDays) return { opacity: 0, scale: 0, showSoil: true };
    if (days >= decompDays / 2) return { opacity: 0.5, scale: 0.8, filter: 'sepia(100%)', showSoil: false };
    return { opacity: 1, scale: 1, filter: 'none', showSoil: false };
  };

  const is100Years = sliderIndex === STAGES.length - 1;

  return (
    <div className="min-h-screen bg-lab-chalk font-nunito p-8 flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-dark font-mono">Mission: The Soil Journey</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm font-mono font-bold text-pip-blue border border-pip-blue/30">
          Time Passed: {currentStage.label}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Pip Intro / Reaction */}
        <div className="flex items-end gap-4 mb-6 max-w-3xl w-full">
          <div className="w-16 h-16 bg-nature-green rounded-full flex items-center justify-center text-3xl shadow-md border-4 border-white shrink-0 text-white font-bold">
            🌱
          </div>
          <div className="speech-bubble bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-lab-wood-light flex-1">
            <p className="text-text-dark font-medium text-lg">
              {is100Years 
                ? "Oh no! After 100 years, the apple, cotton, and jute have returned to nature. But look at the plastic bottle—it's still there! Plastics are non-biodegradable." 
                : "Let's bury some items and travel through time. Drag the slider to see what happens to them underground!"}
            </p>
          </div>
        </div>

        {/* Underground Cross-Section */}
        <div className="w-full max-w-5xl flex-1 bg-earth-brown rounded-3xl overflow-hidden relative shadow-inner border-t-8 border-nature-green min-h-[400px]">
          {/* Grass top */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-nature-green-light z-20 opacity-50"></div>
          
          {/* Dirt texture pattern (simple CSS representation) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4a3821 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="grid grid-cols-4 h-full pt-16 pb-8 px-8 gap-4 relative z-10">
            {/* Apple */}
            <div className="flex flex-col items-center justify-start h-full gap-4">
              <div className="bg-white/10 px-3 py-1 rounded-full text-white/80 font-bold text-sm mb-4">Apple Core</div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  className="text-6xl absolute"
                  animate={getDecompState(currentStage.days, 60)} // ~2 months
                >
                  🍎
                </motion.div>
                <motion.div 
                  className="text-5xl absolute text-brown-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: getDecompState(currentStage.days, 60).showSoil ? 1 : 0 }}
                >
                  🪴
                </motion.div>
              </div>
            </div>

            {/* Cotton */}
            <div className="flex flex-col items-center justify-start h-full gap-4">
              <div className="bg-white/10 px-3 py-1 rounded-full text-white/80 font-bold text-sm mb-4">Cotton Cloth</div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  className="text-6xl absolute"
                  animate={getDecompState(currentStage.days, 180)} // 6 months
                >
                  👕
                </motion.div>
                <motion.div 
                  className="text-5xl absolute text-brown-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: getDecompState(currentStage.days, 180).showSoil ? 1 : 0 }}
                >
                  🪴
                </motion.div>
              </div>
            </div>

            {/* Jute */}
            <div className="flex flex-col items-center justify-start h-full gap-4">
              <div className="bg-white/10 px-3 py-1 rounded-full text-white/80 font-bold text-sm mb-4">Jute Bag</div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  className="text-6xl absolute"
                  animate={getDecompState(currentStage.days, 365)} // 1 year
                >
                  🛍️
                </motion.div>
                <motion.div 
                  className="text-5xl absolute text-brown-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: getDecompState(currentStage.days, 365).showSoil ? 1 : 0 }}
                >
                  🪴
                </motion.div>
              </div>
            </div>

            {/* Plastic */}
            <div className="flex flex-col items-center justify-start h-full gap-4">
              <div className="bg-white/10 px-3 py-1 rounded-full text-white/80 font-bold text-sm mb-4">Plastic Bottle</div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  className="text-6xl absolute"
                  // Plastic doesn't degrade in this timeframe
                  animate={{ opacity: 1, scale: 1 }} 
                >
                  🍼
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slider */}
        <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-2xl shadow-sm border border-lab-wood-light flex items-center gap-6">
          <span className="text-2xl">⏳</span>
          <input 
            type="range" 
            min="0" 
            max={STAGES.length - 1} 
            value={sliderIndex}
            onChange={(e) => setSliderIndex(parseInt(e.target.value))}
            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nature-green"
          />
          <div className="w-24 text-right font-bold text-text-dark">
            {currentStage.label}
          </div>
        </div>

        {/* Lesson conclusion */}
        {is100Years && (
           <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mt-8 exam-bridge bg-red-50 border-2 border-fire-red p-6 rounded-2xl max-w-3xl w-full shadow-md text-center"
         >
           <h3 className="text-xl font-bold text-fire-red mb-2 font-mono flex items-center justify-center gap-2">
             <span>⚠️</span> Crucial Discovery
           </h3>
           <p className="text-text-dark font-mono text-lg leading-relaxed">
             Natural materials like cotton and jute are <span className="science-term text-nature-green font-bold">biodegradable</span> (broken down by bacteria). 
             Synthetic <span className="science-term text-fire-red font-bold">plastics are non-biodegradable</span> and persist in the environment for hundreds of years, causing pollution.
           </p>
         </motion.div>
        )}
      </main>
      
      <footer className="mt-8 flex justify-between w-full">
        <Link href="/play/experiments" className="px-6 py-3 bg-lab-wood text-white font-bold rounded-xl hover:bg-lab-wood-dark transition-colors">
          Back to Lab Tests
        </Link>
        <Link 
          href="/play" 
          className="px-6 py-3 bg-pip-blue text-white font-bold rounded-xl hover:bg-pip-blue-dark transition-colors shadow-sm"
        >
          Finish Mission
        </Link>
      </footer>
    </div>
  );
}
