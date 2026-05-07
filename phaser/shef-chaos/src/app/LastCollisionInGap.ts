import {
  EntityTypes,
  EventCollisionType,
  LayerStateType,
} from "@/app/LayerState";

export function LastCollisionInGap(
  state: LayerStateType,
  type: EntityTypes,
  gap: number,
): EventCollisionType | undefined {
  const lastEvent = state.player.events.at(-1);
  if (lastEvent?.type !== "collision") {
    return;
  }

  const lastHandledCollision = state.player.events.findLast(
    (e) => e.type === "collision-handled",
  );
  const lastCollision = state.player.events
    .filter((e) => e.type === "collision")
    .filter((e) => e.entityType === type)
    .at(-1);

  if (!lastCollision) {
    return;
  }

  const lastCollisionGap =
    lastCollision.time - (lastHandledCollision?.time ?? 0);

  if (lastCollisionGap < gap) {
    return;
  }

  return lastCollision;
}
