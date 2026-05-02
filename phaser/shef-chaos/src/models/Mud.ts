import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Mud(id: string, scene: MainScene): PhaserEntityType {
  let mud: any = null;
  return {
    id,
    type: "mud",
    get phaserObject() {
      return mud;
    },
    preload() {
      scene.load.image("mud-skin", "assets/mud.png");
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        const obstacleY = world.height - e.position[1];
        mud = scene.add.image(x, obstacleY, "mud-skin");
        scene.physics.add.existing(mud, true);

        return state;
      });
    },
  };
}
