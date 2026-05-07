import { LastCollisionHandled } from "@/app/LastCollisionHandled";
import { LastCollisionInGap } from "@/app/LastCollisionInGap";
import { LayerStateType } from "@/app/LayerState";
import { ScorePlayer } from "@/app/ScorePlayer";
import { BatchCommand, CommandType } from "silentium-loop";

const lastEventGap = 500;
export function CollisionWithRatTrap(state: LayerStateType) {
  const commands: CommandType[] = [];

  const collision = LastCollisionInGap(state, "rat-trap", lastEventGap);
  if (collision) {
    commands.push({
      type: "schedule",
      next: LastCollisionHandled,
    });
    Object.values(state.entities).forEach((e) => {
      if (e.type === "rat") {
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
      args: [collision.entityId],
    });
  }

  return BatchCommand(state, commands);
}
