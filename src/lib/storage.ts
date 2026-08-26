import { LearningState } from './learning-engine';

const STORAGE_KEY = 'polyquest-v2-progress';

export function saveProgress(state: LearningState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Could not save progress', error);
  }
}

export function loadProgress(): LearningState | null {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState) as LearningState;
  } catch (error) {
    console.error('Could not load progress', error);
    return null;
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Could not clear progress', error);
  }
}
