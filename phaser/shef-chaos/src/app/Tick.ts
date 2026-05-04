import { CollisionWithMud } from "@/app/CollisionWithMud";
import { CollisionWithTarakan } from "@/app/CollisionWithTarakan";
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
    const now = Date.now();
    player.collidedWith.forEach((when, id) => {
        if 
      commands.push({
        type: "call",
        args: [collided, player],
        next: CollisionWithMud,
      });
      commands.push({
        type: "call",
        args: [collided, player],
        next: CollisionWithTarakan,
      });
    });
    player.collidedWith.clear();
  }

  if (player.health === 0) {
    return Command(state, {
      type: "player-die",
    });
  }

  commands.push({
    type: "call",
    args: [],
    next: GameOverGuard,
  });

  return BatchCommand(state, commands);
}
