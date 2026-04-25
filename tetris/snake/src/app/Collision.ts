import type { PointType, SnakeStateType } from './SnakeState';

export function Collision(state: SnakeStateType) {
  if (pointsCollision(state.get('targetPosition'), state.get('headPosition'))) {
    return state.withMutations(theState => {
      theState.set('score', theState.get('score') + 1);
      theState.set('targetPosition', randomPoint(...theState.get('fieldSize')));
      const tailPoints = theState.get('tailPoints');
      theState.set('tailPoints', [...tailPoints, [...(tailPoints.at(-1) ?? [0, 0])]]);
      const speed = theState.get('speedMs');
      theState.set('speedMs', speed >= 150 ? speed - 50 : speed);
    });
  }
  return state;
}

function pointsCollision(p1: PointType, p2: PointType) {
  return p1[0] === p2[0] && p1[1] === p2[1];
}

function randomPoint(maxX: number, maxY: number): PointType {
  return [Math.round(Math.random() * maxX), Math.round(Math.random() * maxY)];
}
