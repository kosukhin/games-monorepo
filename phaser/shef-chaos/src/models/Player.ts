import { LayerStateType } from "@/app/LayerState";
import { PhaserEntityType } from "@/models/EntityTypeFactory";
import MainScene from "@/scenes/MainScene";
import { dispatch } from "@/store";

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
    },
    create() {
      dispatch((state: LayerStateType) => {
        const playerEntity = state.entities[playerId];
        const [x, y] = playerEntity.position;
        // Player square
        player = scene.add.image(x, y, "player-stand");
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
                if (state.entities[playerId].collidedWith) {
                  state.entities[playerId].collidedWith.add(collidedEntity.id);
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
        return state;
      });
    },
    update() {
      if (!player || !cursors) return;

      dispatch((state: LayerStateType) => {
        const playerEntity = state.entities[playerId];
        playerEntity.position = [Math.round(player.x), Math.round(player.y)];

        // Move left/right
        if (cursors.left.isDown) {
          player.body.setVelocityX(-200);
        } else if (cursors.right.isDown) {
          player.body.setVelocityX(200);
        } else {
          player.body.setVelocityX(0);
        }

        // Jump if on ground
        const onGround = player.body.blocked.down || player.body.touching.down;
        if (cursors.up.isDown && onGround) {
          player.body.setVelocityY(-300);
        }

        if (player.body.touching.none) {
          playerEntity.touched.push("none");
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
  };
}
