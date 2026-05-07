import { EntityTypes, LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function BaseModel(
  id: string,
  scene: MainScene,
  type: EntityTypes,
  skin: string,
): PhaserEntityType {
  let phaserEntity: any = null;
  const skinName = type + "-skin";
  return {
    id,
    type,
    get phaserObject() {
      return phaserEntity;
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
        phaserEntity = scene.add.image(x, obstacleY, skinName);
        if (e.body !== "physical" && phaserEntity.body) {
          phaserEntity.body.setAllowGravity(false);
        }
        scene.physics.add.existing(phaserEntity, true);

        return state;
      });
    },
  };
}
