import { LayerState } from "@/app/LayerState";
import { createStore } from 'zustand/vanilla';

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
