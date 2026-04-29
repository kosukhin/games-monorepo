import type { CommandType } from 'silentium-loop';

export function NotifyAction(action: CommandType) {
  return new Promise<void>(resolve => {
    console.log('Notification', ...(action.args ?? []));
    resolve();
  });
}
