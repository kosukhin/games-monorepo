import { createStore } from 'zustand/vanilla'
import { SnakeState } from './app/SnakeState'
import { Store, type StoreWithDispatch } from './handlers/Store'
import { ActionHandler } from './handlers/ActionHandler';
import { TimeoutHandler } from './handlers/TimeoutHandler';
import { devtools } from 'zustand/middleware'

export const store = createStore<StoreWithDispatch>(devtools(Store(SnakeState())) as any);

const actionsListener = ActionHandler(store.getState().dispatch, [
    {
        type: 'timeout',
        handler: TimeoutHandler
    }
])
store.subscribe(actionsListener as any);
