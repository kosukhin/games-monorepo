import { Actions } from 'silentium-loop';
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { SnakeState, type SnakeStateType } from './app/SnakeState';
import { ControlAction } from './handlers/ControlAction';
import { NotifyAction } from './handlers/NotifyAction';
import { TimeoutAction } from './handlers/TimeoutAction';

export const store = createStore<{ data: SnakeStateType }>(
  devtools(() => ({
    data: SnakeState(),
  })) as any,
);

const controlsHandler = ControlAction();
export const dispatch = Actions(
  (fn: Function) => store.setState(s => ({ data: fn(s.data) })),
  [
    ['start', controlsHandler.startHandler],
    ['stop', controlsHandler.stopHandler],
    ['timeout', TimeoutAction],
    ['notify', NotifyAction],
  ],
);
