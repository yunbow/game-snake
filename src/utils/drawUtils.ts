import { Position, Snake } from '../types';
import { GAME_CONFIG, COLORS } from '../Config';

export const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
  ctx.fillStyle = COLORS.BACKGROUND;
  ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
};

export const drawFood = (ctx: CanvasRenderingContext2D, food: Position): void => {
  ctx.fillStyle = COLORS.FOOD;
  ctx.fillRect(
    food.x * GAME_CONFIG.GRID_SIZE,
    food.y * GAME_CONFIG.GRID_SIZE,
    GAME_CONFIG.GRID_SIZE - 2,
    GAME_CONFIG.GRID_SIZE - 2
  );
};

export const drawSnake = (ctx: CanvasRenderingContext2D, snake: Snake): void => {
  snake.segments.forEach((segment, index) => {
    if (index === 0) {
      ctx.fillStyle = COLORS.SNAKE_HEAD;
    } else {
      ctx.fillStyle = COLORS.SNAKE_BODY;
    }
    
    ctx.fillRect(
      segment.x * GAME_CONFIG.GRID_SIZE,
      segment.y * GAME_CONFIG.GRID_SIZE,
      GAME_CONFIG.GRID_SIZE - 2,
      GAME_CONFIG.GRID_SIZE - 2
    );
    
    if (index === 0) {
      drawSnakeEyes(ctx, segment, snake.velocity);
    }
  });
};

const drawSnakeEyes = (
  ctx: CanvasRenderingContext2D,
  head: Position,
  velocity: Position
): void => {
  ctx.fillStyle = '#000';
  const baseX = head.x * GAME_CONFIG.GRID_SIZE;
  const baseY = head.y * GAME_CONFIG.GRID_SIZE;
  
  if (velocity.x === 1) {
    ctx.fillRect(baseX + GAME_CONFIG.GRID_SIZE - 7, baseY + 4, 3, 3);
    ctx.fillRect(baseX + GAME_CONFIG.GRID_SIZE - 7, baseY + GAME_CONFIG.GRID_SIZE - 7, 3, 3);
  } else if (velocity.x === -1) {
    ctx.fillRect(baseX + 4, baseY + 4, 3, 3);
    ctx.fillRect(baseX + 4, baseY + GAME_CONFIG.GRID_SIZE - 7, 3, 3);
  } else if (velocity.y === -1) {
    ctx.fillRect(baseX + 4, baseY + 4, 3, 3);
    ctx.fillRect(baseX + GAME_CONFIG.GRID_SIZE - 7, baseY + 4, 3, 3);
  } else if (velocity.y === 1) {
    ctx.fillRect(baseX + 4, baseY + GAME_CONFIG.GRID_SIZE - 7, 3, 3);
    ctx.fillRect(baseX + GAME_CONFIG.GRID_SIZE - 7, baseY + GAME_CONFIG.GRID_SIZE - 7, 3, 3);
  } else {
    ctx.fillRect(baseX + 4, baseY + 4, 3, 3);
    ctx.fillRect(baseX + GAME_CONFIG.GRID_SIZE - 7, baseY + 4, 3, 3);
  }
};

export const drawGrid = (ctx: CanvasRenderingContext2D): void => {
  const tileCount = GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE;
  ctx.strokeStyle = COLORS.GRID_LINE;
  
  for (let i = 0; i < tileCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * GAME_CONFIG.GRID_SIZE, 0);
    ctx.lineTo(i * GAME_CONFIG.GRID_SIZE, GAME_CONFIG.CANVAS_HEIGHT);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, i * GAME_CONFIG.GRID_SIZE);
    ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, i * GAME_CONFIG.GRID_SIZE);
    ctx.stroke();
  }
};

export const drawPauseOverlay = (ctx: CanvasRenderingContext2D): void => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
  
  ctx.fillStyle = '#FFF';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('一時停止中', GAME_CONFIG.CANVAS_WIDTH / 2, GAME_CONFIG.CANVAS_HEIGHT / 2);
};