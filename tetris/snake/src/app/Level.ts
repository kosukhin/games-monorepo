import type { SnakeStateType } from './SnakeState';

const startSpeed = 600;
const tailLevelStep = 3;

export function Level(state: SnakeStateType) {
  let level = state.get('level');
  const speed = state.get('speedMs');
  const stableLevel = Math.ceil((startSpeed - speed) / 100);
  if (speed > 100) {
    level = stableLevel;
  } else {
    const tailLength = state.get('tailPoints').length;
    level = stableLevel + Math.ceil(tailLength / tailLevelStep);
  }
  return state.set('level', level);
}
