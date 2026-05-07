import { LastCollisionHandled } from "@/app/LastCollisionHandled";
import { LastCollisionInGap } from "@/app/LastCollisionInGap";
import { LayerStateType } from "@/app/LayerState";
import { ScorePlayer } from "@/app/ScorePlayer";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 500;
export function CollisionWithMud(state: LayerStateType) {
  const commands: CommandType[] = [];

  const collision = LastCollisionInGap(state, "mud", lastEventGap);
  if (collision) {
    commands.push({
      type: "schedule",
      next: LastCollisionHandled,
    });
    commands.push({
      type: "schedule",
      next: ScorePlayer,
      args: [collision.entityType],
    });
    commands.push({
      type: "remove-entity",
      args: [collision.entityId],
    });
  }

  return BatchCommand(state, commands);
}
