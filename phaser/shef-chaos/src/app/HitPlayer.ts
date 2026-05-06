import { DirectionType, EntityTypes, LayerStateType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function HitPlayer(
  state: LayerStateType,
  entityType: EntityTypes,
  direction: DirectionType,
) {
  let damage = 0;
  if (entityType === "tarakan") {
    damage = direction === "up" ? 20 : 10;
  }
  if (entityType === "trash-can") {
    damage = 10;
  }
  state.player.health -= damage;
  if (state.player.health < 0) {
    state.player.health = 0;
  }
  return Command(state, {
    type: "player-hit",
  });
}
