'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speak, playClickSound } from '@/lib/audio-manager';

interface PipDialogueProps {
  text: string;
  isVisible: boolean;
  onComplete?: () => void;
  onClick?: () => void;
  position?: 'above' | 'right';
  enableTTS?: boolean;
}

export function PipDialogue({ 
  text, 
  isVisible, 
  onComplete, 
  onClick,
  position = 'above',
  enableTTS = true
}: PipDialogueProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible || !text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    if (enableTTS) {
      speak(text);
    }

    let i = 0;
    const speed = 25; // ms per char

    const interval = setInterval(() => {
      if (i < text.length - 1) {
        setDisplayedText(prev => prev + text[i]);
        i++;
      } else {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isVisible, onComplete, enableTTS]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    speak(text);
  };

  return (
    <AnimatePresence>
      {isVisible && text && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: position === 'above' ? 10 : 0, x: position === 'right' ? -10 : 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          onClick={onClick}
          className={`absolute z-50 max-w-[360px] bg-white rounded-2xl p-4 shadow-medium border-2 border-lab-wood cursor-pointer select-none
            ${position === 'above' ? 'bottom-full left-1/2 -translate-x-1/2 mb-4' : 'left-full top-1/2 -translate-y-1/2 ml-4'}
          `}
        >
          {/* Tail */}
          <div 
            className={`absolute w-3.5 h-3.5 bg-white border-lab-wood
              ${position === 'above' 
                ? 'border-b-2 border-r-2 -bottom-[8px] left-1/2 -translate-x-1/2 rotate-45' 
                : 'border-b-2 border-l-2 -left-[8px] top-1/2 -translate-y-1/2 rotate-45'}
            `}
          />
          
          <div className="relative z-10 flex items-start gap-2.5">
            <div className="flex-1 text-text-dark font-nunito font-bold text-sm sm:text-base leading-relaxed">
              {displayedText}
              {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-pip-blue animate-pulse align-middle" />}
            </div>

            {/* Replay Voice Button */}
            <button
              onClick={handleReplay}
              className="p-1 rounded-lg bg-lab-chalk hover:bg-pip-blue/15 text-pip-blue transition-colors shrink-0"
              title="Listen to Pip's voice 🗣️"
            >
              <Volume2 size={15} />
            </button>
          </div>

          {!isTyping && (
            <motion.div 
              className="absolute -bottom-2.5 right-3 bg-pip-blue text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1"
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span>Tap ➔</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
