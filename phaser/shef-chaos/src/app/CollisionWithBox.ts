import { EntityType, LayerStateType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function CollisionWithBox(
  state: LayerStateType,
  collidedId: string,
  player: EntityType,
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
    state.gameOver = true;
    return Command(state, {
      type: "remove-entity",
      args: ["player"],
    });
  }
  if (player.touched.diagram(3) === "none-none-down") {
    console.log("kill entity", collidedId);
    return Command(state, {
      type: "remove-entity",
      args: [collidedId],
    });
  }

  return state;
}
