import { CollisionWithBox } from "@/app/CollisionWithBox";
import { GameOverGuard } from "@/app/GameOverGuard";
import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

export function Tick(state: LayerStateType) {
  const player = state.player;
  const commands: CommandType[] = [];

  if (player.collidedWith.size) {
    player.collidedWith.forEach((collided) => {
      commands.push({
        type: "call",
        args: [collided, player],
        next: CollisionWithBox,
      });
    });
    player.collidedWith.clear();
  }

  commands.push({
    type: "call",
    args: [],
    next: GameOverGuard,
  });

  return BatchCommand(state, commands);
}
