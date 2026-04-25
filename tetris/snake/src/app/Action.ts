import type Immutable from 'immutable';

export type ActionNextType = (state: any, ...rest: any[]) => any;

export type ActionFailType = (state: any, reason: any) => any;

export type ActionType = {
  type: string;
  args?: any[];
  next?: ActionNextType;
  fail?: ActionNextType;
};

export type ActionsType = (ActionType | ActionType[])[];

export type StateWithActions = {
  actions: ActionsType;
};

export function Action(state: Immutable.MapOf<any>, action: ActionType | ActionType[]) {
  return state.update('actions', actions => [...actions, action]);
}
