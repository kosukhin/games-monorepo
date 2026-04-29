import Phaser from "phaser";

export default class PreloaderScene extends Phaser.Scene {
  public constructor() {
    super({ key: "PreloaderScene" });
  }

  public preload() {
    // Placeholder for loading assets; could show a loading bar here
  }

  public create() {
    this.scene.start("MainScene");
  }
}
