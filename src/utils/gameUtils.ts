import { Position, Snake } from '../types';
import { GAME_CONFIG } from '../Config';

export const getRandomFoodPosition = (snake: Snake): Position => {
  const tileCount = GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE;
  let foodX: number;
  let foodY: number;
  
  do {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
  } while (snake.segments.some(segment => segment.x === foodX && segment.y === foodY));
  
  return { x: foodX, y: foodY };
};

export const checkWallCollision = (head: Position): boolean => {
  const tileCount = GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE;
  return head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount;
};

export const checkSelfCollision = (snake: Snake): boolean => {
  const head = snake.segments[0];
  return snake.segments.slice(1).some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};

export const moveSnake = (snake: Snake): Snake => {
  const newHead = {
    x: snake.segments[0].x + snake.velocity.x,
    y: snake.segments[0].y + snake.velocity.y
  };
  
  return {
    ...snake,
    segments: [newHead, ...snake.segments.slice(0, -1)]
  };
};

export const growSnake = (snake: Snake): Snake => {
  const newHead = {
    x: snake.segments[0].x + snake.velocity.x,
    y: snake.segments[0].y + snake.velocity.y
  };
  
  return {
    ...snake,
    segments: [newHead, ...snake.segments]
  };
};