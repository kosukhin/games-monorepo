import { EntityType, EntityTypes } from "@/app/LayerState";
import { Box } from "@/models/Box";
import { Ground } from "@/models/Ground";
import { Mud } from "@/models/Mud";
import { Player } from "@/models/Player";
import { Refregirator } from "@/models/Refregirator";
import { Tarakan } from "@/models/Tarakan";
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
  mud: Mud,
  refregirator: Refregirator,
  tarakan: Tarakan,
};

export function EntityTypeFactory(
  id: string,
  entity: EntityType,
  scene: MainScene,
) {
  invariant(
    typeToFactory[entity.type] !== undefined,
    `Entity with type ${entity.type} is unregistered!`,
  );
  return typeToFactory[entity.type](id, scene);
}
