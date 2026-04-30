export type DirectionType = "left" | "right" | "none";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EntityType = {
  type: EntityTypes;
  position: PointType;
  direction: DirectionType;
  pose: PoseType;
  collidedWith?: Set<string>;
  countCollision: boolean;
};
export type EntityTypes = "player" | "box" | "ground";

/**
 * Состояние уровня игры
 */
export function LayerState() {
  const height = 600;
  return {
    world: {
      width: 2400,
      height,
    },
    entities: {
      ground: {
        direction: "none",
        pose: "stand",
        position: [0, 0],
        type: "ground",
        countCollision: false,
      },
      box1: {
        direction: "none",
        pose: "stand",
        position: [300, 30],
        type: "box",
        countCollision: true,
      },
      player: {
        type: "player",
        direction: "right",
        pose: "stand",
        position: [30, height - 160],
        collidedWith: new Set(),
        countCollision: false,
      },
    } as Record<string, EntityType>,
  };
}

export type LayerStateType = ReturnType<typeof LayerState>;
