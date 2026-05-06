import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";

export function Hood(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "hood", "assets/hood.png");
}
