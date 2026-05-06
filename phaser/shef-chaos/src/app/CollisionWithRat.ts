import { HitPlayer } from "@/app/HitPlayer";
import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 200;

export function CollisionWithRat(state: LayerStateType) {
  const commands: CommandType[] = [];

  state.player.collisionEvents.forEach((event) => {
    const nowGap = state.player.lastCollision + lastEventGap;
    if (event.entityType !== "rat" || event.time < nowGap) {
      return;
    }

    state.player.lastCollision = event.time;
    commands.push({
      type: "schedule",
      next: HitPlayer,
      args: [event.entityType],
    });
  });

  return BatchCommand(state, commands);
}
