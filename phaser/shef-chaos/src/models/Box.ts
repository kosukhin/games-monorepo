import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Box(id: string, scene: MainScene): PhaserEntityType {
  let box: any = null;
  return {
    type: "box",
    get phaserObject() {
      return box;
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        box = scene.physics.add.staticGroup();
        const obstacleY = world.height - 60;
        const obs = scene.add.rectangle(x, obstacleY, 40, 40, 0x00ff00);
        scene.physics.add.existing(obs, true);

        return state;
      });
    },
  };
}
