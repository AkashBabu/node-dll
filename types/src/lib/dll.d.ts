import DLLItem, { DLLItemType } from './dllItem';
declare type IIteratorCb<T, U> = (data: T, i: number) => U;
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
    length: number;
    private head;
    private tail;
    /**
     * Returns the first item in the list
     *
     * @returns first item
     */
    getHead(): DLLItemType<T>;
    /**
     * Returns the last item in the list
     *
     * @returns last item
     */
    getTail(): DLLItemType<T>;
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
     *
     * @param cb
     */
    forEach(cb: IIteratorCb<T, void>): void;
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
    push(data: T): DLLItem<T>;
    /**
     * Removes the given item from DLL
     *
     * @param dllItem
     */
    remove(dllItem: DLLItem<T>): boolean;
}
export {};
