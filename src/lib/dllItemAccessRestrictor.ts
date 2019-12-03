import DLLItem, { DLLItemType } from './dllItem';

interface IAccessRestrictedDLLItem<T> {
  data: T | undefined;
  readonly prev: DLLItemType<T>;
  readonly next: DLLItemType<T>;
  __dllItem__: DLLItemType<T>;
}

export interface IDLLItemAccessRestrictor<T> {
  grantAccess(accessRestrictedDllItem: IAccessRestrictedDLLItem<T>): DLLItemType<T>;

  revokeAccess(dllItem: DLLItem<T>): IAccessRestrictedDLLItem<T>;
}

export default class DLLItemAccessRestrictor<T> implements IDLLItemAccessRestrictor<T> {

  /**
   * Grants all the access on the given dllItem
   *
   * @param accessRestrictedDllItem dll item whose access is restricted
   *
   * @returns all access granted dll item
   */
  public grantAccess(accessRestrictedDllItem: AccessRestrictedDLLItem<T>): DLLItemType<T> {
    return accessRestrictedDllItem.__dllItem__;
  }

  /**
   * Revokes write access to `prev` & `next` properties
   *
   * @param dllItem a node in the dll chain
   *
   * @returns Access restricted dll item
   */
  public revokeAccess(dllItem: DLLItem<T>): AccessRestrictedDLLItem<T> {
    return new AccessRestrictedDLLItem(dllItem);
  }

}

export class AccessRestrictedDLLItem<T> implements IAccessRestrictedDLLItem<T> {
  public __dllItem__: DLLItem<T>;
  private dllItemAccessRestrictor = new DLLItemAccessRestrictor<T>();

  constructor(private dllItem: DLLItem<T>) {
    this.__dllItem__ = dllItem;
  }

  public get data(): T {
    return this.dllItem.data;
  }

  public set data(dt: T) {
    this.dllItem.data = dt;
  }

  public get prev(): AccessRestrictedDLLItem<T> | null {
    return this.dllItem.prev
    ? this.dllItemAccessRestrictor.revokeAccess(this.dllItem.prev)
    : null;
  }

  public get next(): AccessRestrictedDLLItem<T> | null  {
    return this.dllItem.next
    ? this.dllItemAccessRestrictor.revokeAccess(this.dllItem.next)
    : null;
  }
}
