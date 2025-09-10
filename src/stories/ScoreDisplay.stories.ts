import type { Meta, StoryObj } from '@storybook/react';
import { ScoreDisplay } from '../components/molecules/ScoreDisplay';

const meta: Meta<typeof ScoreDisplay> = {
  title: 'Molecules/ScoreDisplay',
  component: ScoreDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    score: 15,
    highScore: 42,
  },
};

export const NewHighScore: Story = {
  args: {
    score: 100,
    highScore: 100,
  },
};

export const Zero: Story = {
  args: {
    score: 0,
    highScore: 25,
  },
};