import { EntityType, LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

export function Player(e: EntityType, scene: MainScene): PhaserEntityType {
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
      dispatch(({ world }: LayerStateType) => {
        // Player square
        player = scene.add.image(100, world.height - 60, "player-stand");
        scene.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);

        // Collisions
        scene.entities.forEach((entity) => {
          if (entity.type === "player") {
            return;
          }
          scene.physics.add.collider(player, this.phaserObject);
        });

        // Camera follows player
        scene.cameras.main.startFollow(player, true, 0.08, 0.08);
        // Input
        cursors = scene.input.keyboard?.createCursorKeys();
      });
    },
    update() {
      if (!player || !cursors) return;
      // Move left/right
      if (cursors.left.isDown) {
        player.body.setVelocityX(-200);
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(200);
      } else {
        player.body.setVelocityX(0);
      }

      // Jump if on ground
      const onGround = player.body.blocked.down || player.body.touching.down;
      if (cursors.up.isDown && onGround) {
        player.body.setVelocityY(-300);
      }
    },
  };
}
