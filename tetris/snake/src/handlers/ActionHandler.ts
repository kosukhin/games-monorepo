import type { ActionType, StateWithActions } from "../app/Action";
import { groupBy } from 'lodash-es';
import type { DispatchType } from "./Store";

export type StoreHandlerType = (store: DispatchType, action: ActionType) => Promise<any>;

export type StoreHandlerProvider = {
    type: string,
    handler: StoreHandlerType
}

export function ActionHandler(dispatch: DispatchType, handlers: StoreHandlerProvider[]) {
    const handlerGroups = groupBy(handlers, 'type');
    return async (state: StateWithActions) => {
        console.log(state.actions);
        while(state.actions.length > 0) {
            const action = state.actions.shift() as ActionType;
            const handlers = handlerGroups[action.type];
            if (handlers.length) {
                for (const handler of handlers) {
                    await handler.handler(dispatch, action);
                }
            }
        }
    }
}
