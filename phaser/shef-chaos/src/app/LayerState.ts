import { LimitedStack } from "@/lib/LimitedStack";

export type DirectionType = "left" | "right" | "none" | "down" | "up";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EntityType = {
  type: EntityTypes;
  position: PointType;
};
export type EntityTypes = "player" | "box" | "ground" | "mud";

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
    gameOver: false,
    player: {
      type: "player" as EntityTypes,
      health: 100,
      score: 0,
      touched: new LimitedStack(3, "none"),
      position: [30, height - 160] as PointType,
      collidedWith: new Set(),
    },
    entities: {
      ground: {
        type: "ground",
        position: [0, 0],
      },
      mud1: {
        type: "mud",
        position: [260, 108],
      },
      box1: {
        type: "box",
        position: [300, 120],
      },
      box2: {
        type: "box",
        position: [400, 120],
      },
      box3: {
        type: "box",
        position: [600, 120],
      },
      box4: {
        type: "box",
        position: [800, 120],
      },
      box5: {
        type: "box",
        position: [1000, 120],
      },
    } as Record<string, EntityType>,
  };
}

export type LayerStateType = ReturnType<typeof LayerState>;
export type PlayerType = LayerStateType["player"];
