import { partialRight } from 'lodash-es';
import type { ActionType } from '../app/Action';
import type { DispatchType } from './Store';
import invariant from 'tiny-invariant';

export function ControlsHandler() {
  const keyPressHandler: ((...args: any[]) => void)[] = [];
  const startHandler = (action: ActionType, dispatch: DispatchType) => {
    const appHandler = action.args?.[0] as any;
    invariant(typeof(appHandler), 'ControlsHandler: appHandler must be function');
    const handler = (e: KeyboardEvent) => {
      dispatch(partialRight(appHandler, e));
    };
    keyPressHandler.push(handler);
    window.addEventListener('keypress', handler);
    return Promise.resolve();
  };
  const stopHandler = () => {
    keyPressHandler.forEach(handler => {
      window.removeEventListener('keypress', handler);
    });
    return Promise.resolve();
  };
  return {
    startHandler,
    stopHandler,
  };
}
