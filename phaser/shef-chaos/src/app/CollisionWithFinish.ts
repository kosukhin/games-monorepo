import { LastCollisionInGap } from "@/app/LastCollisionInGap";
import { LayerStateType } from "@/app/LayerState";

const lastEventGap = 500;
export function CollisionWithFinish(state: LayerStateType) {
  const collision = LastCollisionInGap(state, "finish", lastEventGap);
  if (collision) {
    state.gameState = "game-done";
  }

  return state;
}
