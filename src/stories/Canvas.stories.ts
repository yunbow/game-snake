import type { Meta, StoryObj } from '@storybook/react';
import { Canvas } from '../components/atoms/Canvas';
import { GAME_CONFIG, COLORS } from '../Config';

const meta: Meta<typeof Canvas> = {
  title: 'Atoms/Canvas',
  component: Canvas,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: GAME_CONFIG.CANVAS_WIDTH,
    height: GAME_CONFIG.CANVAS_HEIGHT,
    onCanvasReady: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = COLORS.BACKGROUND;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = COLORS.SNAKE_HEAD;
      ctx.fillRect(200, 200, 20, 20);
      
      ctx.fillStyle = COLORS.FOOD;
      ctx.fillRect(100, 100, 20, 20);
    },
  },
};