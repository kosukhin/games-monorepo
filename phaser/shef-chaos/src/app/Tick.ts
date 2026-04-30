import { LayerStateType } from "@/app/LayerState";

export function Tick(state: LayerStateType) {
  const player = state.entities.player;

  if (player.collidedWith?.size) {
    if (player.pose === "run") {
      console.log("hit player");
    }
    if (player.pose === "jump" || player.pose === "stand") {
      console.log("kill entity");
    }
    console.log("handdle collision");
    player.collidedWith.clear();
  }

  return state;
}
