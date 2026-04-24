export type DirectionType = 'top' | 'right' | 'bottom' | 'left';

export type GameStepType = 'initialization' | 'running' | 'pause' | 'game-over';

/**
 * Initial game state
 */
export function SnakeState() {
  return {
    score: 0, // How long is our tail
    speedMs: 1000, // With which speed game works
    direction: 'bottom' as DirectionType, // Direction of our movement
    fieldSize: [10, 10], // Size of game field
    headPosition: [0, 0], // Position of main point
    targetPosition: [0, 0], // Position of target point
    gameStep: 'initialization' as GameStepType, // Current game step
    actions: [], // Queue of actions
  };
}

export type SnakeStateType = ReturnType<typeof SnakeState>;
