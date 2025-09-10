import type { Meta, StoryObj } from '@storybook/react';
import { SnakeGame } from '../components/organisms/SnakeGame';

const meta: Meta<typeof SnakeGame> = {
  title: 'Organisms/SnakeGame',
  component: SnakeGame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};