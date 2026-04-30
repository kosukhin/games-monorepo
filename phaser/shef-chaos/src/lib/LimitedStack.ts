export class LimitedStack<T> {
  private items: T[] = [];

  public constructor(
    private limit: number,
    private def: T,
  ) {}

  public push(item: T) {
    this.items.push(item);
    if (this.items.length > this.limit) {
      this.items.shift();
    }
  }

  public get stack() {
    return this.items;
  }

  public get top() {
    if (this.items.length === 0) {
      return this.def;
    }
    return this.items[this.items.length - 1];
  }

  public get bottom() {
    if (this.items.length === 0) {
      return this.def;
    }
    return this.items[0];
  }

  public diagram(length: number) {
    return this.items.slice(0, length).join("-");
  }
}
