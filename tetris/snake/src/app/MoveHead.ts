import type { SnakeStateType } from './SnakeState';

export function MoveHead(state: SnakeStateType) {
  const headPosition = [...state.headPosition];
  switch (state.direction) {
    case 'top':
      headPosition[1] -= 1;
      break;
    case 'right':
      headPosition[0] += 1;
      break;
    case 'bottom':
      headPosition[1] += 1;
      break;
    case 'left':
      headPosition[0] -= 1;
      break;
  }
  return {
    ...state,
    headPosition,
  };
}
