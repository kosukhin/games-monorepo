import { EntityTypes, LayerStateType } from "@/app/LayerState";
import { Command } from "silentium-loop";

export function ScorePlayer(state: LayerStateType, entityType: EntityTypes) {
  let score = 0;
  if (entityType === "trash-can") {
    score = 1;
  }
  if (entityType === "mud") {
    score = 2;
  }
  if (entityType === "tarakan") {
    score = 3;
  }
  state.player.score += score;
  return Command(state, {
    type: "player-scored",
  });
}
