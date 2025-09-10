import { useState, useCallback } from 'react';
import { Position } from '../types';

interface UseTouchControlsProps {
  gameActive: boolean;
  gamePaused: boolean;
  onDirectionChange: (direction: Position) => void;
  onTogglePause: () => void;
  onStart: () => void;
}

export const useTouchControls = ({
  gameActive,
  gamePaused,
  onDirectionChange,
  onTogglePause,
  onStart,
}: UseTouchControlsProps) => {
  const [touchStart, setTouchStart] = useState<Position>({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!gameActive) {
      onStart();
      return;
    }

    if (gamePaused) {
      onTogglePause();
      return;
    }

    const touchEnd = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    const diffX = touchEnd.x - touchStart.x;
    const diffY = touchEnd.y - touchStart.y;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        onDirectionChange({ x: 1, y: 0 });
      } else {
        onDirectionChange({ x: -1, y: 0 });
      }
    } else {
      if (diffY > 0) {
        onDirectionChange({ x: 0, y: 1 });
      } else {
        onDirectionChange({ x: 0, y: -1 });
      }
    }

    setTouchStart(touchEnd);
    e.preventDefault();
  }, [gameActive, gamePaused, touchStart, onDirectionChange, onTogglePause, onStart]);

  return {
    handleTouchStart,
    handleTouchMove,
  };
};