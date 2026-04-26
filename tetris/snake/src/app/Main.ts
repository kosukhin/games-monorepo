import { Acceleration } from './Acceleration';
import { Action } from './Action';
import { Collision } from './Collision';
import { Level } from './Level';
import { MoveHead } from './MoveHead';
import { MoveTail } from './MoveTail';
import type { SnakeStateType } from './SnakeState';
import pipe from 'lodash/fp/pipe';

export function Main(state: SnakeStateType) {
  if (state.get('gameStep') !== 'running') {
    return Action(state, { type: 'stop' });
  }

  console.log('APP: Game loop works!');
  const nextStep = pipe(MoveTail, MoveHead, Collision, Level);

  return Action(nextStep(state), {
    type: 'timeout',
    args: [Acceleration(state, state.get('speedMs'))],
    next: Main,
  });
}
