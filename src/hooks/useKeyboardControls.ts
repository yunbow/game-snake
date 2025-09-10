import { useEffect } from 'react';
import { Position } from '../types';

interface UseKeyboardControlsProps {
  gameActive: boolean;
  onDirectionChange: (direction: Position) => void;
  onTogglePause: () => void;
  onStart: () => void;
}

export const useKeyboardControls = ({
  gameActive,
  onDirectionChange,
  onTogglePause,
  onStart,
}: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive && e.code === 'Space') {
        onStart();
        e.preventDefault();
        return;
      }

      if (gameActive && e.code === 'Space') {
        onTogglePause();
        e.preventDefault();
        return;
      }

      switch (e.code) {
        case 'ArrowUp':
          onDirectionChange({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          onDirectionChange({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          onDirectionChange({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          onDirectionChange({ x: 1, y: 0 });
          break;
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, onDirectionChange, onTogglePause, onStart]);
};