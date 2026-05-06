import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";

export function Spray(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "spray", "assets/spray.png");
}
