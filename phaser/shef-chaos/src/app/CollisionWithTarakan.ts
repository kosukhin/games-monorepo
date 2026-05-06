import { HitPlayer } from "@/app/HitPlayer";
import { DirectionType, LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 200;

export function CollisionWithTarakan(state: LayerStateType) {
  const commands: CommandType[] = [];

  state.player.collisionEvents.forEach((event) => {
    const nowGap = state.player.lastCollision + lastEventGap;
    if (event.entityType !== "tarakan" || event.time < nowGap) {
      return;
    }

    state.player.lastCollision = event.time;
    const direction: DirectionType =
      event.entityPosition[1] >= event.targetPosition[1] ? "up" : "none";
    commands.push({
      type: "schedule",
      next: HitPlayer,
      args: [event.entityType, direction],
    });
  });

  return BatchCommand(state, commands);
}
