import type { DirectionType, SnakeStateType } from './SnakeState';

const directionToKeyMap: Record<string, DirectionType> = {
  w: 'top',
  d: 'right',
  s: 'bottom',
  a: 'left',
};

const backsides = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function KeyPress(state: SnakeStateType, e: KeyboardEvent) {
  const direction = directionToKeyMap[e.key];
  const stateDirection = state.get('direction');
  if (
    direction === undefined ||
    direction === stateDirection ||
    direction === backsides[stateDirection]
  ) {
    return state;
  }
  return state.set('direction', direction);
}
