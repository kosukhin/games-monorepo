import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Refregirator(id: string, scene: MainScene): PhaserEntityType {
  let refregirator: any = null;
  return {
    id,
    type: "refregirator",
    get phaserObject() {
      return refregirator;
    },
    preload() {
      scene.load.image("refregirator-skin", "assets/refregirator.png");
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        const obstacleY = world.height - e.position[1];
        refregirator = scene.add.image(x, obstacleY, "refregirator-skin");
        scene.physics.add.existing(refregirator, true);

        return state;
      });
    },
  };
}
