import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";

export function TrashCan(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "trash-can", "assets/trash.png");
}
