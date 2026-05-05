import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";

export function Window(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "window", "assets/window.png");
}
