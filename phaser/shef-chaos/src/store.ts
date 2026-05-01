import { CallAction } from "@/actions/CallAction";
import { TimeoutAction } from "@/actions/TimeoutAction";
import { LayerState } from "@/app/LayerState";
import { Actions, StoreActionProvider } from "silentium-loop";
import invariant from "tiny-invariant";

export const store = {
  data: LayerState(),
};

(window as any).store = store;

const actions: StoreActionProvider[] = [
  ["timeout", TimeoutAction],
  ["call", CallAction],
];

export const dispatch = Actions((fn) => {
  store.data = fn(store.data);
  return store;
}, actions);

export const provide = (provider: StoreActionProvider) => {
  const found = actions.find((i) => i[0] === provider[0]);
  invariant(
    found === undefined,
    `Provider with type ${provider[0]} existed already!`,
  );
  actions.push(provider);
};
