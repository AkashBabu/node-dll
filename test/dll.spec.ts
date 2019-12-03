import { expect } from 'chai';
import { DLL, DLLItem } from '../src';

interface T {
  name: string;
}

describe('#DLL', () => {
  it('should be able to create a dll without any errors', () => {
    expect(() => {
      new DLL();
    }).to.not.throw;
  });

  describe('.push()', () => {
    it('should be able to push an item', () => {
      const dll = new DLL<T>();
      dll.push({ name: 'test' });

      const dllItem = dll.head;
      expect(dllItem).to.exist;
      expect((dllItem as DLLItem<T>).data.name).to.be.eql('test');
    });

    it('should be able to push many items', () => {
      const dll = new DLL<T>();
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        dll.push({ name: `test${i}` });
      });

      dll.forEach((data, i) => {
        expect(data).to.exist;
        expect(data.name).to.be.eql(`test${i}`);
      });
    });

    it('should return the pushed dllItem on successful push', () => {
      const dll = new DLL<T>();
      const dllItem = dll.push({ name: 'test' });

      expect(dllItem).to.be.an.instanceOf(DLLItem);
      expect(dllItem.data.name).to.be.eql('test');
    });

  });

  describe('.remove()', () => {
    let dll: DLL<T>;
    let items: Array<DLLItem<T>>;
    const SIZE = 10;

    beforeEach(() => {
      dll = new DLL<T>();
      items = [];
      Array(SIZE).fill(0).forEach((_, i) => {
        items.push(dll.push({ name: `test${i}` }));
      });
    });

    it('should return true on successful removal', () => {
      const dllItem = dll.push({ name: 'test' });

      expect(dll.remove(dllItem)).to.be.true;
    });

    it('should return false, when there are no items to be removed', () => {
      expect(dll.remove(null as any)).to.be.false;
    });

    it('should be able to remove the first item', () => {
      expect(dll.remove(items[0])).to.be.true;

      const firstItem = dll.head;
      expect((firstItem as DLLItem<T>).data.name).to.be.eql('test1');
      expect(dll.length).to.be.eql(SIZE - 1);
    });

    it('should be able to remove the last item', () => {
      expect(dll.remove(items[SIZE - 1])).to.be.true;

      const lastItem = dll.tail;
      expect((lastItem as DLLItem<T>).data.name).to.be.eql(`test${(SIZE - 1) - 1}`);
      expect(dll.length).to.be.eql(SIZE - 1);
    });

    it('should be able to remove any item in between first and last item', () => {
      const removeIndex = SIZE / 2;
      expect(dll.remove(items[removeIndex])).to.be.true;

      dll.forEach(data => {
        expect(data.name).not.to.be.eql(`test${removeIndex}`);
      });

      expect(dll.length).to.be.eql(SIZE - 1);
    });
  });

  describe('.head', () => {
    it('should return the first item in the list', () => {
      const dll = new DLL<T>();
      const items: Array<DLLItem<T>> = [];
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        items.push(dll.push({ name: `test${i}` }));
      });

      const firstItem = dll.head;
      expect(firstItem).to.be.eql(items[0]);
    });
    it('should return null when there are no items in the list', () => {
      const dll = new DLL();

      expect(dll.head).to.be.null;
    });
  });

  describe('.forEach()', () => {
    it('should iterate through the entire list', () => {
      const dll = new DLL();
      const items: any[] = [];
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        const item = { name: `test${i}` };
        dll.push(item);
        items.push(item);
      });

      dll.forEach((data, i) => {
        expect(items[i]).to.be.eql(data);
      });
    });

    it('should not call the iteratee if there are no items in the list', () => {
      const dll = new DLL();

      let calls = 0;
      const cb = () => calls++;

      dll.forEach(cb);
      expect(calls).to.be.eql(0);
    });
  });

  describe('.shift()', () => {
    it('should remove the head item and return the same', () => {
      const dll = new DLL<T>();
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        const item = { name: `test${i}` };
        dll.push(item);
      });

      const { name } = dll.shift() as T;
      expect(name).to.be.eql('test0');
      expect(dll.length).to.be.eql(size - 1);
    });

    it('should return undefined if the list is empty', () => {
      const dll = new DLL();

      expect(dll.shift()).to.be.undefined;
    });

    it('should set the next item as the new head', () => {
      const dll = new DLL<string>();

      dll.push('test1');
      dll.push('test2');

      dll.shift();

      expect((dll.head as DLLItem<string>).data).to.be.eql('test2');
    });
  });

  describe('.length', () => {
    let dll: DLL<T>;
    beforeEach(() => {
      dll = new DLL<T>();
      expect(dll.length).to.be.eql(0);
    });

    it('should return the current number of items in the list', () => {
      const dllItem1 = dll.push({ name: 'test1' });
      dll.push({ name: 'test2' });
      dll.push({ name: 'test3' });

      expect(dll.length).to.be.eql(3);

      expect(dll.remove(dllItem1)).to.be.true;
      expect(dll.length).to.be.eql(2);

      dll.shift();
      expect(dll.length).to.be.eql(1);
    });

    it('should increase the length when a new node is puhsed to the list', () => {
      dll.push({ name: 'test1' });

      expect(dll.length).to.be.eql(1);
    });

    it('should increase the length if any node is appendedAfter a given node', () => {
      dll.push({name: 'test1'});
      dll.push({name: 'test3'});

      expect(dll.length).to.be.eql(2);

      const head = dll.head as DLLItem<T>;

      dll.appendAfter(head, {name: 'test2'});
      expect(dll.length).to.be.eql(3);
    });

    it('should decrease the length if a node is removed from the list', () => {
      dll.push({name: 'test1'});
      dll.push({name: 'test2'});
      dll.push({name: 'test3'});
      dll.push({name: 'test4'});
      dll.push({name: 'test5'});

      const head = dll.head as DLLItem<T>;
      const node3 = (head.next as DLLItem<T>).next as DLLItem<T>;
      const tail = dll.tail as DLLItem<T>;

      expect(dll.length).to.be.eql(5);
      dll.remove(head);
      expect(dll.length).to.be.eql(4);
      dll.remove(node3);
      expect(dll.length).to.be.eql(3);
      dll.remove(tail);
      expect(dll.length).to.be.eql(2);
    });
  });

  describe('.map()', () => {
    it('should iterate through the entire chain and return an array of returned values from callback', () => {
      const dll = new DLL<T>();
      new Array(10).fill(0).forEach((_, i) => {
        dll.push({name: `item_${i}`});
      });

      const mapped = dll.map<string>(({name}, i) => {
        expect(name).to.be.eql(`item_${i}`);

        return name;
      });

      mapped.forEach((item, i) => {
        expect(item).to.be.eql(`item_${i}`);
      });
    });
  });

  describe('.unshift()', () => {
    it('should add the new item to the head of DLL chain', () => {
      const dll = new DLL<string>();

      dll.push('test1');

      dll.unshift('test0');

      expect((dll.head as DLLItem<string>).data).to.be.eql('test0');
      expect(dll.length).to.be.eql(2);
    });

    it('should add a new item even if the DLL chain is empty', () => {
      const dll = new DLL<string>();

      dll.unshift('test0');

      expect((dll.head as DLLItem<string>).data).to.be.eql('test0');
      expect(dll.length).to.be.eql(1);
    });
  });

  describe('.appendAfter()', () => {
    let dll: DLL<string>;

    beforeEach(() => {
      dll = new DLL<string>();
    });

    it('should insert the given data after the given node', () => {
      const node1 = dll.push('test1');
      dll.push('test3');

      dll.appendAfter(node1, 'test2');

      // remove the first node
      dll.shift();

      // second node must be test2
      const node2 = dll.shift() as string;
      expect(node2).to.be.eql('test2');

      dll.unshift('test1');

      expect((dll.tail as DLLItem<string>).data).to.be.eql('test3');
    });

    it('should reset the tail node, if the new node is appended to a tail node', () => {
      dll.push('test1');

      const node = dll.appendAfter(dll.tail, 'test2');
      expect(node).to.be.eql(dll.tail);
    });

    it('should set head and tail node, if tried to append to an empty list', () => {
      const node = dll.appendAfter(dll.tail, 'test1');

      expect(node).to.be.eql(dll.head);
      expect(node).to.be.eql(dll.tail);
    });

    it('should throw if the dll is not empty and null is passed as node', () => {
      expect(() => {
        dll.push('test1');

        dll.appendAfter(null, 'tes2');
      }).to.throw();
    });
  });

  describe('.clear()', () => {
    it('should clear all the elements in the list', () => {
      const dll = new DLL<string>();

      dll.push('test1');
      dll.push('test2');
      dll.push('test3');

      expect(dll.head).not.to.be.null;
      expect(dll.tail).not.to.be.null;
      expect(dll.length).to.be.eql(3);

      dll.clear();

      expect(dll.head).to.be.null;
      expect(dll.tail).to.be.null;
      expect(dll.length).to.be.eql(0);
    });
  });
});
