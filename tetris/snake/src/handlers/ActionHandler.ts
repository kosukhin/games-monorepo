import type { ActionType, StateWithActions } from "../app/Action";
import type { StoreType } from "./Store";
import { groupBy } from 'lodash-es';

export type StoreHandlerType = (store: StoreType, action: ActionType) => Promise<any>;

export type StoreHandlerProvider = {
    type: string,
    handler: StoreHandlerType
}

export function ActionHandler(store: StoreType, handlers: StoreHandlerProvider[]) {
    const handlerGroups = groupBy(handlers, 'type');
    return async (state: StateWithActions) => {
        while(state.actions.length > 0) {
            const action = state.actions.shift() as ActionType;
            const handlers = handlerGroups[action.type];
            if (handlers.length) {
                for (const handler of handlers) {
                    await handler.handler(store, action);
                }
            }
        }
    }
}
