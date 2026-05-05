import { EntityTypes, LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function BaseModel(
  id: string,
  scene: MainScene,
  type: EntityTypes,
  skin: string,
): PhaserEntityType {
  let entity: any = null;
  const skinName = type + "-skin";
  return {
    id,
    type,
    get phaserObject() {
      return entity;
    },
    preload() {
      scene.load.image(skinName, skin);
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        const obstacleY = world.height - e.position[1];
        entity = scene.add.image(x, obstacleY, skinName);
        scene.physics.add.existing(entity, true);

        return state;
      });
    },
  };
}
