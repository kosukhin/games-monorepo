import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Box(id: string, scene: MainScene): PhaserEntityType {
  let box: any = null;
  return {
    id,
    type: "box",
    get phaserObject() {
      return box;
    },
    preload() {
      scene.load.image("box-skin", "assets/box.png");
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        const obstacleY = world.height - 60;
        box = scene.add.image(x, obstacleY, "box-skin");
        scene.physics.add.existing(box, true);

        return state;
      });
    },
  };
}
