import { useState, useRef, useCallback, useEffect } from 'react';
import { GameState, Snake, Position } from '../types';
import { GAME_CONFIG } from '../Config';
import {
  getRandomFoodPosition,
  checkWallCollision,
  checkSelfCollision,
  moveSnake,
  growSnake,
} from '../utils/gameUtils';
import { getHighScore, saveHighScore } from '../utils/storageUtils';

const initialSnake: Snake = {
  segments: [{ x: 10, y: 10 }],
  velocity: { x: 0, y: 0 },
  nextVelocity: { x: 0, y: 0 },
};

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    snake: initialSnake,
    food: { x: 15, y: 15 },
    score: 0,
    highScore: getHighScore(),
    gameActive: false,
    gamePaused: false,
    gameSpeed: GAME_CONFIG.INITIAL_SPEED,
  }));

  const gameLoopRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);


  const startGame = useCallback(() => {
    setGameState(prevState => {
      const newSnake = {
        ...initialSnake,
        nextVelocity: { x: 1, y: 0 },
      };
      return {
        ...prevState,
        snake: newSnake,
        food: getRandomFoodPosition(newSnake),
        score: 0,
        gameActive: true,
        gamePaused: false,
        gameSpeed: GAME_CONFIG.INITIAL_SPEED,
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      gamePaused: !prevState.gamePaused,
    }));
  }, []);

  const gameOver = useCallback(() => {
    setGameState(prevState => {
      const newHighScore = Math.max(prevState.score, prevState.highScore);
      if (newHighScore > prevState.highScore) {
        saveHighScore(newHighScore);
      }
      return {
        ...prevState,
        gameActive: false,
        highScore: newHighScore,
      };
    });
  }, []);

  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.gameActive || prevState.gamePaused) {
        return prevState;
      }

      const updatedSnake = {
        ...prevState.snake,
        velocity: prevState.snake.nextVelocity,
      };

      const newHead = {
        x: updatedSnake.segments[0].x + updatedSnake.velocity.x,
        y: updatedSnake.segments[0].y + updatedSnake.velocity.y,
      };

      if (checkWallCollision(newHead) || checkSelfCollision({ ...updatedSnake, segments: [newHead, ...updatedSnake.segments] })) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        if (newHighScore > prevState.highScore) {
          saveHighScore(newHighScore);
        }
        return {
          ...prevState,
          gameActive: false,
          highScore: newHighScore,
        };
      }

      const ateFood = newHead.x === prevState.food.x && newHead.y === prevState.food.y;
      let newSnake: Snake;
      let newScore = prevState.score;
      let newFood = prevState.food;
      let newGameSpeed = prevState.gameSpeed;

      if (ateFood) {
        newSnake = growSnake(updatedSnake);
        newScore++;
        newFood = getRandomFoodPosition(newSnake);
        
        if (newScore % GAME_CONFIG.SCORE_FOR_SPEED_INCREASE === 0 && newGameSpeed < GAME_CONFIG.MAX_SPEED) {
          newGameSpeed += GAME_CONFIG.SPEED_INCREMENT;
        }
      } else {
        newSnake = moveSnake(updatedSnake);
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        gameSpeed: newGameSpeed,
      };
    });
  }, []);

  const changeDirection = useCallback((newDirection: Position) => {
    setGameState(prevState => {
      const { velocity } = prevState.snake;
      
      if (
        (newDirection.x === 1 && velocity.x === -1) ||
        (newDirection.x === -1 && velocity.x === 1) ||
        (newDirection.y === 1 && velocity.y === -1) ||
        (newDirection.y === -1 && velocity.y === 1)
      ) {
        return prevState;
      }

      return {
        ...prevState,
        snake: {
          ...prevState.snake,
          nextVelocity: newDirection,
        },
      };
    });
  }, []);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvasRef.current = canvas;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (gameState.gameActive && !gameState.gamePaused) {
      gameLoopRef.current = window.setInterval(updateGame, 1000 / gameState.gameSpeed);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameActive, gameState.gamePaused, gameState.gameSpeed, updateGame]);

  return {
    gameState,
    startGame,
    togglePause,
    gameOver,
    changeDirection,
    handleCanvasReady,
    canvasRef: canvasRef.current,
    ctxRef: ctxRef.current,
  };
};