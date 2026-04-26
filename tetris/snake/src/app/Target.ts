import type { PointType } from './SnakeState';

export function Target([maxX, maxY]: PointType, head: PointType, tail: PointType[]): PointType {
  const fullBody = [head, ...tail];
  const CANDIDATES_COUNT = Math.ceil(maxX / 2);

  let bestPoint: PointType = [0, 0];
  let maxMinDistance = -1;

  for (let i = 0; i < CANDIDATES_COUNT; i++) {
    // 1. Генерируем случайную точку
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    // 2. Проверяем, не занята ли она (если занята — пропускаем итерацию)
    const isOccupied = fullBody.some(([bx, by]) => bx === x && by === y);
    if (isOccupied) {
      i--; // Повторим попытку, чтобы набрать именно 10 вариантов
      continue;
    }

    // 3. Считаем расстояние до ближайшей части тела (Евклидово)
    let minDistanceToBody = Infinity;
    for (const [bx, by] of fullBody) {
      const dist = Math.sqrt((x - bx) ** 2 + (y - by) ** 2);
      if (dist < minDistanceToBody) minDistanceToBody = dist;
    }

    // 4. Выбираем точку, у которой этот минимум — самый большой
    if (minDistanceToBody > maxMinDistance) {
      maxMinDistance = minDistanceToBody;
      bestPoint = [x, y];
    }
  }

  return bestPoint;
}
