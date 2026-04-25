import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { SnakeState, type SnakeStateType } from './app/SnakeState';
import { ActionHandler } from './handlers/ActionHandler';
import { ControlsHandler } from './handlers/ControlsHandler';
import { NotifyHandler } from './handlers/NotifyHandler';
import { TimeoutHandler } from './handlers/TimeoutHandler';

export const store = createStore<{ data: SnakeStateType }>(
  devtools(() => ({ data: SnakeState() })) as any,
);
export const dispatchStore = (fn: Function) => {
  store.setState((state: any) => ({ data: fn(state.data) }));
};

const controlsHandler = ControlsHandler();
const actionsListener = ActionHandler(dispatchStore, [
  ['start', controlsHandler.startHandler],
  ['stop', controlsHandler.stopHandler],
  ['timeout', TimeoutHandler],
  ['notify', NotifyHandler],
]);

store.subscribe(state => {
  actionsListener(state.data as any);
});
