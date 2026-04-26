import Phaser from 'phaser';

import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import MainScene from './scenes/MainScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-game',
  scene: [BootScene, PreloaderScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
