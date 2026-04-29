import { PhaserEntityType } from "@/models/EntityTypeFactory";

export function Box(): PhaserEntityType {
  return {
    type: "box",
    create() {
      // Obstacle path (green squares)
      this.obstacles = this.physics.add.staticGroup();
      const obstacleY = worldH - 60;
      [400, 600, 900, 1200, 1500, 2000].forEach((x) => {
        const obs = this.add.rectangle(x, obstacleY, 40, 40, 0x00ff00);
        this.physics.add.existing(obs, true);
        this.obstacles.add(obs);
      });
    },
  };
}
