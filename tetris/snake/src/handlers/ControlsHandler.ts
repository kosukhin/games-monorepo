import { partialRight } from 'lodash-es';
import type { ActionType } from '../app/Action';
import type { DispatchType } from './Store';
import invariant from 'tiny-invariant';
import type { DirectionType } from '../app/SnakeState';

const directionToKeyMap: Record<string, DirectionType> = {
  KeyW: 'top',
  KeyD: 'right',
  KeyS: 'bottom',
  KeyA: 'left',
};

export function ControlsHandler() {
  const keyPressHandler: ((...args: any[]) => void)[] = [];
  const startHandler = (action: ActionType, dispatch: DispatchType) => {
    const appHandler = action.args?.[0] as any;
    invariant(typeof appHandler, 'ControlsHandler: appHandler must be function');
    const handler = (e: KeyboardEvent) => {
      const direction = directionToKeyMap[e.code];
      if (direction) {
        dispatch(partialRight(appHandler, direction));
      }
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
