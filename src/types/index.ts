export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  segments: Position[];
  velocity: Position;
  nextVelocity: Position;
}

export interface GameState {
  snake: Snake;
  food: Position;
  score: number;
  highScore: number;
  gameActive: boolean;
  gamePaused: boolean;
  gameSpeed: number;
}