import type { ActionType, StateWithActions } from '../app/Action';
import { groupBy, uniq } from 'lodash-es';
import type { DispatchType } from './Store';

export type StoreHandlerType = (action: ActionType, dispatch: DispatchType) => Promise<any>;
export type StoreHandlerProvider = {
  type: string;
  handler: StoreHandlerType;
};

export function ActionHandler(dispatch: DispatchType, handlers: StoreHandlerProvider[]) {
  const handlerGroups = groupBy(handlers, 'type');
  return async (state: StateWithActions) => {
    if (state.actions.length === 0) {
      return;
    }
    dispatch((s: any) => ({
      ...s,
      actions: [],
    }));
    const actions = state.actions ? [...state.actions] : [];
    while (actions.length > 0) {
      const action = actions.shift() as ActionType;
      const handlersForType = handlerGroups[action.type];
      if (handlersForType?.length) {
        for (const handler of handlersForType) {
          await handler.handler(action, dispatch);
        }
      }
    }
    if (actions.length) {
      const unhandledTypes = uniq(actions.map(action => action.type));
      console.warn('Unhandled actions in store!', unhandledTypes);
    }
  };
}
