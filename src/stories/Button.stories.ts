import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/atoms/Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'ゲームスタート',
    onClick: () => console.log('Primary button clicked'),
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'リスタート',
    onClick: () => console.log('Secondary button clicked'),
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    onClick: () => console.log('Disabled button clicked'),
    disabled: true,
  },
};