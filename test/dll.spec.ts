import { expect } from 'chai';
import { DLL, DLLItem } from '../src';

interface T {
  name: string;
}

describe('#DLL', () => {
  it('should be able to create a dll', () => {
    const dll = new DLL();
    expect(dll).to.have.keys(['head', 'tail', 'length']);
  });

  describe('.push()', () => {
    it('should be able to push an item', () => {
      const dll = new DLL();
      dll.push({ name: 'test' });

      const dllItem = dll.getHead();
      expect(dllItem).to.exist;
      expect((dllItem as DLLItem<any>).getValue().name).to.be.eql('test');
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
      expect(dllItem.getValue().name).to.be.eql('test');
    });

  });

  describe('.remove()', () => {
    it('should return true on successful removal', () => {
      const dll = new DLL();
      const dllItem = dll.push({ name: 'test' });

      expect(dll.remove(dllItem)).to.be.true;
    });

    it('should return false, when there are no items to be removed', () => {
      const dll = new DLL();

      expect(dll.remove(null as any)).to.be.false;
    });

    it('should be able to remove the first item', () => {
      const dll = new DLL<T>();
      const items: Array<DLLItem<T>> = [];
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        items.push(dll.push({ name: `test${i}` }));
      });

      expect(dll.remove(items[0])).to.be.true;

      const firstItem = dll.getHead();
      expect((firstItem as DLLItem<T>).getValue().name).to.be.eql('test1');
      expect(dll.length).to.be.eql(size - 1);
    });

    it('should be able to remove the last item', () => {
      const dll = new DLL<T>();
      const items: Array<DLLItem<T>> = [];
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        items.push(dll.push({ name: `test${i}` }));
      });

      expect(dll.remove(items[size - 1])).to.be.true;

      const lastItem = dll.getTail();
      expect((lastItem as DLLItem<T>).getValue().name).to.be.eql(`test${(size - 1) - 1}`);
      expect(dll.length).to.be.eql(size - 1);
    });

    it('should be able to remove any item in between first and last item', () => {
      const dll = new DLL<T>();
      const items: Array<DLLItem<T>> = [];
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        items.push(dll.push({ name: `test${i}` }));
      });

      const removeIndex = size / 2;
      expect(dll.remove(items[removeIndex])).to.be.true;

      dll.forEach(data => {
        expect(data.name).not.to.be.eql(`test${removeIndex}`);
      });

      expect(dll.length).to.be.eql(size - 1);
    });
  });

  describe('.getHead()', () => {
    it('should return the first item in the list', () => {
      const dll = new DLL<T>();
      const items: Array<DLLItem<T>> = [];
      const size = 10;
      Array(size).fill(0).forEach((_, i) => {
        items.push(dll.push({ name: `test${i}` }));
      });

      const firstItem = dll.getHead();
      expect(firstItem).to.be.eql(items[0]);
    });
    it('should return null when there are no items in the list', () => {
      const dll = new DLL();

      expect(dll.getHead()).to.be.null;
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
  });

  describe('.length', () => {
    it('should return the current number of items in the list', () => {
      const dll = new DLL<T>();
      expect(dll.length).to.be.eql(0);

      const dllItem1 = dll.push({ name: 'test1' });
      dll.push({ name: 'test2' });
      dll.push({ name: 'test3' });

      expect(dll.length).to.be.eql(3);

      expect(dll.remove(dllItem1)).to.be.true;
      expect(dll.length).to.be.eql(2);

      dll.shift();
      expect(dll.length).to.be.eql(1);
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
});
