import type { DirectionType, SnakeStateType } from './SnakeState';

const backsides = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function KeyPress(state: SnakeStateType, direction: DirectionType) {
  const stateDirection = state.get('direction');
  const speed = state.get('speedMs');
  const now = Date.now();
  const lastChange = state.get('lastDirectionChangeTime');
  const earlyChange = (now - lastChange) < speed - 1;

  if (!earlyChange && direction === stateDirection) {
    return state.set('accelerationTime', Date.now());
  }

  if (
    earlyChange ||
    direction === undefined ||
    direction === stateDirection ||
    direction === backsides[stateDirection]
  ) {
    return state;
  }

  return state.withMutations(s => {
    s.set('direction', direction);
    s.set('lastDirectionChangeTime', Date.now());
  });
}
