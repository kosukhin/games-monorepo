import type { ActionType, StateWithActions } from '../app/Action';
import { groupBy } from 'lodash-es';
import type { DispatchType } from './Store';

export type StoreHandlerType = (store: DispatchType, action: ActionType) => Promise<any>;
export type StoreHandlerProvider = {
  type: string;
  handler: StoreHandlerType;
};

export function ActionHandler(dispatch: DispatchType, handlers: StoreHandlerProvider[]) {
  const handlerGroups = groupBy(handlers, 'type');
  return async (state: StateWithActions) => {
    const actions = state.actions ? [...state.actions] : [];
    while (actions.length > 0) {
      const action = actions.shift() as ActionType;
      const handlersForType = handlerGroups[action.type];
      if (handlersForType?.length) {
        for (const handler of handlersForType) {
          await handler.handler(dispatch, action);
        }
      }
    }
    dispatch((s: any) => ({
      ...s,
      actions,
    }));
  };
}
