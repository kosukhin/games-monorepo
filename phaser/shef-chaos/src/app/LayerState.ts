export type DirectionType = "left" | "right" | "none";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EntityType = {
  id: number;
  type: EntityTypes;
  position: PointType;
  direction: DirectionType;
  pose: PoseType;
};
export type EntityTypes = "player" | "box" | "ground";

/**
 * Состояние уровня игры
 */
export function LayerState() {
  return {
    world: {
      width: 2400,
      height: 600,
    },
    player: {
      id: 1,
      type: "player",
      direction: "right",
      pose: "stand",
      position: [0, 0],
    } as EntityType,
    entities: [
      {
        id: 2,
        direction: "none",
        pose: "stand",
        position: [0, 0],
        type: "ground",
      },
      {
        id: 3,
        direction: "left",
        pose: "stand",
        position: [0, 30],
        type: "box",
      },
    ] as EntityType[],
  };
}

export type LayerStateType = ReturnType<typeof LayerState>;
