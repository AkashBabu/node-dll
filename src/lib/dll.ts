import DLLItem, {DLLItemType} from './dllItem';

type IIteratorCb<T, U> = (data: T, i: number) => U;

interface IDLL<T> {
  getHead(): DLLItemType<T>;
  getTail(): DLLItemType<T>;
  shift(): T | undefined;
  unshift(data: T): void;
  forEach(cb: IIteratorCb<T, any>): void;
  map<U>(cb: IIteratorCb<T, U>): U[];
  push(data: T): DLLItemType<T>;
  remove(dllItem: DLLItemType<T>): boolean;
}

export default class DLL<T> implements IDLL<T> {
  public length: number = 0;
  private head: DLLItemType<T> = null;
  private tail: DLLItemType<T> = null;

  /**
   * Returns the first item in the list
   *
   * @returns first item
   */
  public getHead(): DLLItemType<T> {
    return this.head;
  }

  /**
   * Returns the last item in the list
   *
   * @returns last item
   */
  public getTail(): DLLItemType<T> {
    return this.tail;
  }

  /**
   * Removes and returns the first
   * item in the list
   *
   * @returns Same data that was
   *    used to append to this list
   */
  public shift(): T | undefined {
    const dllItem = this.getHead();

    if (!(dllItem instanceof DLLItem)) return undefined;

    this.remove(dllItem);

    return dllItem.getValue();
  }

  /**
   * Add the given item to the head of
   * DLL chain
   *
   * In other words the new item would
   * be the new head of the chain
   *
   * @returns Same data that was
   *    used to append to this list
   */
  public unshift(data: T) {
    const currHead = this.getHead();
    const dllItem = new DLLItem<T>(data, null, currHead);
    this.head = dllItem;

    if (currHead instanceof DLLItem) {
      currHead.setPrev(dllItem);
    } else {
      this.tail = dllItem;
    }

    this.length++;
  }

  /**
   * Iterate through the entire DLL chain
   *
   * @param cb
   */
  public forEach(cb: IIteratorCb<T, void>): void {
    let dllItem = this.getHead();

    let i = 0;
    while (dllItem) {
      cb(dllItem.getValue(), i++);

      dllItem = dllItem.getNext();
    }

    // gc
    dllItem = null;
  }

  public map<U>(cb: IIteratorCb<T, U>): U[] {
    const mapped: U[] = [];
    this.forEach((value, i): any => {
      mapped.push(cb(value, i));
    });

    return mapped;
  }

  /**
   * Adds the given item the tail of DLL
   *
   * @param data Data to be appended to the list
   *
   * @returns {DLLItem} dllItem, the same
   *      can be used to remove this item from
   *      DLL
   */
  public push(data: T): DLLItem<T> {
    const dllItem = new DLLItem(data, this.tail);

    if (this.tail instanceof DLLItem) {
      this.tail.setNext(dllItem);

      // set this item as the new tail
      this.tail = dllItem;
    } else {
      // if this is the first item in the DLL
      // then it would be the head and the tail
      // of DLL
      this.head = this.tail = dllItem;
    }

    this.length++;

    return dllItem;
  }

  /**
   * Removes the given item from DLL
   *
   * @param dllItem
   */
  public remove(dllItem: DLLItem<T>): boolean {
    if (!(dllItem instanceof DLLItem)) return false;

    const prev = dllItem.getPrev();
    const next = dllItem.getNext();
    // If it's NOT HEAD
    if (prev instanceof DLLItem) {
      prev.setNext(next);

      // If it's HEAD
    } else {
      this.head = next;
    }

    // If it's NOT TAIL
    if (next instanceof DLLItem) {
      next.setPrev(prev);

      // If it's TAIL
    } else {
      this.tail = prev;
    }

    this.length--;
    return true;
  }
}
