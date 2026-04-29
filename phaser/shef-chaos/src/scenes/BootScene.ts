import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  public constructor() {
    super({ key: "BootScene" });
  }

  public preload() {
    // Load minimal assets for splash or loading, if any
  }

  public create() {
    // Immediately start the preloader scene
    this.scene.start("PreloaderScene");
  }
}
