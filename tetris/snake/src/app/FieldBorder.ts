import type { SnakeStateType } from './SnakeState';

export function FieldBorder(state: SnakeStateType) {
  const [maxX, maxY] = state.get('fieldSize');
  return {
    minX: 0,
    minY: 0,
    maxX: maxX - 1,
    maxY: maxY - 1,
  };
}
