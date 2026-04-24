import type { ActionType } from '../app/Action';
import type { DispatchType } from './Store';

export function TimeoutHandler(action: ActionType, dispatch: DispatchType) {
  const delay = Number(action.args?.[0] ?? 0);
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
      if (action.next) {
        dispatch(action.next);
        return;
      }
      console.warn('Warn - timeout without next step!');
    }, delay);
  });
}
