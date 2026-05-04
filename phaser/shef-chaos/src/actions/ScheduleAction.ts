import type { CommandType, DispatchType } from "silentium-loop";

export function ScheduleAction(action: CommandType, dispatch: DispatchType) {
  if (action.next) {
    dispatch(action.next, ...(action.args ?? []));
  }
  return Promise.resolve();
}
