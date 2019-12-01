export declare type DLLItemType<T> = DLLItem<T> | null;
interface IDLLItem<T> {
    setValue(value: T): void;
    getValue(): T;
    getPrev(): DLLItemType<T>;
    setPrev(dllItem: DLLItemType<T>): void;
    getNext(): DLLItemType<T>;
    setNext(dllItem: DLLItemType<T>): void;
}
export default class DLLItem<T> implements IDLLItem<T> {
    private value;
    private prev;
    private next;
    constructor(value: T, prev?: DLLItemType<T>, next?: DLLItemType<T>);
    setValue(value: T): void;
    getValue(): T;
    setPrev(dllItem: DLLItemType<T>): void;
    getPrev(): DLLItemType<T>;
    setNext(dllItem: DLLItemType<T>): void;
    getNext(): DLLItemType<T>;
}
export {};
