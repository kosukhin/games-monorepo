import { LayerState, LayerStateType } from "@/app/LayerState";
import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { Actions } from "silentium-loop";
import { TimeoutAction } from "@/actions/TimeoutAction";

export const store = createStore<{ data: LayerStateType }>(
  devtools(() => ({
    data: LayerState(),
  })) as any,
);

export const dispatch = Actions(
  (fn) => store.setState((s) => ({ data: fn(s.data) })),
  [["timeout", TimeoutAction]],
);
