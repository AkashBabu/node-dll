
export type DLLItemType<T> = DLLItem<T> | null;

interface IDLLItem<T> {
  data: T;
  prev: DLLItemType<T>;
  next: DLLItemType<T>;
}

export default class DLLItem<T> implements IDLLItem<T> {

  constructor(public data: T, public prev: DLLItemType<T> = null, public next: DLLItemType<T> = null) {}
}
