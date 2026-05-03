import { LayerStateType, PlayerType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function CollisionWithMud(
  state: LayerStateType,
  collidedId: string,
  player: PlayerType,
) {
  const collidedEntity = state.entities[collidedId];

  if (collidedEntity.type !== "mud") {
    return state;
  }

  if (
    player.touched.diagram(2) === "down-right" ||
    player.touched.diagram(2) === "down-left"
  ) {
    state.player.health -= 10;
    return Command(state, {
      type: "player-blink",
    });
  }

  if (player.touched.diagram(2) === "none-down") {
    state.player.score += 1;
    return Command(state, {
      type: "remove-entity",
      args: [collidedId],
    });
  }

  return state;
}
