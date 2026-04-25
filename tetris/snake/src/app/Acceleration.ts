import type { SnakeStateType } from './SnakeState';

const accelerationDuration = 50;

export function Acceleration(state: SnakeStateType, speed: number) {
  const now = Date.now();
  const accelerationTime = state.get('accelerationTime');
  if (now - accelerationTime < accelerationDuration) {
    return Math.ceil(speed / 2);
  }
  return speed;
}
