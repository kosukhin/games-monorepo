import { Action } from "./Action";
import { App } from "./App";
import type { SnakeStateType } from "./SnakeState";

export function Start(state: SnakeStateType) {
    return Action({
        ...state,
        gameStep: 'running'
    } as SnakeStateType, {
        type: 'timeout',
        args: [state.speedMs],
        next: App
    });
}
