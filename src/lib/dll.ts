import DLLItem, { DLLItemType } from './dllItem';
import DLLItemAccessRestrictor, { AccessRestrictedDLLItem } from './dllItemAccessRestrictor';

type IIteratorCb<T, U> = (data: T, i: number) => U;

interface IDLL<T> {
  readonly length: number;
  readonly head: AccessRestrictedDLLItem<T> | null;
  readonly tail: AccessRestrictedDLLItem<T> | null;

  shift(): T | undefined;
  unshift(data: T): void;
  forEach(cb: IIteratorCb<T, any>): void;
  map<U>(cb: IIteratorCb<T, U>): U[];
  push(data: T): AccessRestrictedDLLItem<T>;
  appendAfter(node: DLLItemType<T> | AccessRestrictedDLLItem<T>, data: T): AccessRestrictedDLLItem<T>;
  remove(dllItem: AccessRestrictedDLLItem<T> | DLLItem<T>): boolean;
  clear(): void;
}

interface IState<T> {
  length: number;
  head: DLLItemType<T>;
  tail: DLLItemType<T>;
}

export default class DLL<T = any> implements IDLL<T> {
  private state: IState<T> = this.getFreshState();

  private dllItemAccessRestrictor = new DLLItemAccessRestrictor<T>();

  public get head(): AccessRestrictedDLLItem<T> | null {
    return this.dllItemAccessRestrictor.revokeAccess(this.state.head);
  }

  public get tail(): AccessRestrictedDLLItem<T> | null {
    return this.dllItemAccessRestrictor.revokeAccess(this.state.tail);
  }

  public get length(): number {
    return this.state.length;
  }

  /**
   * Removes and returns the first
   * item in the list
   *
   * @returns Same data that was
   *    used to append to this list
   */
  public shift(): T | undefined {
    let dllItem = this.state.head;

    if (!(dllItem instanceof DLLItem)) return undefined;

    this.remove(dllItem);

    const value = dllItem.data;

    // for gc
    dllItem = null;

    return value;
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
    const currHead = this.state.head;
    const dllItem = new DLLItem<T>(data, null, currHead);
    this.state.head = dllItem;

    if (currHead instanceof DLLItem) {
      currHead.prev = dllItem;

      // if HEAD is not set
      // then its an empty list
    } else {
      this.state.tail = dllItem;
    }

    this.state.length++;
  }

  /**
   * Iterate through the entire DLL chain
   * just like Array.forEach()
   *
   * @param cb iterator callback
   */
  public forEach(cb: IIteratorCb<T, void>): void {
    this.iterate<void>((dllItem, i) => {
      cb(dllItem.data, i);
    });
  }

  /**
   * Iterates through the entire DLL chain
   * and returns the result array, just
   * like Array.map()
   *
   * @param cb iterator callback
   *
   * @returns the result array just like Array.map()
   */
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
  public push(data: T): AccessRestrictedDLLItem<T> {
    return this.appendAfter(this.state.tail, data);
  }

  /**
   * Appends the given value after the
   * specified node
   *
   * @param node Node to append the new item
   * @param data Value for the new node
   *
   * @returns the newly appended node
   */
  public appendAfter(
    accessRestrictedNode: DLLItemType<T> | AccessRestrictedDLLItem<T>,
    data: T,
  ): AccessRestrictedDLLItem<T> {
    let node: DLLItemType<T>;
    if (accessRestrictedNode === null && this.state.length > 0) {
      throw new Error('Invalid Node `null`: DLL is not empty, hence can\'t append to the given node');
    } else if (accessRestrictedNode instanceof AccessRestrictedDLLItem) {
      node = this.dllItemAccessRestrictor.grantAccess(accessRestrictedNode);
    } else {
      node = accessRestrictedNode;
    }

    const dllItem = new DLLItem(data);

    // if node is null, then it means
    // that the list is empty
    if (node === null) {
      this.state.head = this.state.tail = dllItem;
    } else {
      dllItem.prev = node;
      dllItem.next = node.next;
      node.next = dllItem;

      // if the node was a tail node
      // then reset the tail node
      if (node === this.state.tail) {
        this.state.tail = dllItem;
      }
    }

    this.state.length++;

    return this.dllItemAccessRestrictor.revokeAccess(dllItem);

  }

  /**
   * Removes the given item from DLL
   *
   * @param dllItem
   */
  public remove(accessRestrictedDllItem: AccessRestrictedDLLItem<T> | DLLItem<T>): boolean {
    let dllItem: DLLItem<T>;

    if (accessRestrictedDllItem instanceof AccessRestrictedDLLItem) {
      dllItem = this.dllItemAccessRestrictor.grantAccess(accessRestrictedDllItem);
    } else if (accessRestrictedDllItem instanceof DLLItem) {
      dllItem = accessRestrictedDllItem;
    } else {
      return false;
    }

    // Isolate the node from the chain
    if (dllItem.prev) {
      dllItem.prev.next = dllItem.next;
    } else {
      // If it's HEAD node
      this.state.head = dllItem.next;
    }

    if (dllItem.next) {
      dllItem.next.prev = dllItem.prev;
    } else {
      // if it's also a TAIL node
      this.state.tail = dllItem.prev;
    }

    this.state.length--;
    return true;
  }

  /**
   * Clears the DLL chain
   */
  public clear(): void {
    // unlink all the items in the DLL chain
    // such it will be garbage collected
    // as no reference between them is found
    this.iterate<void>((dllItem) => {
      dllItem.prev = dllItem.next = null;
    });

    this.state = this.getFreshState();
  }

  private getFreshState(): IState<T> {
    return {
      length: 0,
      head: null,
      tail: null,
    };
  }

  private iterate<U>(cb: IIteratorCb<DLLItem<T>, U>) {
    let dllItem = this.state.head;

    let i = 0;
    while (dllItem) {
      cb(dllItem, i++);

      dllItem = dllItem.next;
    }
  }
}
