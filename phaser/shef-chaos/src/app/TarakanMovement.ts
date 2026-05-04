import { LayerStateType } from "@/app/LayerState";
import { BatchCommand, CommandType } from "silentium-loop";

export function TarakanMovement(state: LayerStateType) {
  const tarakans = Object.values(state.entities).filter(
    (e) => e.type === "tarakan",
  );

  const commands: CommandType[] = [];

  tarakans.forEach((t) => {
    commands.push({
      type: "move-entity",
      args: [t.id, -8],
    });
  });

  return BatchCommand(state, commands);
}
