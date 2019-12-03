import { expect } from 'chai';
import DLLItem from '../src/lib/dllItem';
import DLLItemAccessRestrictor, { AccessRestrictedDLLItem } from '../src/lib/dllItemAccessRestrictor';

interface T {
  name: string;
  age?: number;
}

describe('DLLItemAccessRestrictor', () => {
  it('should provide read access on prev and next properties and r/w access on data property', () => {
    const dllItemAccessRestrictor = new DLLItemAccessRestrictor<T>();

    const prevNode = new DLLItem<T>({name: 'prev'}, null, null);
    const nextNode = new DLLItem<T>({name: 'next'}, null, null);
    const dllItem = new DLLItem<T>({name: 'test1'}, prevNode, nextNode);

    const accessRestrictedDllItem = dllItemAccessRestrictor.revokeAccess(dllItem);

    expect(
      accessRestrictedDllItem.prev instanceof AccessRestrictedDLLItem,
    ).to.be.true;
    expect((accessRestrictedDllItem.prev as AccessRestrictedDLLItem<T>).data).to.be.eql(prevNode.data);

    expect(
      accessRestrictedDllItem.next instanceof AccessRestrictedDLLItem,
      ).to.be.true;
    expect((accessRestrictedDllItem.next as AccessRestrictedDLLItem<T>).data).to.be.eql(nextNode.data);

    accessRestrictedDllItem.data = {name: 'test2'};
    expect(accessRestrictedDllItem.data.name).to.be.eql('test2');

    accessRestrictedDllItem.data.name = 'test3';
    expect(accessRestrictedDllItem.data.name).to.be.eql('test3');

    dllItem.next = dllItem.prev = null;
    expect(accessRestrictedDllItem.prev).to.be.null;
    expect(accessRestrictedDllItem.next).to.be.null;
  });

  it('should allow modifications to nested property in `data`', () => {
    const dllItemAccessRestrictor = new DLLItemAccessRestrictor<T>();

    const dllItem = new DLLItem<T>({ name: 'test', age: 21 }, null, null);
    const accessRestrictedDllItem = dllItemAccessRestrictor.revokeAccess(dllItem);
    expect(accessRestrictedDllItem.data.name).to.be.eql('test');
    expect(accessRestrictedDllItem.data.age).to.be.eql(21);

    accessRestrictedDllItem.data.name = 'changed';

    expect(accessRestrictedDllItem.data.name).to.be.eql('changed');
    expect(accessRestrictedDllItem.data.age).to.be.eql(21);
  });
});
