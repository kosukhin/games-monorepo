import { LayerStateType } from "@/app/LayerState";
import { ScorePlayer } from "@/app/ScorePlayer";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 500;
export function CollisionWithSpray(state: LayerStateType) {
  const commands: CommandType[] = [];

  state.player.collisionEvents.forEach((event) => {
    const nowGap = state.player.lastCollision + lastEventGap;
    if (event.entityType !== "spray" || event.time < nowGap) {
      return;
    }

    state.player.lastCollision = event.time;
    Object.values(state.entities).forEach((e) => {
      if (e.type === "tarakan") {
        commands.push({
          type: "schedule",
          next: ScorePlayer,
          args: [e.type],
        });
        commands.push({
          type: "remove-entity",
          args: [e.id],
        });
      }
    });

    commands.push({
      type: "remove-entity",
      args: [event.id],
    });
  });

  return BatchCommand(state, commands);
}
