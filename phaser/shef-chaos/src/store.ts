import { TimeoutAction } from "@/actions/TimeoutAction";
import { LayerState } from "@/app/LayerState";
import { Actions } from "silentium-loop";

export const store = {
  data: LayerState(),
};

(window as any).store = store;

export const dispatch = Actions(
  (fn) => {
    store.data = fn(store.data);
    return store;
  },
  [["timeout", TimeoutAction]],
);
