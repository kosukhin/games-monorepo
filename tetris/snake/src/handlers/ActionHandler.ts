import type { ActionType, StateWithActions } from '../app/Action';
import { groupBy, uniq } from 'lodash-es';
import type { DispatchType } from './Store';
import type Immutable from 'immutable';

export type StoreHandlerType = (action: ActionType, dispatch: DispatchType) => Promise<any>;
export type StoreHandlerProvider = [string, StoreHandlerType];

const resetActions = (s: any) => s.set('actions', []);
export function ActionHandler(dispatch: DispatchType, handlersConfig: StoreHandlerProvider[]) {
  const handlers = handlersConfig.map(([type, handler]) => ({ type, handler }));
  const handlerGroups = groupBy(handlers, 'type');
  return async (state: Immutable.MapOf<StateWithActions>) => {
    if (state === undefined) {
      console.warn('WARNING! state is undefined, possibly you returned undefined in you logic!');
    }
    const actions = state.get('actions');
    if (actions.length === 0) {
      return;
    }
    dispatch(resetActions);
    const stateActions = actions ? [...actions] : [];
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
