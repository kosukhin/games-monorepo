import { CollisionWithBox } from "@/app/CollisionWithBox";
import { CollisionWithMud } from "@/app/CollisionWithMud";
import { GameOverGuard } from "@/app/GameOverGuard";
import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, Command, CommandType } from "silentium-loop";

export function Tick(state: LayerStateType) {
  const player = state.player;
  const commands: CommandType[] = [];

  if (player.health === 0) {
    return Command(state, {
      type: "player-die",
    });
  }

  if (player.collidedWith.size) {
    player.collidedWith.forEach((collided) => {
      commands.push({
        type: "call",
        args: [collided, player],
        next: CollisionWithBox,
      });
      commands.push({
        type: "call",
        args: [collided, player],
        next: CollisionWithMud,
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
