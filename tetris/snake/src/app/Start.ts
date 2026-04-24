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

  console.log('Start');
  return Action(
    {
      ...state,
      gameStep: 'running',
    } as SnakeStateType,
    [
      {
        type: 'start',
      },
      {
        type: 'timeout',
        next: App,
      },
    ],
  );
}
