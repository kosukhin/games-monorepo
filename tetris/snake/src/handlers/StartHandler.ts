import type { ActionType } from '../app/Action';

export function StartHandler(action: ActionType) {
  console.log('handle app start', action);
  return Promise.resolve();
}
