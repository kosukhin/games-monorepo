import { partialRight } from 'lodash-es';
import invariant from 'tiny-invariant';
import type { DirectionType } from '../app/SnakeState';
import type { CommandType, DispatchType } from 'silentium-loop';

const directionToKeyMap: Record<string, DirectionType> = {
  KeyW: 'top',
  KeyD: 'right',
  KeyS: 'bottom',
  KeyA: 'left',
};

export function ControlAction() {
  const keyPressHandler: ((...args: any[]) => void)[] = [];
  const startHandler = (action: CommandType, dispatch: DispatchType) => {
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
