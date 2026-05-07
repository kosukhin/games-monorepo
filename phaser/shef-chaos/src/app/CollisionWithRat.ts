import { HitPlayer } from "@/app/HitPlayer";
import { LastCollisionHandled } from "@/app/LastCollisionHandled";
import { LastCollisionInGap } from "@/app/LastCollisionInGap";
import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 200;

export function CollisionWithRat(state: LayerStateType) {
  const commands: CommandType[] = [];

  const collision = LastCollisionInGap(state, "rat", lastEventGap);
  if (collision) {
    commands.push({
      type: "schedule",
      next: LastCollisionHandled,
    });
    commands.push({
      type: "schedule",
      next: HitPlayer,
      args: [collision.entityType],
    });
  }

  return BatchCommand(state, commands);
}
