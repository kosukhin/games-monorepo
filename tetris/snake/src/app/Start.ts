import { Action } from './Action';
import { Main } from './Main';
import { KeyPress } from './KeyPress';
import type { SnakeStateType } from './SnakeState';
import { Timer } from './Timer';

export function Start(state: SnakeStateType) {
  if (state.get('gameStep') === 'running') {
    return Action(state, {
      type: 'notify',
      args: ['Game already runs!'],
    });
  }

  console.log('Start');
  return Action(state.set('gameStep', 'running'), [
    {
      type: 'start',
      args: [KeyPress],
    },
    {
      type: 'timeout',
      next: Main,
    },
    {
      type: 'timeout',
      next: Timer,
    },
  ]);
}
