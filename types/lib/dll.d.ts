import DLLItem, { DLLItemType } from './dllItem';
import { AccessRestrictedDLLItem } from './dllItemAccessRestrictor';
declare type IIteratorCb<T, U> = (data: T, i: number) => U;
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
export default class DLL<T = any> implements IDLL<T> {
    private state;
    private dllItemAccessRestrictor;
    get head(): AccessRestrictedDLLItem<T> | null;
    get tail(): AccessRestrictedDLLItem<T> | null;
    get length(): number;
    /**
     * Removes and returns the first
     * item in the list
     *
     * @returns Same data that was
     *    used to append to this list
     */
    shift(): T | undefined;
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
    unshift(data: T): void;
    /**
     * Iterate through the entire DLL chain
     * just like Array.forEach()
     *
     * @param cb iterator callback
     */
    forEach(cb: IIteratorCb<T, void>): void;
    /**
     * Iterates through the entire DLL chain
     * and returns the result array, just
     * like Array.map()
     *
     * @param cb iterator callback
     *
     * @returns the result array just like Array.map()
     */
    map<U>(cb: IIteratorCb<T, U>): U[];
    /**
     * Adds the given item the tail of DLL
     *
     * @param data Data to be appended to the list
     *
     * @returns {DLLItem} dllItem, the same
     *      can be used to remove this item from
     *      DLL
     */
    push(data: T): AccessRestrictedDLLItem<T>;
    /**
     * Appends the given value after the
     * specified node
     *
     * @param node Node to append the new item
     * @param data Value for the new node
     *
     * @returns the newly appended node
     */
    appendAfter(accessRestrictedNode: DLLItemType<T> | AccessRestrictedDLLItem<T>, data: T): AccessRestrictedDLLItem<T>;
    /**
     * Removes the given item from DLL
     *
     * @param dllItem
     */
    remove(accessRestrictedDllItem: AccessRestrictedDLLItem<T> | DLLItem<T>): boolean;
    /**
     * Clears the DLL chain
     */
    clear(): void;
    private getFreshState;
    private iterate;
}
export {};
