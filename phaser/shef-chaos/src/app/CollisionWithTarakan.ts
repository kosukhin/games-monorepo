import { HitPlayer } from "@/app/HitPlayer";
import { LastCollisionHandled } from "@/app/LastCollisionHandled";
import { LastCollisionInGap } from "@/app/LastCollisionInGap";
import { DirectionType, LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 200;

export function CollisionWithTarakan(state: LayerStateType) {
  const commands: CommandType[] = [];

  const collision = LastCollisionInGap(state, "tarakan", lastEventGap);
  if (collision) {
    commands.push({
      type: "schedule",
      next: LastCollisionHandled,
    });
    const direction: DirectionType =
      collision.entityPosition[1] >= collision.targetPosition[1]
        ? "up"
        : "none";
    commands.push({
      type: "schedule",
      next: HitPlayer,
      args: [collision.entityType, direction],
    });
  }

  return BatchCommand(state, commands);
}
