import { Button } from '../../atoms/Button';
import styles from './GameControls.module.css';

interface GameControlsProps {
  onStart: () => void;
  gameActive: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onStart,
  gameActive,
}) => {
  return (
    <div className={styles.controls}>
      <Button onClick={onStart} disabled={gameActive}>
        ゲームスタート
      </Button>
    </div>
  );
};