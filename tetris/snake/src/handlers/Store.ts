export function Store(initialState: any) {
  return (set: Function) => ({
    ...initialState,
    dispatch: (fn: Function) => set((state: unknown) => fn(state)),
  });
}

export type DispatchType = (fn: Function) => any;

export type StoreWithDispatch = {
  dispatch: DispatchType;
};
