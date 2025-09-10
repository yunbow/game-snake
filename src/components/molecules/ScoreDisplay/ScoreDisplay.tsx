import { Text } from '../../atoms/Text';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, highScore }) => {
  return (
    <div className={styles.scoreContainer}>
      <Text variant="score">スコア: <span>{score}</span></Text>
      <Text variant="score">ハイスコア: <span>{highScore}</span></Text>
    </div>
  );
};