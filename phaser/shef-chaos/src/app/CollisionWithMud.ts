import { LayerStateType } from "@/app/LayerState";
import { ScorePlayer } from "@/app/ScorePlayer";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 500;
export function CollisionWithMud(state: LayerStateType) {
  const commands: CommandType[] = [];

  state.player.collisionEvents.forEach((event) => {
    const nowGap = state.player.lastCollision + lastEventGap;
    if (event.entityType !== "mud" || event.time < nowGap) {
      return;
    }

    state.player.lastCollision = event.time;
    commands.push({
      type: "schedule",
      next: ScorePlayer,
      args: [event.entityType],
    });
    commands.push({
      type: "remove-entity",
      args: [event.id],
    });
  });

  return BatchCommand(state, commands);
}
