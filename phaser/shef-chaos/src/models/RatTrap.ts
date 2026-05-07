import { BaseModel } from "@/models/BaseModel";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";

export function RatTrap(id: string, scene: MainScene): PhaserEntityType {
  return BaseModel(id, scene, "rat-trap", "assets/rat-trap.png");
}
