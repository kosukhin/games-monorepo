import { CollisionsClean } from "@/app/CollisionsClean";
import { CollisionWithTrashCan } from "@/app/CollisionWithTrashCan";
import { CollisionWithTarakan } from "@/app/CollisionWithTarakan";
import { GameOverGuard } from "@/app/GameOverGuard";
import { LayerStateType } from "@/app/LayerState";
import { TarakanMovement } from "@/app/TarakanMovement";
import { BatchCommand, CommandType } from "silentium-loop";
import { CollisionWithMud } from "@/app/CollisionWithMud";

export function Tick(state: LayerStateType) {
  const commands: CommandType[] = [];

  commands.push({
    type: "schedule",
    next: GameOverGuard,
  });

  commands.push({
    type: "schedule",
    next: CollisionWithTrashCan,
  });
  commands.push({
    type: "schedule",
    next: CollisionWithTarakan,
  });
  commands.push({
    type: "schedule",
    next: CollisionWithMud,
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
