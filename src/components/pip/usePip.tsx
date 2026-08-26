'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PipExpression, PipDialogue, PipHintLevel } from '@/types/pip';

interface PipContextType {
  expression: PipExpression;
  setExpression: (expr: PipExpression) => void;
  showDialogue: (text: string, expr?: PipExpression) => void;
  hideDialogue: () => void;
  currentDialogue: PipDialogue | null;
  isDialogueVisible: boolean;
  runSequence: (sequence: PipDialogue[]) => void;
  hintLevel: PipHintLevel;
  setHintLevel: (level: PipHintLevel) => void;
}

const PipContext = createContext<PipContextType | undefined>(undefined);

export function PipProvider({ children }: { children: ReactNode }) {
  const [expression, setExpression] = useState<PipExpression>('silent');
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState<PipDialogue | null>(null);
  const [hintLevel, setHintLevel] = useState<PipHintLevel>(1);
  const [, setSequence] = useState<PipDialogue[]>([]);
  const [, setSequenceIndex] = useState(-1);

  const showDialogue = useCallback((text: string, expr: PipExpression = 'silent') => {
    setCurrentDialogue({ text, expression: expr, nextAction: 'interact' });
    setExpression(expr);
    setIsDialogueVisible(true);
    setSequence([]);
    setSequenceIndex(-1);
  }, []);

  const hideDialogue = useCallback(() => {
    setIsDialogueVisible(false);
    setExpression('silent');
  }, []);

  const runSequence = useCallback((seq: PipDialogue[]) => {
    if (seq.length === 0) return;
    setSequence(seq);
    setSequenceIndex(0);
    setCurrentDialogue(seq[0]);
    setExpression(seq[0].expression);
    setIsDialogueVisible(true);
  }, []);

  return (
    <PipContext.Provider value={{
      expression,
      setExpression,
      showDialogue,
      hideDialogue,
      currentDialogue,
      isDialogueVisible,
      runSequence,
      hintLevel,
      setHintLevel
    }}>
      {children}
    </PipContext.Provider>
  );
}

export function usePip() {
  const context = useContext(PipContext);
  if (context === undefined) {
    throw new Error('usePip must be used within a PipProvider');
  }
  return context;
}
