import { CollisionWithBox } from "@/app/CollisionWithBox";
import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

export function Tick(state: LayerStateType) {
  const player = state.entities.player;
  const commands: CommandType[] = [];

  if (player.collidedWith?.size) {
    player.collidedWith.forEach((collided) => {
      commands.push({
        type: "call",
        args: [collided, player],
        next: CollisionWithBox,
      });
    });
    player.collidedWith.clear();
  }

  return BatchCommand(state, commands);
}
