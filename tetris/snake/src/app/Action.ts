export type ActionNextType = (state: any, ...rest: any[]) => any;

export type ActionFailType = (state: any, reason: any) => any;

export type ActionType = {
  type: string;
  args?: unknown[];
  next?: ActionNextType;
  fail?: ActionNextType;
};

export type StateWithActions = {
  actions: ActionType[];
};

export function Action(state: StateWithActions, action: ActionType) {
  if (!state.actions) {
    state.actions = [];
  }
  return {
    ...state,
    actions: [...state.actions, action],
  };
}
