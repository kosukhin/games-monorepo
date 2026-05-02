import { createId } from "@/app/Id";
import { LimitedStack } from "@/lib/LimitedStack";

export type DirectionType = "left" | "right" | "none" | "down" | "up";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EntityType = {
  type: EntityTypes;
  position: PointType;
};
export type EntityTypes = "player" | "box" | "ground" | "mud";

const BoxId = createId("box");
const MudId = createId("mud");

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
      [MudId()]: {
        type: "mud",
        position: [260, 108],
      },
      [MudId()]: {
        type: "mud",
        position: [380, 188],
      },
      [BoxId()]: {
        type: "box",
        position: [300, 120],
      },
      [BoxId()]: {
        type: "box",
        position: [340, 120],
      },
      [BoxId()]: {
        type: "box",
        position: [380, 120],
      },
      [BoxId()]: {
        type: "box",
        position: [420, 120],
      },
      [BoxId()]: {
        type: "box",
        position: [460, 120],
      },
      [BoxId()]: {
        type: "box",
        position: [340, 160],
      },
      [BoxId()]: {
        type: "box",
        position: [380, 160],
      },
      [BoxId()]: {
        type: "box",
        position: [420, 160],
      },
    } as Record<string, EntityType>,
  };
}

export type LayerStateType = ReturnType<typeof LayerState>;
export type PlayerType = LayerStateType["player"];
