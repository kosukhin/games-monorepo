import type { SnakeStateType } from './SnakeState';

export function Pause(state: SnakeStateType) {
  console.log('Paused');
  return {
    ...state,
    gameStep: 'pause',
  } as SnakeStateType;
}
