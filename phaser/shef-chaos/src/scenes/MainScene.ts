import { LayerStateType } from "@/app/LayerState";
import { Tick } from "@/app/Tick";
import {
  EntityTypeFactory,
  PhaserEntityType,
} from "@/models/EntityTypeFactory";
import { dispatch, provide } from "@/store";
import Phaser from "phaser";
import { CommandType } from "silentium-loop";

export default class MainScene extends Phaser.Scene {
  public entities: PhaserEntityType[] = [];

  public constructor() {
    super({ key: "MainScene" });

    dispatch((state: LayerStateType) => {
      Object.entries(state.entities).forEach(([id, entity]) => {
        this.entities.push(EntityTypeFactory(id, entity, this));
      });
      this.entities.push(
        EntityTypeFactory(state.player.type, state.player, this),
      );
      return state;
    });

    provide([
      "remove-entity",
      (action: CommandType) => {
        const id = action.args?.[0];
        const object = this.entities.find((e) => e.id === id);
        if (object) {
          object.phaserObject.destroy();
        }
        return Promise.resolve();
      },
    ]);
  }

  public preload() {
    this.load.image("background", "assets/background.png");
    this.entities.forEach((e) => {
      e.preload?.();
    });
  }

  public create() {
    dispatch((state: LayerStateType) => {
      this.bg = this.add.tileSprite(
        0,
        0,
        state.world.width,
        state.world.height,
        "background",
      );

      // Устанавливаем привязку к левому верхнему углу
      this.bg.setOrigin(0, 0);

      // Если нужно, чтобы фон был за всеми объектами
      this.bg.setDepth(-1);

      this.physics.world.setBounds(0, 0, state.world.width, state.world.height);
      this.cameras.main.setBounds(0, 0, state.world.width, state.world.height);
      return state;
    });

    this.entities.forEach((e) => {
      e.create?.();
    });
  }

  public update() {
    dispatch((state: LayerStateType) => {
      if (state.gameOver) {
        return state;
      }
      this.entities.forEach((e) => {
        e.update?.();
      });
      dispatch(Tick);
      return state;
    });
  }
}
