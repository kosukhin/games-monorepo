export function createId(of: string) {
  let id = 0;
  return function Id() {
    id += 1;
    return `${of}${id}`;
  };
}
