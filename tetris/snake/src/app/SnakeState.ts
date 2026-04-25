import { Map } from 'immutable';
import type { ActionsType } from './Action';

export type DirectionType = 'top' | 'right' | 'bottom' | 'left';

export type GameStepType = 'initialization' | 'running' | 'pause' | 'game-over';

export type PointType = [number, number];

/**
 * Initial game state
 */
export function SnakeState() {
  return Map({
    score: 0, // How long is our tail
    timeSpentSeconds: 0, // How long we play
    speedMs: 1000, // With which speed game works
    direction: 'right' as DirectionType, // Direction of our movement
    fieldSize: [10, 10] as PointType, // Size of game field
    headPosition: [2, 0] as PointType, // Position of main point
    tailPoints: [
      [1, 0],
      [0, 0],
    ] as PointType[],
    targetPosition: [0, 0] as PointType, // Position of target point
    gameStep: 'initialization' as GameStepType, // Current game step
    actions: [] as ActionsType, // Queue of actions
  });
}

export type SnakeStateType = ReturnType<typeof SnakeState>;
type UnboxMapOf<T> = T extends Immutable.MapOf<infer V> ? V : never;
export type SnakeStateDataType = UnboxMapOf<SnakeStateType>;
