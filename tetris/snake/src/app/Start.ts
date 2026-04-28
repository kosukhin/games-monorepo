import { Main } from './Main';
import { KeyPress } from './KeyPress';
import type { SnakeStateType } from './SnakeState';
import { Timer } from './Timer';
import { Target } from './Target';
import { BatchCommand, Command } from '../store';

export function Start(state: SnakeStateType) {
  const gameStep = state.get('gameStep');
  if (gameStep === 'game-over' || state.get('gameOverReason')) {
    return Command(state, {
      type: 'notify',
      args: ['Game is over!'],
    });
  }

  if (gameStep !== 'initialization' && gameStep !== 'pause') {
    return Command(state, {
      type: 'notify',
      args: ['Game was started already!'],
    });
  }

  console.log('Start');
  return BatchCommand(
    state.withMutations(s => {
      s.set('gameStep', 'running');
      if (gameStep !== 'pause') {
        s.set(
          'targetPosition',
          Target(s.get('fieldSize'), s.get('headPosition'), s.get('tailPoints')),
        );
      }
    }),
    [
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
    ],
  );
}
