import { expect } from 'chai';
import DLLItem from '../src/lib/dllItem';

describe('DLLItem', () => {
  it('should set value, prevNode and nextNode when a constructor is called', () => {
    const prevNode = new DLLItem<string>('prev', null, null);
    const nextNode = new DLLItem<string>('prev', null, null);

    const dllItem = new DLLItem<string>('test1', prevNode, nextNode);

    expect(dllItem.data).to.be.eql('test1');
    expect(dllItem.prev).to.be.eql(prevNode);
    expect(dllItem.next).to.be.eql(nextNode);
  });
});
