import type { PointType } from './SnakeState';

export function Target([maxX, maxY]: PointType): PointType {
  return [Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY)];
}
