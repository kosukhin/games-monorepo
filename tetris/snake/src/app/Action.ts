export type ActionNextType = (state: unknown, ...rest: unknown[]) => unknown;

export type ActionFailType = (state: unknown, reason: unknown) => unknown;

export type ActionType = {
    details: unknown,
    next?: ActionNextType,
    fail?: ActionNextType
}

export type StateWithActions = {
    actions: ActionType[]
}

export function Action(state: StateWithActions, action: ActionType) {
    if (!state.actions) {
        state.actions = []
    }
    state.actions.push(action)
    return state;
}
