import { Text } from '../../atoms/Text';
import { ScoreDisplay } from '../ScoreDisplay';
import styles from './GameHeader.module.css';

interface GameHeaderProps {
  score: number;
  highScore: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, highScore }) => {
  return (
    <div className={styles.gameHeader}>
      <Text variant="title">スネークゲーム</Text>
      <ScoreDisplay score={score} highScore={highScore} />
    </div>
  );
};