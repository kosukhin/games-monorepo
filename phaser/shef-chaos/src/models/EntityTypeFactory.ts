import { EntityType, EntityTypes } from "@/app/LayerState";
import { Box } from "@/models/Box";
import { Player } from "@/models/Player";
import invariant from "tiny-invariant";

export type PhaserEntityType = {
  preload?: () => void;
  create?: () => void;
  update?: () => void;
};

const typeToFactory: Record<EntityTypes, (e: EntityType) => PhaserEntityType> =
  {
    box: Box,
    player: Player,
  };

export function EntityTypeFactory(entity: EntityType) {
  invariant(
    typeToFactory[entity.type] !== undefined,
    `Entity with type ${entity.type} unregistered!`,
  );
  return typeToFactory[entity.type](entity);
}
