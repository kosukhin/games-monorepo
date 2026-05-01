import { LayerStateType, PlayerType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function CollisionWithBox(
  state: LayerStateType,
  collidedId: string,
  player: PlayerType,
) {
  const collidedEntity = state.entities[collidedId];

  if (collidedEntity.type !== "box") {
    return state;
  }

  if (
    player.touched.diagram(2) === "down-right" ||
    player.touched.diagram(2) === "down-left"
  ) {
    console.log("hit player");
    state.player.health -= 10;
  }

  if (player.touched.diagram(3) === "none-none-down") {
    console.log("kill entity", collidedId);
    state.player.score += 1;
    return Command(state, {
      type: "remove-entity",
      args: [collidedId],
    });
  }

  return state;
}
