export type DirectionType = 'left' | 'right';
export type PoseType = 'stand' | 'run' | 'jump';
export type PointType = [number, number];
export type EntityType = {
    id: number,
    type: string,
    position: PointType,
    direction: DirectionType,
    pose: PoseType
}

/**
 * Состояние уровня игры
 */
export function LayerState() {
    return {
        player: {
            id: 1,
            type: 'player',
            direction: 'right',
            pose: "stand",
            position: [0, 0]
        } as EntityType,
        entities: [
            {
                id: 2,
                direction: 'left',
                pose: 'stand',
                position: [0, 30],
                type: 'box'
            }
        ] as EntityType[]
    }
}

export type LayerStateType = ReturnType<typeof LayerState>
