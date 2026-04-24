import type { ActionType } from "../app/Action";
import type { StoreType } from "./Store";

export function TimeoutHandler(store: StoreType, action: ActionType) {
    const delay = Number(action.args[0] ?? 0);
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        if (action.next) {
            store.dispatch(action.next);
            return;
        }
        console.warn('Warn - timeout without next step!');
    }, delay)
    });
}
