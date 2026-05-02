import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch, provide } from "@/store";

export function Player(playerId: string, scene: MainScene): PhaserEntityType {
  let cursors: any = null;
  let player: any = null;
  return {
    type: "player",
    id: playerId,
    get phaserObject() {
      return player;
    },
    preload() {
      scene.load.image("player-stand", "assets/player-stand.png");
      scene.load.image("player-die", "assets/player-die.png");
      scene.load.spritesheet("player-run", "assets/player-run.png", {
        frameWidth: 70,
        frameHeight: 100,
      });
      scene.load.image("player-jump", "assets/player-jump.png");
    },
    create() {
      provide([
        "player-blink",
        () => {
          scene.tweens.add({
            targets: player,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
              player.setAlpha(1);
            },
          });
          return Promise.resolve();
        },
      ]);
      provide([
        "player-die",
        () => {
          player.anims.stop();
          player.setTexture("player-die");
          return Promise.resolve();
        },
      ]);
      dispatch((state: LayerStateType) => {
        const playerEntity = state.player;
        const [x, y] = playerEntity.position;
        // Player square
        player = scene.add.sprite(x, y, "player-stand");
        scene.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);

        // Collisions
        Object.values(scene.entities).forEach((collidedEntity) => {
          if (collidedEntity.type === "player") {
            return;
          }
          scene.physics.add.collider(
            player,
            collidedEntity.phaserObject,
            () => {
              dispatch((state: LayerStateType) => {
                if (state.player.collidedWith) {
                  state.player.collidedWith.add(collidedEntity.id);
                }
                return state;
              });
            },
          );
        });

        // Camera follows player
        scene.cameras.main.startFollow(player, true, 0.08, 0.08);
        // Input
        cursors = scene.input.keyboard?.createCursorKeys();

        // Animations
        scene.anims.create({
          key: "run",
          frames: scene.anims.generateFrameNumbers("player-run", {
            start: 0,
            end: 5,
          }),
          frameRate: 10,
          repeat: -1, // бесконечно
        });

        return state;
      });
    },
    update() {
      if (!player || !cursors) {
        player.setTexture("player-die");
        return;
      }

      dispatch((state: LayerStateType) => {
        const playerEntity = state.player;
        playerEntity.position = [Math.round(player.x), Math.round(player.y)];

        if (state.gameOver) {
          player.anims.stop();
          player.setTexture("player-die");
          return state;
        }

        // Move left/right
        if (cursors.left.isDown) {
          player.body.setVelocityX(-200);
          player.setFlip(true);
          player.anims.play("run", true);
        } else if (cursors.right.isDown) {
          player.body.setVelocityX(200);
          player.setFlip(false);
          player.anims.play("run", true);
        } else {
          player.body.setVelocityX(0);
          player.anims.stop();
          player.setTexture("player-stand");
        }

        // Jump if on ground
        const onGround = player.body.blocked.down || player.body.touching.down;
        if (cursors.up.isDown && onGround) {
          player.body.setVelocityY(-300);
        }

        if (player.body.touching.none) {
          playerEntity.touched.push("none");
          player.anims.stop();
          player.setTexture("player-jump");
        } else if (player.body.touching.right) {
          playerEntity.touched.push("right");
        } else if (player.body.touching.left) {
          playerEntity.touched.push("left");
        } else if (player.body.touching.down) {
          playerEntity.touched.push("down");
        } else if (player.body.touching.up) {
          playerEntity.touched.push("up");
        }

        return state;
      });
    },
    gameOver() {
      player.anims.stop();
      player.setTexture("player-die");
    },
  };
}
