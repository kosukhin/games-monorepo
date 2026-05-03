export function createId() {
  let id = 0;
  return function Id(of: string) {
    id += 1;
    return `${of}${id}`;
  };
}
