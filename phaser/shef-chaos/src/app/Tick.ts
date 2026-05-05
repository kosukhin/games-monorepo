import { CollisionsClean } from "@/app/CollisionsClean";
import { CollisionWithMud } from "@/app/CollisionWithMud";
import { CollisionWithSpray } from "@/app/CollisionWithSpray";
import { CollisionWithTarakan } from "@/app/CollisionWithTarakan";
import { CollisionWithTrashCan } from "@/app/CollisionWithTrashCan";
import { GameOverGuard } from "@/app/GameOverGuard";
import { LayerStateType } from "@/app/LayerState";
import { TarakanMovement } from "@/app/TarakanMovement";
import { BatchCommand } from "silentium-loop";

export function Tick(state: LayerStateType) {
  return BatchCommand(state, [
    { type: "schedule", next: GameOverGuard },
    { type: "schedule", next: CollisionWithTrashCan },
    { type: "schedule", next: CollisionWithTarakan },
    { type: "schedule", next: CollisionWithMud },
    { type: "schedule", next: CollisionWithSpray },
    { type: "schedule", next: CollisionsClean },
    { type: "schedule", next: TarakanMovement },
  ]);
}
