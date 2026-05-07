import { LayerStateType } from "@/app/LayerState";

export function GameOverGuard(state: LayerStateType) {
  if (state.player.health <= 0) {
    state.gameState = "game-over";
  }
  return state;
}
