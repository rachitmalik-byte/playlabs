import { useReducer, useEffect } from 'react';
import { ConceptId, ConceptMastery, LearningConcept } from '../types/concepts';
import { concepts as defaultConcepts } from '../data/concepts';
import { loadProgress, saveProgress } from './storage';

export type LearningState = {
  concepts: Record<ConceptId, LearningConcept>;
  completedMissions: string[];
};

type Action = 
  | { type: 'INTRODUCE_CONCEPT'; payload: { id: ConceptId } }
  | { type: 'ATTEMPT_CONCEPT'; payload: { id: ConceptId; isCorrect: boolean } }
  | { type: 'COMPLETE_MISSION'; payload: { id: string } }
  | { type: 'RESET' }
  | { type: 'LOAD'; payload: LearningState };

const getInitialState = (): LearningState => {
  const fullConcepts = {} as Record<ConceptId, LearningConcept>;
  
  for (const [key, value] of Object.entries(defaultConcepts)) {
    fullConcepts[key as ConceptId] = {
      ...value,
      mastery: 'not_started',
      attempts: 0,
      correctAttempts: 0
    };
  }
  
  return {
    concepts: fullConcepts,
    completedMissions: []
  };
};

const determineMastery = (attempts: number, correctAttempts: number): ConceptMastery => {
  if (attempts === 0) return 'introduced';
  const ratio = correctAttempts / attempts;
  if (attempts >= 3 && ratio >= 0.8) return 'mastered';
  if (attempts >= 2 && ratio >= 0.5) return 'understood';
  return 'developing';
};

function learningReducer(state: LearningState, action: Action): LearningState {
  switch (action.type) {
    case 'INTRODUCE_CONCEPT': {
      const { id } = action.payload;
      const concept = state.concepts[id];
      if (concept.mastery !== 'not_started') return state;
      
      return {
        ...state,
        concepts: {
          ...state.concepts,
          [id]: {
            ...concept,
            mastery: 'introduced'
          }
        }
      };
    }
    case 'ATTEMPT_CONCEPT': {
      const { id, isCorrect } = action.payload;
      const concept = state.concepts[id];
      const newAttempts = concept.attempts + 1;
      const newCorrect = concept.correctAttempts + (isCorrect ? 1 : 0);
      
      return {
        ...state,
        concepts: {
          ...state.concepts,
          [id]: {
            ...concept,
            attempts: newAttempts,
            correctAttempts: newCorrect,
            mastery: determineMastery(newAttempts, newCorrect),
            lastReviewedAt: new Date().toISOString()
          }
        }
      };
    }
    case 'COMPLETE_MISSION': {
      if (state.completedMissions.includes(action.payload.id)) return state;
      return {
        ...state,
        completedMissions: [...state.completedMissions, action.payload.id]
      };
    }
    case 'RESET':
      return getInitialState();
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
}

export function useLearningEngine() {
  const [state, dispatch] = useReducer(learningReducer, undefined, getInitialState);

  useEffect(() => {
    const savedState = loadProgress();
    if (savedState) {
      dispatch({ type: 'LOAD', payload: savedState });
    }
  }, []);

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const introduceConcept = (id: ConceptId) => dispatch({ type: 'INTRODUCE_CONCEPT', payload: { id } });
  const recordAttempt = (id: ConceptId, isCorrect: boolean) => dispatch({ type: 'ATTEMPT_CONCEPT', payload: { id, isCorrect } });
  const completeMission = (id: string) => dispatch({ type: 'COMPLETE_MISSION', payload: { id } });
  const resetProgress = () => dispatch({ type: 'RESET' });

  return {
    state,
    introduceConcept,
    recordAttempt,
    completeMission,
    resetProgress
  };
}
