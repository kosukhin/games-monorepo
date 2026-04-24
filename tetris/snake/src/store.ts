import { createStore } from 'zustand/vanilla'
import { SnakeState } from './app/SnakeState'
import { Store, type StoreType } from './handlers/Store'
import { ActionHandler } from './handlers/ActionHandler';
import { TimeoutHandler } from './handlers/TimeoutHandler';

export const store = createStore(Store(SnakeState()));

const actionsListener = ActionHandler(store as unknown as StoreType, [
    {
        type: 'timeout',
        handler: TimeoutHandler
    }
])
store.subscribe(actionsListener);
