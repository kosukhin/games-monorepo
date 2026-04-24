import { Action } from './Action';
import { Collision } from './Collision';
import { MoveHead } from './MoveHead';
import { MoveTail } from './MoveTail';
import type { SnakeStateType } from './SnakeState';
import pipe from 'lodash/fp/pipe';

export function App(state: SnakeStateType) {
  if (state.gameStep !== 'running') {
    return Action(state, { type: 'stop' });
  }

  console.log('APP: Game loop works!');

  const nextStep = pipe(MoveTail, MoveHead, Collision);

  return Action(nextStep(state), {
    type: 'timeout',
    args: [state.speedMs],
    next: App,
  });
}
