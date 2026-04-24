import type { SnakeStateType } from './SnakeState';

export function MoveTail(state: SnakeStateType) {
    const tailPoints: [number, number][] = [];
    Array.from(state.tailPoints.keys()).forEach((index) => {
        if (index === 0) {
            tailPoints.push([...state.headPosition]);
            return
        }
        tailPoints.push([...state.tailPoints[index -1]])
    })
  return {
    ...state,
    tailPoints
  };
}
