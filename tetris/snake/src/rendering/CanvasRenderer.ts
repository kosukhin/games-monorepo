import invariant from 'tiny-invariant';
import type { PointType, SnakeStateType } from '../app/SnakeState';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  public constructor(
    canvasId: string,
    private cellSize = 10,
  ) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    invariant(canvas !== null, 'Canvas must exists!');
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    invariant(ctx !== null, 'Failed to create ctx on canvas');
    this.ctx = ctx;
  }

  public tick(state: SnakeStateType) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const targetColor = '#f00';
    const snakeColor = '#4CAF50';
    const points: [string, PointType][] = [
      [targetColor, state.get('targetPosition')],
      [snakeColor, state.get('headPosition')],
      ...state.get('tailPoints').map(t => [snakeColor, t] as [string, PointType]),
    ];

    const [countX, countY] = state.get('fieldSize');
    Array.from(range(countX)).forEach(x => {
      Array.from(range(countY)).forEach(y => {
        const posX = x * this.cellSize;
        const posY = y * this.cellSize;
        this.ctx.fillStyle = '#aaaaaa'; // Цвет подсветки
        this.ctx.fillRect(posX, posY, this.cellSize, this.cellSize);
      });
    });

    points.forEach(([color, point]) => {
      const [x, y] = point;
      const posX = x * this.cellSize;
      const posY = y * this.cellSize;
      this.ctx.fillStyle = color; // Цвет подсветки
      this.ctx.fillRect(posX, posY, this.cellSize, this.cellSize);
      this.ctx.strokeStyle = '#ccc';
      this.ctx.strokeRect(posX, posY, this.cellSize, this.cellSize);
    });
  }
}

function* range(to: number) {
  for (let i = 0; i <= to - 1; i++) {
    yield i;
  }
}
