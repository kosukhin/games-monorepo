import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Player(id: string, scene: MainScene): PhaserEntityType {
  let cursors: any = null;
  let player: any = null;
  return {
    type: "player",
    get phaserObject() {
      return player;
    },
    preload() {
      scene.load.image("player-stand", "assets/player-stand.png");
    },
    create() {
      dispatch((state: LayerStateType) => {
        const entity = state.entities[id];
        const [x, y] = entity.position;
        // Player square
        player = scene.add.image(x, y, "player-stand");
        scene.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);

        // Collisions
        Object.values(scene.entities).forEach((entity) => {
          if (entity.type === "player") {
            return;
          }
          scene.physics.add.collider(player, entity.phaserObject);
        });

        // Camera follows player
        scene.cameras.main.startFollow(player, true, 0.08, 0.08);
        // Input
        cursors = scene.input.keyboard?.createCursorKeys();
        return state;
      });
    },
    update() {
      if (!player || !cursors) return;

      dispatch((state: LayerStateType) => {
        const playerEntity = state.entities[id];
        playerEntity.position = [player.x, player.y];

        // Move left/right
        if (cursors.left.isDown) {
          player.body.setVelocityX(-200);
          playerEntity.pose = "run";
          playerEntity.direction = "left";
        } else if (cursors.right.isDown) {
          player.body.setVelocityX(200);
          playerEntity.pose = "run";
          playerEntity.direction = "right";
        } else {
          playerEntity.pose = "stand";
          playerEntity.direction = "right";
          player.body.setVelocityX(0);
        }

        // Jump if on ground
        const onGround = player.body.blocked.down || player.body.touching.down;
        if (cursors.up.isDown && onGround) {
          player.body.setVelocityY(-300);
        }
        if (!onGround) {
          playerEntity.pose = "jump";
        }

        return state;
      });
    },
  };
}
