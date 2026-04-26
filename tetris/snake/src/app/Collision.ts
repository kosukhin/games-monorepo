import type { PointType, SnakeStateType } from './SnakeState';
import { Target } from './Target';

export function Collision(state: SnakeStateType) {
  const head = state.get('headPosition');
  if (pointsCollision(state.get('targetPosition'), head)) {
    return state.withMutations(theState => {
      theState.set('score', theState.get('score') + 1);
      theState.set(
        'targetPosition',
        Target(theState.get('fieldSize'), theState.get('headPosition'), theState.get('tailPoints')),
      );
      const tailPoints = theState.get('tailPoints');
      theState.set('tailPoints', [...tailPoints, [...(tailPoints.at(-1) ?? [0, 0])]]);
      const speed = theState.get('speedMs');
      theState.set('speedMs', speed >= 150 ? speed - 50 : speed);
    });
  }
  const minX = 0;
  const minY = 0;
  const [maxX, maxY] = state.get('fieldSize');
  const [headX, headY] = state.get('headPosition');
  if (headX < minX || headY < minY || headX > maxX - 1 || headY > maxY - 1) {
    return state.withMutations(s => {
      s.set('gameStep', 'game-over');
      s.set('gameOverReason', 'Border collision');
    });
  }
  const tail = state.get('tailPoints');
  const collisionWithTail = tail.some(p => pointsCollision(p, head));
  if (collisionWithTail) {
    return state.withMutations(s => {
      s.set('gameStep', 'game-over');
      s.set('gameOverReason', 'Tail collision');
    });
  }
  return state;
}

function pointsCollision(p1: PointType, p2: PointType) {
  return p1[0] === p2[0] && p1[1] === p2[1];
}
