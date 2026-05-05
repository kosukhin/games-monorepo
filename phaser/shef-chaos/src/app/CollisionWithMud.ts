import { LayerStateType } from "@/app/LayerState";
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
    state.player.score += 2;
    commands.push({
      type: "remove-entity",
      args: [event.id],
    });
  });

  return BatchCommand(state, commands);
}
