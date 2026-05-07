import { LayerStateType } from "@/app/LayerState";

export function LastCollisionHandled(state: LayerStateType) {
  state.player.events.push({
    type: "collision-handled",
    time: Date.now(),
  });
  return state;
}
