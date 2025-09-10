import { Text } from '../../atoms/Text';
import styles from './GameInstructions.module.css';

export const GameInstructions: React.FC = () => {
  return (
    <div className={styles.gameInstructions}>
      <h2>操作方法</h2>
      <Text variant="instruction">矢印キー: 蛇を上下左右に動かす</Text>
      <Text variant="instruction">スペースキー: 一時停止/再開</Text>
    </div>
  );
};