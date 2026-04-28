import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('playerSkin', 'assets/player-stand.png');
  }

  create() {
    // World dimensions larger than viewport for camera roaming
    const worldW = 2400;
    const worldH = 600;
    this.physics.world.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setBounds(0, 0, worldW, worldH);

    // Ground platform
    this.ground = this.add.rectangle(worldW / 2, worldH - 20, worldW, 40, 0x2ecc71);
    this.physics.add.existing(this.ground, true);

    // Player square
    this.player = this.add.image(100, worldH-60, 'playerSkin');
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Obstacle path (green squares)
    this.obstacles = this.physics.add.staticGroup();
    const obstacleY = worldH - 60;
    [400, 600, 900, 1200, 1500, 2000].forEach((x) => {
      const obs = this.add.rectangle(x, obstacleY, 40, 40, 0x00ff00);
      this.physics.add.existing(obs, true);
      this.obstacles.add(obs);
    });

    // Collisions
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.obstacles);

    // Camera follows player
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

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
    const onGround = this.player.body.blocked.down || this.player.body.touching.down;
    if (this.cursors.up.isDown && onGround) {
      this.player.body.setVelocityY(-300);
    }
  }
}
