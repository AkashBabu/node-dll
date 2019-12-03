export declare type DLLItemType<T> = DLLItem<T> | null;
interface IDLLItem<T> {
    data: T;
    prev: DLLItemType<T>;
    next: DLLItemType<T>;
}
export default class DLLItem<T> implements IDLLItem<T> {
    data: T;
    prev: DLLItemType<T>;
    next: DLLItemType<T>;
    constructor(data: T, prev?: DLLItemType<T>, next?: DLLItemType<T>);
}
export {};
