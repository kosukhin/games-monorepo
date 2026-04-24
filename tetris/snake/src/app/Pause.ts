import type { SnakeStateType } from './SnakeState';

export function Pause(state: SnakeStateType) {
  return {
    ...state,
    gameStep: 'pause',
  } as SnakeStateType;
}
