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
  if (
    direction === undefined ||
    direction === state.direction ||
    direction === backsides[state.direction]
  ) {
    return state;
  }
  return {
    ...state,
    direction,
  };
}
