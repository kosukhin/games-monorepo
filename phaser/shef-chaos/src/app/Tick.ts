import { LayerStateType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function Tick(state: LayerStateType) {
  const player = state.entities.player;

  if (player.collidedWith?.size) {
    if (
      player.touched.diagram(2) === "down-right" ||
      player.touched.diagram(2) === "down-left"
    ) {
      console.log("hit player");
      state.gameOver = true;
      return Command(state, {
        type: "remove-entity",
        args: ["player"],
      });
    }
    if (player.touched.diagram(3) === "none-none-down") {
      const id = player.collidedWith.values().next().value;
      console.log("kill entity", id);
      return Command(state, {
        type: "remove-entity",
        args: [id],
      });
    }
    player.collidedWith.clear();
  }

  return state;
}
