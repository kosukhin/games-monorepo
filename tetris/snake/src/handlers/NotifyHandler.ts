import type { ActionType } from '../app/Action';
import type { DispatchType } from './Store';

export function NotifyHandler(_: DispatchType, action: ActionType) {
  return new Promise<void>(resolve => {
    console.log('Notification', ...action.args);
    resolve();
  });
}
