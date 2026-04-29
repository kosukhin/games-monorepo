import { LayerStateType } from "@/app/LayerState";
import { Tick } from "@/app/Tick";
import {
  EntityTypeFactory,
  PhaserEntityType,
} from "@/models/EntityTypeFactory";
import { dispatch } from "@/store";
import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  public entities: PhaserEntityType[] = [];

  public constructor() {
    super({ key: "MainScene" });
    dispatch((state: LayerStateType) => {
      this.entities.push(EntityTypeFactory(state.player, this));
      state.entities.forEach((entity) => {
        this.entities.push(EntityTypeFactory(entity, this));
      });
    });
  }

  public preload() {
    this.entities.forEach((e) => {
      e.preload?.();
    });
  }

  public create() {
    dispatch(({ world }: LayerStateType) => {
      this.physics.world.setBounds(0, 0, world.width, world.height);
      this.cameras.main.setBounds(0, 0, world.width, world.height);
    });

    this.entities.forEach((e) => {
      e.create?.();
    });
  }

  public update() {
    this.entities.forEach((e) => {
      e.update?.();
    });
    dispatch(Tick);
  }
}
