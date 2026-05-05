import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

const MAX_DISTANCE = 250;
const MOVE_SPEED = 56;

export function TarakanMovement(state: LayerStateType) {
  const tarakans = Object.values(state.entities).filter(
    (e) => e.type === "tarakan",
  );

  const commands: CommandType[] = [];

  tarakans.forEach((t) => {
    const lastPosition = t.events.find((e) => e.type === "position");
    const lastVelocity = t.events.find((e) => e.type === "velocity");

    if (!lastPosition || !lastVelocity) {
      return;
    }

    t.events.length = 0;
    const movingRight = lastVelocity.x > 0;
    const movingLeft = lastVelocity.x < 0;
    const limitRight = lastPosition.x > t.position[0] + MAX_DISTANCE;
    const limitLeft = lastPosition.x < t.position[0] - MAX_DISTANCE;

    if (movingLeft && limitLeft) {
      commands.push({
        type: "move-entity",
        args: [t.id, Math.abs(lastVelocity.x)],
      });
    } else if (limitRight && movingRight) {
      commands.push({
        type: "move-entity",
        args: [t.id, -Math.abs(lastVelocity.x)],
      });
    } else if (lastVelocity.x) {
      commands.push({
        type: "move-entity",
        args: [t.id, lastVelocity.x],
      });
    } else {
      commands.push({
        type: "move-entity",
        args: [t.id, Math.round(Math.random() * 5) * MOVE_SPEED],
      });
    }
  });

  return BatchCommand(state, commands);
}
