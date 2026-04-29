import { Command } from 'silentium-loop';
import type { SnakeStateType } from './SnakeState';

export function Pause(state: SnakeStateType) {
  return Command(state.set('gameStep', 'pause'), {
    type: 'stop',
  });
}
