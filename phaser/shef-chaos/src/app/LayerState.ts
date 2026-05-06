import { createId } from "@/app/Id";

export type DirectionType = "left" | "right" | "none" | "down" | "up";
export type PoseType = "stand" | "run" | "jump";
export type PointType = [number, number];
export type EventPositionType = { type: "position"; x: number; y: number };
export type EventVelocityType = { type: "velocity"; x: number; y: number };
export type EntityType = {
  id: string;
  type: EntityTypes;
  position: PointType;
  events: (EventPositionType | EventVelocityType)[];
  physical: boolean;
};
export type EntityTypes =
  | "player"
  | "box"
  | "mud"
  | "ground"
  | "trash-can"
  | "refregirator"
  | "tarakan"
  | "shelf"
  | "window"
  | "hood"
  | "spray";

const id = createId();

type CollisionEvent = {
  id: string;
  entityType: EntityTypes;
  time: number;
  targetPosition: PointType;
  entityPosition: PointType;
};

/**
 * Состояние уровня игры
 */
export function LayerState() {
  const height = 600;
  const state = {
    world: {
      width: 2400,
      height,
    },
    gameOver: false,
    player: {
      type: "player" as EntityTypes,
      health: 100,
      score: 0,
      position: [30, height - 560] as PointType,
      collisionEvents: [] as CollisionEvent[],
      lastCollision: 0,
    },
    entities: {} as Record<string, EntityType>,
  };

  addEntity(state.entities, "ground", 0, 0);
  addEntity(state.entities, "trash-can", 260, 120);
  addEntity(state.entities, "trash-can", 380, 200);
  addEntity(state.entities, "trash-can", 460, 160);
  addEntity(state.entities, "mud", 300, 320, false);
  addEntity(state.entities, "box", 300, 120);
  addEntity(state.entities, "box", 340, 120);
  addEntity(state.entities, "box", 380, 120);
  addEntity(state.entities, "box", 420, 120);
  addEntity(state.entities, "box", 460, 120);
  addEntity(state.entities, "box", 340, 160);
  addEntity(state.entities, "box", 380, 160);
  addEntity(state.entities, "box", 420, 160);
  addEntity(state.entities, "mud", 550, 290, false);
  addEntity(state.entities, "refregirator", 800, 200);
  addEntity(state.entities, "mud", 1000, 190, false);
  addEntity(state.entities, "box", 720, 120);
  addEntity(state.entities, "box", 720, 160);
  addEntity(state.entities, "box", 720, 200);
  addEntity(state.entities, "box", 720, 240);
  addEntity(state.entities, "box", 680, 120);
  addEntity(state.entities, "box", 680, 160);
  addEntity(state.entities, "box", 680, 200);
  addEntity(state.entities, "box", 640, 120);
  addEntity(state.entities, "box", 640, 160);
  addEntity(state.entities, "box", 600, 120);
  addEntity(state.entities, "trash-can", 790, 315);
  addEntity(state.entities, "shelf", 1330, 270);
  addEntity(state.entities, "shelf", 1530, 168);
  addEntity(state.entities, "shelf", 1570, 210);
  addEntity(state.entities, "shelf", 1590, 260);
  addEntity(state.entities, "shelf", 1450, 292);
  addEntity(state.entities, "hood", 1190, 292);
  addEntity(state.entities, "spray", 1190, 380, false);
  addEntity(state.entities, "window", 1260, 280);
  addEntity(state.entities, "tarakan", 1090, 120);
  addEntity(state.entities, "tarakan", 990, 120);
  addEntity(state.entities, "tarakan", 1190, 120);
  addEntity(state.entities, "tarakan", 1290, 120);
  addEntity(state.entities, "box", 1400, 120);
  addEntity(state.entities, "box", 1440, 120);
  addEntity(state.entities, "box", 1480, 120);

  return state;
}

export type LayerStateType = ReturnType<typeof LayerState>;
export type PlayerType = LayerStateType["player"];

function addEntity(
  entities: Record<string, EntityType>,
  type: EntityTypes,
  x: number,
  y: number,
  physical = true,
) {
  const theId = id(type);
  entities[theId] = {
    id: theId,
    position: [x, y],
    type,
    events: [],
    physical,
  };
}
