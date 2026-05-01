import { LimitedStack } from "@/lib/LimitedStack";

export type DirectionType = "left" | "right" | "none" | "down" | "up";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EntityType = {
  type: EntityTypes;
  position: PointType;
  touched: LimitedStack<DirectionType>;
  collidedWith?: Set<string>;
  health?: number;
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
    gameOver: false,
    entities: {
      ground: {
        type: "ground",
        position: [0, 0],
        touched: new LimitedStack(3, "none"),
      },
      box1: {
        type: "box",
        position: [300, 30],
        touched: new LimitedStack(3, "none"),
      },
      box2: {
        type: "box",
        touched: new LimitedStack(3, "none"),
        position: [400, 30],
      },
      box3: {
        type: "box",
        touched: new LimitedStack(3, "none"),
        position: [600, 30],
      },
      player: {
        type: "player",
        touched: new LimitedStack(3, "none"),
        position: [30, height - 160],
        collidedWith: new Set(),
      },
    } as Record<string, EntityType>,
  };
}

export type LayerStateType = ReturnType<typeof LayerState>;
