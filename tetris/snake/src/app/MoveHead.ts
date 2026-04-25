import type { PointType, SnakeStateType } from './SnakeState';

export function MoveHead(state: SnakeStateType) {
  const headPosition: PointType = [...state.get('headPosition')];
  const moveSpeed = 1;
  switch (state.get('direction')) {
    case 'top':
      headPosition[1] -= moveSpeed;
      break;
    case 'right':
      headPosition[0] += moveSpeed;
      break;
    case 'bottom':
      headPosition[1] += moveSpeed;
      break;
    case 'left':
      headPosition[0] -= moveSpeed;
      break;
  }
  return state.set('headPosition', headPosition);
}
