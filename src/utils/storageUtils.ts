import { STORAGE_KEYS } from '../Config';

export const getHighScore = (): number => {
  const stored = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
  return stored ? parseInt(stored, 10) : 0;
};

export const saveHighScore = (score: number): void => {
  localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
};