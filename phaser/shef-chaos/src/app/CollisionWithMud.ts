import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 1000;

export function CollisionWithMud(state: LayerStateType) {
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
      state.player.score += 1;
      commands.push({
        type: "remove-entity",
        args: [event.id],
      });
    } else {
      state.player.health -= 10;
      commands.push({
        type: "player-hit",
      });
    }
  });

  return BatchCommand(state, commands);
}
