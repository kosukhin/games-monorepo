import { LayerStateType } from "@/app/LayerState";
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
    if (event.entityPosition[1] >= event.targetPosition[1]) {
      state.player.health -= 20;
      commands.push({
        type: "player-hit",
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
