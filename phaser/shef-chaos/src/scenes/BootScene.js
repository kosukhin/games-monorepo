import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load minimal assets for splash or loading, if any
  }

  create() {
    // Immediately start the preloader scene
    this.scene.start('PreloaderScene');
  }
}
