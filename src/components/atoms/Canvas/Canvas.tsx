import { useRef, useEffect } from 'react';
import styles from './Canvas.module.css';

interface CanvasProps {
  width: number;
  height: number;
  onCanvasReady: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  onCanvasReady,
  onTouchStart,
  onTouchMove,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        onCanvasReady(canvas, ctx);
      }
    }
  }, [onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={width}
      height={height}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    />
  );
};