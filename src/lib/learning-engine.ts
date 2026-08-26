import { useReducer, useEffect } from 'react';
import { ConceptId, ConceptMastery, LearningConcept } from '../types/concepts';
import { concepts as defaultConcepts } from '../data/concepts';
import { loadProgress, saveProgress } from './storage';

export type ActivityLogEntry = {
  id: string;
  conceptId: ConceptId;
  conceptName: string;
  isCorrect: boolean;
  note: string;
  timestamp: string;
  missionId?: string;
};

export type LearningState = {
  concepts: Record<ConceptId, LearningConcept>;
  completedMissions: string[];
  activityLog: ActivityLogEntry[];
  totalPlayTimeMinutes: number;
  lastActiveAt?: string;
};

type Action = 
  | { type: 'INTRODUCE_CONCEPT'; payload: { id: ConceptId } }
  | { type: 'ATTEMPT_CONCEPT'; payload: { id: ConceptId; isCorrect: boolean; note?: string; missionId?: string } }
  | { type: 'COMPLETE_MISSION'; payload: { id: string } }
  | { type: 'RESET' }
  | { type: 'LOAD'; payload: LearningState }
  | { type: 'SEED_SAMPLE_DATA' };

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
    completedMissions: [],
    activityLog: [],
    totalPlayTimeMinutes: 0,
    lastActiveAt: new Date().toISOString()
  };
};

const determineMastery = (attempts: number, correctAttempts: number): ConceptMastery => {
  if (attempts === 0) return 'not_started';
  const ratio = correctAttempts / attempts;
  if (attempts >= 3 && ratio >= 0.8) return 'mastered';
  if (attempts >= 2 && ratio >= 0.5) return 'understood';
  if (attempts >= 1) return 'developing';
  return 'introduced';
};

function learningReducer(state: LearningState, action: Action): LearningState {
  switch (action.type) {
    case 'INTRODUCE_CONCEPT': {
      const { id } = action.payload;
      const concept = state.concepts[id] || defaultConcepts[id];
      if (!concept || concept.mastery !== 'not_started') return state;
      
      return {
        ...state,
        lastActiveAt: new Date().toISOString(),
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
      const { id, isCorrect, note, missionId } = action.payload;
      const concept = state.concepts[id] || {
        id,
        title: id.replace(/_/g, ' '),
        simpleExplanation: '',
        academicTerm: id,
        examAnswer: '',
        prerequisites: [],
        mastery: 'not_started',
        attempts: 0,
        correctAttempts: 0
      };

      const newAttempts = concept.attempts + 1;
      const newCorrect = concept.correctAttempts + (isCorrect ? 1 : 0);
      const newMastery = determineMastery(newAttempts, newCorrect);

      const logEntry: ActivityLogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        conceptId: id,
        conceptName: concept.title || id.replace(/_/g, ' '),
        isCorrect,
        note: note || (isCorrect ? 'Understood the core science concept correctly' : 'Had a slight misconception, reviewed explanation'),
        timestamp: new Date().toISOString(),
        missionId
      };

      return {
        ...state,
        lastActiveAt: new Date().toISOString(),
        activityLog: [logEntry, ...(state.activityLog || []).slice(0, 49)],
        concepts: {
          ...state.concepts,
          [id]: {
            ...concept,
            attempts: newAttempts,
            correctAttempts: newCorrect,
            mastery: newMastery,
            lastReviewedAt: new Date().toISOString()
          }
        }
      };
    }
    case 'COMPLETE_MISSION': {
      const currentCompleted = state.completedMissions || [];
      if (currentCompleted.includes(action.payload.id)) return state;
      return {
        ...state,
        lastActiveAt: new Date().toISOString(),
        completedMissions: [...currentCompleted, action.payload.id]
      };
    }
    case 'SEED_SAMPLE_DATA': {
      // Realistic simulated child gameplay for demonstration/testing
      const sampleState = getInitialState();
      sampleState.completedMissions = ['origins', 'fibres', 'experiments'];
      sampleState.totalPlayTimeMinutes = 24;

      const sampleEvents: { id: ConceptId; isCorrect: boolean; note: string; mission: string }[] = [
        { id: 'natural_material', isCorrect: true, note: 'Correctly identified cotton and wool as natural plant/animal fibres', mission: 'origins' },
        { id: 'synthetic_material', isCorrect: true, note: 'Classified nylon, polyester, and plastic as synthetic factory materials', mission: 'origins' },
        { id: 'nylon', isCorrect: true, note: 'Predicted nylon thread holds 100kg+ and connects to parachutes', mission: 'experiments' },
        { id: 'fibre', isCorrect: true, note: 'Explored cotton, nylon, polyester, and acrylic superpowers', mission: 'fibres' },
        { id: 'plastic_safety', isCorrect: false, note: 'Wondered why polyester shirt melted near flame instead of charring', mission: 'safety' },
        { id: 'heat_insulator', isCorrect: false, note: 'Initially selected metal for kettle handle before correcting to plastic', mission: 'plastic' },
        { id: 'electrical_insulator', isCorrect: true, note: 'Wrapped copper wire with plastic safely', mission: 'plastic' },
        { id: 'non_biodegradable', isCorrect: true, note: 'Observed plastic remaining intact at 100 years underground', mission: 'environment' },
      ];

      sampleEvents.forEach(e => {
        const c = sampleState.concepts[e.id];
        if (c) {
          c.attempts += 1;
          if (e.isCorrect) c.correctAttempts += 1;
          c.mastery = determineMastery(c.attempts, c.correctAttempts);
        }
        sampleState.activityLog.push({
          id: `${Date.now()}-${Math.random()}`,
          conceptId: e.id,
          conceptName: c?.title || e.id,
          isCorrect: e.isCorrect,
          note: e.note,
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
          missionId: e.mission
        });
      });

      return sampleState;
    }
    case 'RESET':
      return getInitialState();
    case 'LOAD':
      return {
        ...getInitialState(),
        ...action.payload,
        concepts: {
          ...getInitialState().concepts,
          ...(action.payload.concepts || {})
        },
        activityLog: action.payload.activityLog || [],
        completedMissions: action.payload.completedMissions || []
      };
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
  const recordAttempt = (id: ConceptId, isCorrect: boolean, note?: string, missionId?: string) => 
    dispatch({ type: 'ATTEMPT_CONCEPT', payload: { id, isCorrect, note, missionId } });
  const completeMission = (id: string) => dispatch({ type: 'COMPLETE_MISSION', payload: { id } });
  const seedSampleData = () => dispatch({ type: 'SEED_SAMPLE_DATA' });
  const resetProgress = () => dispatch({ type: 'RESET' });

  return {
    state,
    introduceConcept,
    recordAttempt,
    completeMission,
    seedSampleData,
    resetProgress
  };
}

/** Global standalone logger for direct use across pages without context re-mounting */
export function logChildAttempt(conceptId: ConceptId, isCorrect: boolean, note?: string, missionId?: string) {
  if (typeof window === "undefined") return;
  try {
    const current = loadProgress() || getInitialState();
    const updated = learningReducer(current, {
      type: 'ATTEMPT_CONCEPT',
      payload: { id: conceptId, isCorrect, note, missionId }
    });
    saveProgress(updated);
    window.dispatchEvent(new CustomEvent('polyquest-progress-updated', { detail: updated }));
  } catch (err) {
    console.warn('Could not log child attempt:', err);
  }
}

export function logMissionCompleted(missionId: string) {
  if (typeof window === "undefined") return;
  try {
    const current = loadProgress() || getInitialState();
    const updated = learningReducer(current, {
      type: 'COMPLETE_MISSION',
      payload: { id: missionId }
    });
    saveProgress(updated);
    window.dispatchEvent(new CustomEvent('polyquest-progress-updated', { detail: updated }));
  } catch (err) {
    console.warn('Could not log mission completion:', err);
  }
}
