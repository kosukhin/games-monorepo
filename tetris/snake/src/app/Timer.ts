import { Action } from './Action';
import type { SnakeStateType } from './SnakeState';

export function Timer(state: SnakeStateType) {
  if (state.gameStep !== 'running') {
    return state;
  }
  return Action(
    {
      ...state,
      timeSpentSeconds: state.timeSpentSeconds + 1,
    } as SnakeStateType,
    {
      type: 'timeout',
      args: [1000],
      next: Timer,
    },
  );
}
