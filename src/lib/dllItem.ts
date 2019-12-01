
export type DLLItemType<T> = DLLItem<T> | null;

interface IDLLItem<T> {
  setValue(value: T): void;
  getValue(): T;

  getPrev(): DLLItemType<T>;
  setPrev(dllItem: DLLItemType<T>): void;

  getNext(): DLLItemType<T>;
  setNext(dllItem: DLLItemType<T>): void;
}

export default class DLLItem<T> implements IDLLItem<T> {
  constructor(private value: T, private prev: DLLItemType<T> = null, private next: DLLItemType<T> = null) {}

  public setValue(value: T): void {
    this.value = value;
  }

  public getValue(): T {
    return this.value;
  }

  public setPrev(dllItem: DLLItemType<T>): void {
    this.prev = dllItem;
  }
  public getPrev() {
    return this.prev;
  }

  public setNext(dllItem: DLLItemType<T>): void {
    this.next = dllItem;
  }
  public getNext(): DLLItemType<T> {
    return this.next;
  }
}
