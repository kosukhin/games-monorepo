import { LayerStateType, PlayerType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function CollisionWithTarakan(
  state: LayerStateType,
  collidedId: string,
  player: PlayerType,
) {
  const collidedEntity = state.entities[collidedId];

  if (collidedEntity.type !== "tarakan") {
    return state;
  }

  if (
    player.touched.diagram(2) === "down-right" ||
    player.touched.diagram(2) === "down-left"
  ) {
    state.player.health -= 10;
    return Command(state, {
      type: "player-hit",
    });
  }

  if (player.touched.diagram(2) === "none-down") {
    state.player.health -= 20;
    return Command(state, {
      type: "player-hit",
    });
  }

  return state;
}
