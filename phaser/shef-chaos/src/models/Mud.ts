import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";

export function Mud(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "mud", "assets/mud.png");
}
