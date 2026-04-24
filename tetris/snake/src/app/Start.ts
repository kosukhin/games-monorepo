import { Action } from './Action';
import { App } from './App';
import type { SnakeStateType } from './SnakeState';

export function Start(state: SnakeStateType) {
  if (state.gameStep === 'running') {
    return Action(state, {
      type: 'notify',
      args: ['Game already runs!'],
    });
  }

  return Action(
    {
      ...state,
      gameStep: 'running',
    } as SnakeStateType,
    {
      type: 'timeout',
      args: [state.speedMs],
      next: App,
    },
  );
}
