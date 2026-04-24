import type { ActionType } from '../app/Action';

export function NotifyHandler(action: ActionType) {
  return new Promise<void>(resolve => {
    console.log('Notification', ...(action.args ?? []));
    resolve();
  });
}
