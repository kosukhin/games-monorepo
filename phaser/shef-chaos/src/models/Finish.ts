import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";

export function Finish(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "finish", "assets/finish.png");
}
