import type { PointType, SnakeStateType } from './SnakeState';

export function Collision(state: SnakeStateType) {
  if (pointsCollision(state.targetPosition, state.headPosition)) {
    return {
      ...state,
      score: state.score + 1,
      targetPosition: randomPoint(...state.fieldSize),
      tailPoints: [...state.tailPoints, [...state.tailPoints.at(-1) ?? [0, 0]]],
      speedMs: state.speedMs >= 150 ? state.speedMs - 50 : state.speedMs
    } as SnakeStateType;
  }
  return state;
}

function pointsCollision(p1: PointType, p2: PointType) {
  return p1[0] === p2[0] && p1[1] === p2[1];
}

function randomPoint(maxX: number, maxY: number) {
    return [Math.round(Math.random() * maxX), Math.round(Math.random() * maxY)];
}
