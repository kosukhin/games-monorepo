import { LayerStateType } from "@/app/LayerState";

export function CollisionsClean(state: LayerStateType) {
  state.player.collisionEvents.length = 0;
  return state;
}
