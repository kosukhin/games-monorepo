import type { SnakeStateType } from './SnakeState';

export function MoveTail(state: SnakeStateType) {
  const tailPoints: [number, number][] = [];
  const stateTailPoints = state.get('tailPoints');
  Array.from(state.get('tailPoints').keys()).forEach(index => {
    if (index === 0) {
      tailPoints.push([...state.get('headPosition')]);
      return;
    }
    tailPoints.push([...stateTailPoints[index - 1]]);
  });
  return state.set('tailPoints', tailPoints);
}
