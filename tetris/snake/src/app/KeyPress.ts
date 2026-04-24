import type { SnakeStateType } from "./SnakeState";

export function KeyPress(state: SnakeStateType, e: KeyboardEvent) {
    console.log('handle key', e.key);
    return state;
}
