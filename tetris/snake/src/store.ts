import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { SnakeState } from './app/SnakeState';
import { ActionHandler } from './handlers/ActionHandler';
import { ControlsHandler } from './handlers/ControlsHandler';
import { NotifyHandler } from './handlers/NotifyHandler';
import { Store, type StoreWithDispatch } from './handlers/Store';
import { TimeoutHandler } from './handlers/TimeoutHandler';

export const store = createStore<StoreWithDispatch>(devtools(Store(SnakeState())) as any);

const controlsHandler = ControlsHandler();
const actionsListener = ActionHandler(store.getState().dispatch, [
  ['start', controlsHandler.startHandler],
  ['stop', controlsHandler.stopHandler],
  ['timeout', TimeoutHandler],
  ['notify', NotifyHandler],
]);
store.subscribe(actionsListener as any);
