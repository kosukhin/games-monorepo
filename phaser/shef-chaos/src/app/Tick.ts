import { CollisionsClean } from "@/app/CollisionsClean";
import { CollisionWithMud } from "@/app/CollisionWithMud";
import { CollisionWithTarakan } from "@/app/CollisionWithTarakan";
import { GameOverGuard } from "@/app/GameOverGuard";
import { LayerStateType } from "@/app/LayerState";
import { TarakanMovement } from "@/app/TarakanMovement";
import { BatchCommand, CommandType } from "silentium-loop";

export function Tick(state: LayerStateType) {
  const commands: CommandType[] = [];

  commands.push({
    type: "schedule",
    next: GameOverGuard,
  });

  commands.push({
    type: "schedule",
    next: CollisionWithMud,
  });
  commands.push({
    type: "schedule",
    next: CollisionWithTarakan,
  });
  commands.push({
    type: "schedule",
    next: CollisionsClean,
  });
  commands.push({
    type: "schedule",
    next: TarakanMovement,
  });

  return BatchCommand(state, commands);
}
