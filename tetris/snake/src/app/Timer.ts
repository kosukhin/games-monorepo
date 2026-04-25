import { Action } from './Action';
import type { SnakeStateType } from './SnakeState';

export function Timer(state: SnakeStateType) {
  if (state.get('gameStep') !== 'running') {
    return state;
  }
  return Action(
    state.update('timeSpentSeconds', t => t + 1),
    {
      type: 'timeout',
      args: [1000],
      next: Timer,
    },
  );
}
