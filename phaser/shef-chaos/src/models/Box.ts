import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";

export function Box(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "box", "assets/box.png");
}
