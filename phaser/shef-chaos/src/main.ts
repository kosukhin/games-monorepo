import Phaser from "phaser";

import BootScene from "./scenes/BootScene.js";
import PreloaderScene from "./scenes/PreloaderScene.js";
import MainScene from "./scenes/MainScene.js";
import { store } from "@/store";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "phaser-game",
  scene: [BootScene, PreloaderScene, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600, x: 0 },
      debug: false,
    },
  },
};

window.addEventListener("load", () => {
  new Phaser.Game(config);

  const health = document.getElementById("health");
  const score = document.getElementById("score");
  const go = document.getElementById("game-over");
  go!.style.display = "none";
  setInterval(() => {
    health!.textContent = String(store.data.player.health ?? 0);
    score!.textContent = String(store.data.player.score ?? 0);
    if (store.data.gameOver) {
      go!.style.display = "flex";
    }
  }, 50);
});
