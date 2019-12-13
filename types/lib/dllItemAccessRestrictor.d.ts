import DLLItem, { DLLItemType } from './dllItem';
interface IAccessRestrictedDLLItem<T> {
    data: T | undefined;
    readonly prev: DLLItemType<T>;
    readonly next: DLLItemType<T>;
    __dllItem__: DLLItemType<T>;
}
export interface IDLLItemAccessRestrictor<T> {
    grantAccess(accessRestrictedDllItem: IAccessRestrictedDLLItem<T>): DLLItem<T>;
    revokeAccess<U extends DLLItem<T> | null>(dllItem: U): U extends DLLItem<T> ? AccessRestrictedDLLItem<T> : null;
}
export default class DLLItemAccessRestrictor<T> implements IDLLItemAccessRestrictor<T> {
    /**
     * Grants all the access on the given dllItem
     *
     * @param accessRestrictedDllItem dll item whose access is restricted
     *
     * @returns all access granted dll item
     */
    grantAccess(accessRestrictedDllItem: AccessRestrictedDLLItem<T>): DLLItem<T>;
    /**
     * Revokes write access to `prev` & `next` properties
     *
     * @param dllItem a node in the dll chain
     *
     * @returns Access restricted dll item
     */
    revokeAccess<U extends DLLItem<T> | null>(dllItem: U): U extends DLLItem<T> ? AccessRestrictedDLLItem<T> : null;
}
export declare class AccessRestrictedDLLItem<T> implements IAccessRestrictedDLLItem<T> {
    private dllItem;
    __dllItem__: DLLItem<T>;
    private dllItemAccessRestrictor;
    constructor(dllItem: DLLItem<T>);
    get data(): T;
    set data(dt: T);
    get prev(): AccessRestrictedDLLItem<T> | null;
    get next(): AccessRestrictedDLLItem<T> | null;
}
export {};
