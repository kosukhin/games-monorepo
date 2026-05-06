import { EntityType, EntityTypes } from "@/app/LayerState";
import { Box } from "@/models/Box";
import { Ground } from "@/models/Ground";
import { Hood } from "@/models/Hood";
import { Mud } from "@/models/Mud";
import { Player } from "@/models/Player";
import { Rat } from "@/models/Rat";
import { Refregirator } from "@/models/Refregirator";
import { Shelf } from "@/models/Shelf";
import { Spray } from "@/models/Spray";
import { Tarakan } from "@/models/Tarakan";
import { TrashCan } from "@/models/TrashCan";
import { Window } from "@/models/Window";
import MainScene from "@/scenes/MainScene";
import invariant from "tiny-invariant";

export type PhaserEntityType = {
  id: string;
  type: EntityTypes;
  phaserObject: any;
  preload?: () => void;
  create?: () => void;
  update?: () => void;
  gameOver?: () => void;
};

type EntityFactory = (id: string, scene: MainScene) => PhaserEntityType;

const typeToFactory: Record<EntityTypes, EntityFactory> = {
  box: Box,
  player: Player,
  ground: Ground,
  "trash-can": TrashCan,
  refregirator: Refregirator,
  tarakan: Tarakan,
  mud: Mud,
  shelf: Shelf,
  window: Window,
  hood: Hood,
  spray: Spray,
  rat: Rat,
};

export function createEntity(id: string, entity: EntityType, scene: MainScene) {
  invariant(
    typeToFactory[entity.type] !== undefined,
    `Entity with type ${entity.type} is unregistered!`,
  );
  return typeToFactory[entity.type](id, scene);
}
