import { HitPlayer } from "@/app/HitPlayer";
import { LastCollisionHandled } from "@/app/LastCollisionHandled";
import { LastCollisionInGap } from "@/app/LastCollisionInGap";
import { LayerStateType } from "@/app/LayerState";
import { ScorePlayer } from "@/app/ScorePlayer";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 500;

export function CollisionWithTrashCan(state: LayerStateType) {
  const commands: CommandType[] = [];

  const collision = LastCollisionInGap(state, "trash-can", lastEventGap);
  if (collision) {
    commands.push({
      type: "schedule",
      next: LastCollisionHandled,
    });
    const targetTop = collision.targetPosition[1];
    const entityTop = collision.entityPosition[1];
    if (entityTop >= targetTop) {
      commands.push({
        type: "schedule",
        next: ScorePlayer,
        args: [collision.entityType],
      });
      commands.push({
        type: "remove-entity",
        args: [collision.entityId],
      });
    } else {
      commands.push({
        type: "schedule",
        next: HitPlayer,
        args: [collision.entityType],
      });
    }
  }

  return BatchCommand(state, commands);
}
