export type ActionNextType = (state: any, ...rest: any[]) => any;

export type ActionFailType = (state: any, reason: any) => any;

export type ActionType = {
  type: string;
  args?: unknown[];
  next?: ActionNextType;
  fail?: ActionNextType;
};

export type StateWithActions = {
  actions: (ActionType | ActionType[])[];
};

export function Action(state: StateWithActions, action: ActionType | ActionType[]) {
  return {
    ...state,
    actions: [...(state.actions ?? []), action],
  };
}
