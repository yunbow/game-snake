import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components/atoms/Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['title', 'score', 'instruction', 'gameOver'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
  args: {
    children: 'スネークゲーム',
    variant: 'title',
  },
};

export const Score: Story = {
  args: {
    children: 'スコア: 50',
    variant: 'score',
  },
};

export const Instruction: Story = {
  args: {
    children: '矢印キー: 蛇を上下左右に動かす',
    variant: 'instruction',
  },
};

export const GameOver: Story = {
  args: {
    children: 'ゲームオーバー',
    variant: 'gameOver',
  },
};