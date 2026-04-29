import type { CommandType, DispatchType } from "silentium-loop";

export function TimeoutAction(action: CommandType, dispatch: DispatchType) {
  const delay = Number(action.args?.[0] ?? 0);
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
      if (action.next) {
        dispatch(action.next);
        return;
      }
      console.warn("Warn - timeout without next step!");
    }, delay);
  });
}
