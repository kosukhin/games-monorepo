import type { ActionType, StateWithActions } from '../app/Action';
import { groupBy, uniq } from 'lodash-es';
import type { DispatchType } from './Store';

export type StoreHandlerType = (action: ActionType, dispatch: DispatchType) => Promise<any>;
export type StoreHandlerProvider = [string, StoreHandlerType];

export function ActionHandler(dispatch: DispatchType, handlersConfig: StoreHandlerProvider[]) {
  const handlers = handlersConfig.map(([type, handler]) => ({ type, handler }));
  const handlerGroups = groupBy(handlers, 'type');
  return async (state: StateWithActions) => {
    if (state.actions.length === 0) {
      return;
    }
    dispatch((s: any) => ({
      ...s,
      actions: [],
    }));
    const stateActions = state.actions ? [...state.actions] : [];
    const unhandledActionTypes: string[] = [];
    while (stateActions.length > 0) {
      let actions = stateActions.shift() ?? [];
      if (!Array.isArray(actions)) {
        actions = [actions];
      }
      await Promise.all(
        actions.map(async action => {
          const handlersForType = handlerGroups[action.type];
          if (handlersForType?.length) {
            for (const handler of handlersForType) {
              await handler.handler(action, dispatch);
            }
          } else {
            unhandledActionTypes.push(action.type);
          }
        }),
      );
    }
    if (unhandledActionTypes.length) {
      const unhandledTypes = uniq(unhandledActionTypes);
      console.warn('Unhandled actions in store!', unhandledTypes);
    }
  };
}
