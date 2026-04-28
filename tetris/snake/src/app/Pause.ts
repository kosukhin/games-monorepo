import { Command } from '../store';
import type { SnakeStateType } from './SnakeState';

export function Pause(state: SnakeStateType) {
  console.log('Paused');
  return Command(state.set('gameStep', 'pause'), {
    type: 'stop',
  });
}
