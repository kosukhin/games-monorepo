import { HitPlayer } from "@/app/HitPlayer";
import { LayerStateType } from "@/app/LayerState";
import { ScorePlayer } from "@/app/ScorePlayer";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 500;

export function CollisionWithTrashCan(state: LayerStateType) {
  const commands: CommandType[] = [];

  state.player.collisionEvents.forEach((event) => {
    const nowGap = state.player.lastCollision + lastEventGap;
    if (event.entityType !== "trash-can" || event.time < nowGap) {
      return;
    }

    state.player.lastCollision = event.time;
    const targetTop = event.targetPosition[1];
    const entityTop = event.entityPosition[1];
    if (entityTop >= targetTop) {
      commands.push({
        type: "schedule",
        next: ScorePlayer,
        args: [event.entityType],
      });
      commands.push({
        type: "remove-entity",
        args: [event.id],
      });
    } else {
      commands.push({
        type: "schedule",
        next: HitPlayer,
        args: [event.entityType],
      });
    }
  });

  return BatchCommand(state, commands);
}
