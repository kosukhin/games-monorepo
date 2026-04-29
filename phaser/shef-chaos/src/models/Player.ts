import { EntityType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";

export function Player(e: EntityType, scene: MainScene): PhaserEntityType {
  let cursors: any = null;
  return {
    type: "player",
    preload() {
      scene.load.image("player-stand", "assets/player-stand.png");
    },
    create() {
      // Player square
      this.player = this.add.image(100, worldH - 60, "playerSkin");
      this.physics.add.existing(this.player);
      this.player.body.setCollideWorldBounds(true);

      // Collisions
      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(this.player, this.obstacles);

      // Camera follows player
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      // Input
      cursors = scene.input.keyboard?.createCursorKeys();
    },
    update() {
      if (!this.player || !this.cursors) return;
      // Move left/right
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
      } else {
        this.player.body.setVelocityX(0);
      }

      // Jump if on ground
      const onGround =
        this.player.body.blocked.down || this.player.body.touching.down;
      if (this.cursors.up.isDown && onGround) {
        this.player.body.setVelocityY(-300);
      }
    },
  };
}
