import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import styles from './GameOverScreen.module.css';

interface GameOverScreenProps {
  visible: boolean;
  finalScore: number;
  onPlayAgain: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  visible,
  finalScore,
  onPlayAgain,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.gameOver}>
      <Text variant="gameOver">ゲームオーバー</Text>
      <Text variant="score">スコア: {finalScore}</Text>
      <Button onClick={onPlayAgain} variant="primary">
        もう一度プレイ
      </Button>
    </div>
  );
};