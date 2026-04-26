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
    level: 0,
    score: 0, // How long is our tail
    timeSpentSeconds: 0, // How long we play
    lastDirectionChangeTime: 0, // Timestamp of last direction change
    speedMs: 600, // With which speed game works
    direction: 'right' as DirectionType, // Direction of our movement
    fieldSize: [20, 20] as PointType, // Size of game field
    headPosition: [2, 0] as PointType, // Position of main point
    tailPoints: [
      [1, 0],
      [0, 0],
    ] as PointType[],
    targetPosition: [0, 0] as PointType, // Position of target point
    gameStep: 'initialization' as GameStepType, // Current game step
    actions: [] as ActionsType, // Queue of actions
    gameOverReason: '',
    accelerationTime: 0, // Timestamp of last acceleration
  });
}

export type SnakeStateType = ReturnType<typeof SnakeState>;
