import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/createEntity";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Rat(id: string, scene: MainScene): PhaserEntityType {
  let rat: any = null;
  return {
    id,
    type: "rat",
    get phaserObject() {
      return rat;
    },
    preload() {
      scene.load.spritesheet("rat-skin", "assets/rat-walk.png", {
        frameWidth: 61,
        frameHeight: 59,
      });
    },
    create() {
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        const { world } = state;
        const [x] = e.position;

        const obstacleY = world.height - e.position[1];
        rat = scene.physics.add.sprite(x, obstacleY, "rat-skin");
        scene.physics.add.existing(rat, true);

        scene.entities.forEach((e) => {
          if (e.type === "player") {
            return;
          }
          if (e.type === "rat") {
            return;
          }
          if (e.type === "tarakan") {
            return;
          }
          scene.physics.add.collider(rat, e.phaserObject);
        });

        scene.anims.create({
          key: "rat-run",
          frames: scene.anims.generateFrameNumbers("rat-skin", {
            start: 0,
            end: 4,
          }),
          frameRate: 5,
          repeat: -1, // бесконечно
        });

        return state;
      });
    },
    update() {
      if (!rat.body) {
        return;
      }
      rat.body.setSize(40, 40);
      dispatch((state: LayerStateType) => {
        const e = state.entities[id];
        e.events.push({
          type: "position",
          x: rat.body.position.x,
          y: rat.body.position.y,
        });
        e.events.push({
          type: "velocity",
          x: rat.body.velocity.x,
          y: rat.body.velocity.y,
        });
        rat.anims.play("rat-run", true);
        if (rat.body.velocity.x < 0) {
          rat.setFlip(true);
        } else {
          rat.setFlip(false);
        }
        return state;
      });
    },
  };
}
