import { LimitedStack } from "@/lib/LimitedStack";

export type DirectionType = "left" | "right" | "none" | "down" | "up";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EntityType = {
  type: EntityTypes;
  position: PointType;
  velocity: PointType;
  direction: DirectionType;
  touched: LimitedStack<DirectionType>;
  pose: LimitedStack<PoseType>;
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
    gameOver: false,
    entities: {
      ground: {
        type: "ground",
        direction: "none",
        touched: new LimitedStack(3, "none"),
        pose: new LimitedStack(4, "stand"),
        position: [0, 0],
        velocity: [0, 0],
        countCollision: false,
      },
      box1: {
        type: "box",
        direction: "none",
        touched: new LimitedStack(3, "none"),
        pose: new LimitedStack(4, "stand"),
        position: [300, 30],
        velocity: [0, 0],
        countCollision: true,
      },
      box2: {
        type: "box",
        direction: "none",
        touched: new LimitedStack(3, "none"),
        pose: new LimitedStack(4, "stand"),
        position: [400, 30],
        velocity: [0, 0],
        countCollision: true,
      },
      box3: {
        type: "box",
        direction: "none",
        touched: new LimitedStack(3, "none"),
        pose: new LimitedStack(4, "stand"),
        position: [600, 30],
        velocity: [0, 0],
        countCollision: true,
      },
      player: {
        type: "player",
        direction: "right",
        touched: new LimitedStack(3, "none"),
        pose: new LimitedStack(4, "stand"),
        position: [30, height - 160],
        velocity: [0, 0],
        collidedWith: new Set(),
        countCollision: false,
      },
    } as Record<string, EntityType>,
  };
}

export type LayerStateType = ReturnType<typeof LayerState>;
