import { Command } from 'silentium-loop';
import { Acceleration } from './Acceleration';
import { Collision } from './Collision';
import { Level } from './Level';
import { MoveHead } from './MoveHead';
import { MoveTail } from './MoveTail';
import type { SnakeStateType } from './SnakeState';
import { pipe } from 'lodash/fp';

export function Main(state: SnakeStateType) {
  if (state.get('gameStep') !== 'running') {
    return Command(state, { type: 'stop' });
  }

  const nextStep = pipe(MoveTail, MoveHead, Collision, Level);

  return Command(nextStep(state), {
    type: 'timeout',
    args: [Acceleration(state, state.get('speedMs'))],
    next: Main,
  });
}
