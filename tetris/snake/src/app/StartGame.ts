import type { SnakeStateType } from "./SnakeState";

export function StartGame(state: SnakeStateType) {
    state.gameStep = 'running';
    return state;
}
