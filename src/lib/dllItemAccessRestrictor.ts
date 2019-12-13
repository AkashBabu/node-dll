import DLLItem, { DLLItemType } from './dllItem';

interface IAccessRestrictedDLLItem<T> {
  data: T | undefined;
  readonly prev: DLLItemType<T>;
  readonly next: DLLItemType<T>;
  __dllItem__: DLLItemType<T>;
}

export interface IDLLItemAccessRestrictor<T> {
  grantAccess(accessRestrictedDllItem: IAccessRestrictedDLLItem<T>): DLLItem<T>;

  revokeAccess<U extends DLLItem<T> | null>(
    dllItem: U,
  ): U extends DLLItem<T> ? AccessRestrictedDLLItem<T> : null;
}

export default class DLLItemAccessRestrictor<T> implements IDLLItemAccessRestrictor<T> {
  /**
   * Grants all the access on the given dllItem
   *
   * @param accessRestrictedDllItem dll item whose access is restricted
   *
   * @returns all access granted dll item
   */
  public grantAccess(accessRestrictedDllItem: AccessRestrictedDLLItem<T>): DLLItem<T> {
    return accessRestrictedDllItem.__dllItem__;
  }

  /**
   * Revokes write access to `prev` & `next` properties
   *
   * @param dllItem a node in the dll chain
   *
   * @returns Access restricted dll item
   */
  public revokeAccess<U extends DLLItem<T> | null>(
    dllItem: U,
  ): U extends DLLItem<T> ? AccessRestrictedDLLItem<T> : null {
    return (dllItem
      ? new AccessRestrictedDLLItem(dllItem as DLLItem<T>)
      : null) as any;
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

  public get prev() {
    return this.dllItemAccessRestrictor.revokeAccess(this.dllItem.prev);
  }

  public get next() {
    return this.dllItemAccessRestrictor.revokeAccess(this.dllItem.next);
  }
}
