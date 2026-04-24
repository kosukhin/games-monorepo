import { Action } from "./Action";
import type { SnakeStateType } from "./SnakeState";

export function App(state: SnakeStateType) {
    if (state.gameStep !== 'running') {
        return state;
    }

    console.log('Game loop works!');

    return Action(state, {
        type: 'timeout',
        args: [state.score],
        next: App
    })
}
