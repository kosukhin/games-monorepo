import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";

export function Shelf(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "shelf", "assets/shelf.png");
}
