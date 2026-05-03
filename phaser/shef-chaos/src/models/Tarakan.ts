import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Tarakan(id: string, scene: MainScene): PhaserEntityType {
  let tarakan: any = null;
  return {
    id,
    type: "tarakan",
    get phaserObject() {
      return tarakan;
    },
    preload() {
      scene.load.image("tarakan-skin", "assets/tarakan.png");
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        const obstacleY = world.height - e.position[1];
        tarakan = scene.add.image(x, obstacleY, "tarakan-skin");
        scene.physics.add.existing(tarakan, true);

        return state;
      });
    },
  };
}
