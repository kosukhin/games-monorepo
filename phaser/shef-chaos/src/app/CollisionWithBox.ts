import { LayerStateType } from "@/app/LayerState";

export function CollisionWithBox(state: LayerStateType, collidedId: string) {
  const collidedEntity = state.entities[collidedId];

  if (collidedEntity.type !== "box") {
    return state;
  }

  return state;
}
