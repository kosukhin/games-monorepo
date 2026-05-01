import type { CommandType, DispatchType } from "silentium-loop";

export function CallAction(action: CommandType, dispatch: DispatchType) {
  if (action.next && action.args) {
    dispatch(action.next, ...action.args);
  }
  return Promise.resolve();
}
