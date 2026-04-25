import { Action } from './Action';
import type { SnakeStateType } from './SnakeState';

export function Pause(state: SnakeStateType) {
  console.log('Paused');
  return Action(state.set('gameStep', 'pause'), {
    type: 'stop',
  });
}
