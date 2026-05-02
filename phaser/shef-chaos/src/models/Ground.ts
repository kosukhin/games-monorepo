import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Ground(id: string, scene: MainScene): PhaserEntityType {
  let ground: any = null;
  return {
    id,
    type: "ground",
    get phaserObject() {
      return ground;
    },
    create() {
      dispatch((state: LayerStateType) => {
        ground = scene.add.rectangle(
          state.world.width / 2,
          state.world.height - 20,
          state.world.width,
          160,
          0xdbd9df,
        );
        scene.physics.add.existing(ground, true);
        return state;
      });
    },
  };
}
