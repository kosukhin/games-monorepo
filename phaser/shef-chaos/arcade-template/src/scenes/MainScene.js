import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.game.events.off('blur');
    // World size
    const w = this.sys.game.config.width;
    const h = this.sys.game.config.height;

    // Ground (static platform)
    this.ground = this.add.rectangle(w / 2, h - 20, w, 40, 0x2ecc71);
    this.physics.add.existing(this.ground, true);

    // Player (dynamic square)
    this.player = this.add.rectangle(100, h - 60, 40, 40, 0xff0000);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Add collision between player and ground
    this.physics.add.collider(this.player, this.ground);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.player || !this.cursors) return;
    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
    } else {
      this.player.body.setVelocityX(0);
    }

    // Jump when on ground
    const canJump = this.player.body.blocked.down || this.player.body.touching.down;
    if (this.cursors.up.isDown && canJump) {
      this.player.body.setVelocityY(-300);
    }
  }
}
