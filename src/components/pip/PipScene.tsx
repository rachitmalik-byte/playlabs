'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Pip } from './Pip';
import { PipDialogue as PipDialogueBubble } from './PipDialogue';
import { PipDialogue, PipExpression } from '@/types/pip';
import { playClickSound } from '@/lib/audio-manager';

interface PipSceneProps {
  dialogues: PipDialogue[];
  position?: 'bottom-left' | 'bottom-right' | 'center-bottom';
  onDialogueComplete?: () => void;
  initialExpression?: PipExpression;
}

export function PipScene({
  dialogues,
  position = 'bottom-left',
  onDialogueComplete,
  initialExpression = 'silent'
}: PipSceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expression, setExpression] = useState<PipExpression>(initialExpression);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (dialogues.length > 0 && currentIndex < dialogues.length) {
      setExpression(dialogues[currentIndex].expression);
      setIsDialogueVisible(true);
      setIsTyping(true);
    } else {
      setIsDialogueVisible(false);
      setExpression(initialExpression);
      if (onDialogueComplete) onDialogueComplete();
    }
  }, [currentIndex, dialogues, initialExpression, onDialogueComplete]);

  // Handle auto-advance
  useEffect(() => {
    const currentDialogue = dialogues[currentIndex];
    if (!currentDialogue || isTyping) return;

    if (currentDialogue.nextAction === 'auto' && currentDialogue.duration) {
      const timer = setTimeout(() => {
        handleAdvance();
      }, currentDialogue.duration);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTyping, dialogues]);

  const handleAdvance = useCallback(() => {
    playClickSound();
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (currentIndex === dialogues.length - 1) {
      setIsDialogueVisible(false);
      if (onDialogueComplete) onDialogueComplete();
    }
  }, [currentIndex, dialogues.length, onDialogueComplete]);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left': return 'bottom-8 left-8';
      case 'bottom-right': return 'bottom-8 right-8';
      case 'center-bottom': return 'bottom-8 left-1/2 -translate-x-1/2';
      default: return 'bottom-8 left-8';
    }
  };

  const bubblePosition = position === 'bottom-left' ? 'right' : 'above';
  const currentDialogue = dialogues[currentIndex];

  if (!dialogues || dialogues.length === 0) return null;

  return (
    <div className={`fixed z-40 ${getPositionClasses()}`}>
      <div className="relative inline-flex">
        <Pip 
          expression={expression} 
          size="md" 
          onClick={handleAdvance}
        />
        <PipDialogueBubble
          text={currentDialogue?.text || ''}
          isVisible={isDialogueVisible}
          position={bubblePosition}
          onClick={handleAdvance}
          onComplete={() => setIsTyping(false)}
        />
      </div>
    </div>
  );
}
