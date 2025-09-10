import { useEffect } from 'react';
import { GameState } from '../types';
import { clearCanvas, drawFood, drawSnake, drawGrid, drawPauseOverlay } from '../utils/drawUtils';

export const useGameRenderer = (
  ctx: CanvasRenderingContext2D | null,
  gameState: GameState
) => {
  useEffect(() => {
    if (!ctx) return;

    clearCanvas(ctx);
    drawFood(ctx, gameState.food);
    drawSnake(ctx, gameState.snake);
    drawGrid(ctx);

    if (gameState.gamePaused) {
      drawPauseOverlay(ctx);
    }
  }, [ctx, gameState]);
};