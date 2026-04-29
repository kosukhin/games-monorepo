import { Action, createCommand, type CommandType } from 'silentium-loop';
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
export const dispatchStore = (fn: Function) => {
  store.setState((state: any) => {
    const newData = fn(state.data);
    return ({ data: newData })
  });
};

export const { Command, BatchCommand } = createCommand(
  (state: any, command: CommandType) => {
    return state.update('commands', (prev: CommandType[]) => [...prev, command]);
  },
);

const controlsHandler = ControlAction();
const actionsListener = Action(
  dispatchStore,
  [
    ['start', controlsHandler.startHandler],
    ['stop', controlsHandler.stopHandler],
    ['timeout', TimeoutAction],
    ['notify', NotifyAction],
  ],
  () => store.getState().data.get('commands'),
  (state: SnakeStateType) => state.set('commands', [])
);

store.subscribe(actionsListener);
