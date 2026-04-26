import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  preload() {
    // Placeholder for loading assets; could show a loading bar here
  }

  create() {
    this.scene.start('MainScene');
  }
}
