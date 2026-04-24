import { createStore } from 'zustand/vanilla';
import { SnakeState } from './app/SnakeState';
import { Store, type StoreWithDispatch } from './handlers/Store';
import { ActionHandler } from './handlers/ActionHandler';
import { TimeoutHandler } from './handlers/TimeoutHandler';
import { devtools } from 'zustand/middleware';
import { NotifyHandler } from './handlers/NotifyHandler';

export const store = createStore<StoreWithDispatch>(devtools(Store(SnakeState())) as any);

const actionsListener = ActionHandler(store.getState().dispatch, [
  {
    type: 'timeout',
    handler: TimeoutHandler,
  },
  {
    type: 'notify',
    handler: NotifyHandler,
  },
]);
store.subscribe(actionsListener as any);
