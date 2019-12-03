# node-dll [![Coverage Status](https://coveralls.io/repos/github/AkashBabu/node-dll/badge.svg?branch=master)](https://coveralls.io/github/AkashBabu/node-dll?branch=master) [![Build Status](https://travis-ci.com/AkashBabu/node-dll.svg?branch=master)](https://travis-ci.com/AkashBabu/node-dll) [![Maintainability](https://api.codeclimate.com/v1/badges/c7054adbf0195cce8778/maintainability)](https://codeclimate.com/github/AkashBabu/node-dll/maintainability)
DLL(Doubly linked list) implementation for javascript projects

## Introduction
Doubly linked list(DLL) is inevitable in certain situation where performance is preferred while slicing an array (maybe there are more to it, but this is mostly my PoV).
So this library was created with a simple, yet powerful interface for interacting with the underlying `DLL` schema.

This library is written in typescript for robust APIs and type support.

Every aspect was desgined and thought carefully to minimize introducing new bugs.

## Documentation
API method name has been carefully chosen to nearly match Array methods, such that learning curve is least and adaptability is higher. But a few methods couldn't have had a different name and we had to convince ourselves with those method name.

### API - DLL

```JS
import {DLL} from 'node-dll';
```

#### constructor():   
This creates a new instance of `DLL`

Example:  

```JS
const dll = new DLL();
```

#### .head
Returns the first item in the list

Example:

```JS
const dll = new DLL()
dll.push('test')

dll.head // => DLLItem<'test'>
```

#### .tail
Returns the last item in the list

Example:

```JS
const dll = new DLL()
dll.push('test1')
dll.push('test2')

dll.tail // => DLLItem<'test2'>
```


#### .shift()
Removes and returns the first item in the list

Example:

```JS
const dll = new DLL()
dll.push('test1')
dll.push('test2')

dll.shift() // => 'test1'

dll.length // => 1
```


#### .unshift()
Adds the given item to the head of DLL chain

Example:

```JS
const dll = new DLL()
dll.push('test1')
dll.unshift('test0')

dll.getHead() // => DLLItem<'test1'>

dll.length // => 2
```

#### .forEach(cb)
Iterates through the entire DLL chain

Example:

```JS
const dll = new DLL()
dll.push('test1')
dll.push('test2')

dll.forEach((data, i) => {
  console.log(data, i)
})

// => test1 0
// => test2 1
```

#### .map(cb)
Iterates through the entire DLL chain and returns a resultant array

Example:

```JS
const dll = new DLL()
dll.push('test1')
dll.push('test2')

const results = dll.map((data, i) => {
  return `${i + 1}) ${data}`;
})

console.log(results) // => ['1) test1', '2) test2']
```

#### .push(data) 
Adds the given item to the tail of DLL chain and returns the added item, such that the same can be used to remove the item from the list

Example:

```JS
const dll = new DLL()

const item = dll.push('test1')

dll.length // => 1
dll.getHead() // => DLLItem<'test1'>

dll.remove(item)

dll.length // => 0
```

#### .appendAfter(dllItem, data) 
Adds the given item next to the given dllItem in DLL chain and returns the added item, such that the same can be used to remove the item from the list

Example:

```JS
const dll = new DLL()

const item1 = dll.push('test1')
dll.push('test3')

const item2 = dll.appendAfter(item1, 'test2')
item2.data // => 'test2'

dll // => test1 <-> test2 <-> test3 
```

#### .remove(dllItem)
Removes the given item from DLL chain and returns true if the removal was successful

Example:

```JS
const dll = new DLL()

const item = dll.push('test1')

dll.length // => 1
dll.getHead() // => DLLItem<'test1'>

dll.remove(item) // => true

dll.length // => 0
```

#### .clear()
Removes all the items in the DLL chain

Example:

```JS
const dll = new DLL()

dll.push('test1')
dll.push('test2')

dll.length // => 2

dll.clear()

dll.length // => 0
```

### API - DLLItem
DLLItem has a readonly access to `prev` and `next` properties, this is to ensure that the user doesn't change them by mistake, which can introduce bugs and be very hard to debug.

#### .data
Set / get data value on the DLLItem via this property

Example:
```TS
const dll = new DLL<string>()

const dllItem = dll.push('test')

dllItem.data // => 'test'
dllItem.data = 'fake'

const head = dll.head
head.data // => 'test'
```

#### .prev
Get prev value on the DLLItem via this property

Example:
```TS
const dll = new DLL<string>()

dll.push('test1')
const dllItem = dll.push('test2')

dllItem.data // => 'test2'

dllItem.prev.data // => 'test1'
```

#### .next
Get next value on the DLLItem via this property

Example:
```TS
const dll = new DLL<string>()

const dllItem = dll.push('test1')
dll.push('test2')

dllItem.data // => 'test1'

dllItem.next.data // => 'test2'
```

## Contribution

All contributions are welcome!!!

But before raising any issue, please check the issue-tracker in github if there is any matching issues already in the pipeline, if not then please go ahead and raise your own.

PR Guidelines:
- Make sure to include corresponding test cases
- Be generous on code comments
- Write documentation if necessary
- Wait for your approval 😜

## Licence

MIT