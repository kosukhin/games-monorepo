import { Action } from './Action';
import { App } from './App';
import { KeyPress } from './KeyPress';
import type { SnakeStateType } from './SnakeState';
import { Timer } from './Timer';

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
        args: [KeyPress],
      },
      {
        type: 'timeout',
        next: App,
      },
      {
        type: 'timeout',
        next: Timer,
      },
    ],
  );
}
