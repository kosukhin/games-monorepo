import type { SnakeStateType } from './SnakeState';

export function Difficulty(state: SnakeStateType) {
  const speed = state.get('speedMs');
  const tail = state.get('tailPoints').length;
  const maxSpeedThreshold = 150;
  const startLength = 6;
  const k1 = 1; // Вес скорости
  const k2 = 1; // Вес хвоста

  if (speed > maxSpeedThreshold) {
    return Math.floor(speed / 100);
  } else {
    const baseDifficulty = maxSpeedThreshold * k1;
    const tailContribution = (tail - startLength) * k2;

    return baseDifficulty + tailContribution;
  }
}
