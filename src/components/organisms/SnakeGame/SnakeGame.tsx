import { Canvas } from '../../atoms/Canvas';
import { GameHeader } from '../../molecules/GameHeader';
import { GameControls } from '../../molecules/GameControls';
import { GameInstructions } from '../../molecules/GameInstructions';
import { GameOverScreen } from '../../molecules/GameOverScreen';
import { useSnakeGame } from '../../../hooks/useSnakeGame';
import { useKeyboardControls } from '../../../hooks/useKeyboardControls';
import { useTouchControls } from '../../../hooks/useTouchControls';
import { useGameRenderer } from '../../../hooks/useGameRenderer';
import { GAME_CONFIG } from '../../../Config';
import styles from './SnakeGame.module.css';

export const SnakeGame: React.FC = () => {
  const {
    gameState,
    startGame,
    togglePause,
    changeDirection,
    handleCanvasReady,
    ctxRef,
  } = useSnakeGame();

  useKeyboardControls({
    gameActive: gameState.gameActive,
    onDirectionChange: changeDirection,
    onTogglePause: togglePause,
    onStart: startGame,
  });

  const { handleTouchStart, handleTouchMove } = useTouchControls({
    gameActive: gameState.gameActive,
    gamePaused: gameState.gamePaused,
    onDirectionChange: changeDirection,
    onTogglePause: togglePause,
    onStart: startGame,
  });

  useGameRenderer(ctxRef, gameState);

  return (
    <div className={styles.gameContainer}>
      <GameHeader score={gameState.score} highScore={gameState.highScore} />
      
      <Canvas
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
        onCanvasReady={handleCanvasReady}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
      
      <GameControls
        onStart={startGame}
        gameActive={gameState.gameActive}
      />
      
      <GameInstructions />
      
      <GameOverScreen
        visible={!gameState.gameActive && gameState.score > 0}
        finalScore={gameState.score}
        onPlayAgain={startGame}
      />
    </div>
  );
};