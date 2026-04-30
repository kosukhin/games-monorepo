import { LayerStateType } from "@/app/LayerState";

export function Tick(state: LayerStateType) {
  const player = state.entities.player;

  if (player.collidedWith?.size) {
    if (
      player.touched.diagram(2) === "down-right" ||
      player.touched.diagram(2) === "down-left"
    ) {
      console.log("hit player");
    }
    if (player.touched.diagram(3) === "none-none-down") {
      console.log("kill entity");
    }
    player.collidedWith.clear();
  }

  return state;
}
