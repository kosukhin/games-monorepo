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
      Object.entries(state.entities).forEach(([id, entity]) => {
        this.entities.push(EntityTypeFactory(id, entity, this));
      });
      return state;
    });
  }

  public preload() {
    this.entities.forEach((e) => {
      e.preload?.();
    });
  }

  public create() {
    dispatch((state: LayerStateType) => {
      this.physics.world.setBounds(0, 0, state.world.width, state.world.height);
      this.cameras.main.setBounds(0, 0, state.world.width, state.world.height);
      return state;
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
