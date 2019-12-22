# node-dll [![Coverage Status](https://coveralls.io/repos/github/AkashBabu/node-dll/badge.svg?branch=master)](https://coveralls.io/github/AkashBabu/node-dll?branch=master) [![Build Status](https://travis-ci.com/AkashBabu/node-dll.svg?branch=master)](https://travis-ci.com/AkashBabu/node-dll) [![Maintainability](https://api.codeclimate.com/v1/badges/c7054adbf0195cce8778/maintainability)](https://codeclimate.com/github/AkashBabu/node-dll/maintainability)
DLL(Doubly linked list) implementation for javascript projects

## Introduction
Doubly linked list(DLL) is inevitable in certain situation where performance is preferred while slicing an array (maybe there are more to it, but this is mostly my PoV).
So this library was created with a simple, yet powerful interface for interacting with the underlying `DLL` schema.

This library is written in typescript for robust APIs and type support.

Every aspect was desgined and thought carefully to minimize introducing new bugs.

## Documentation
API method name has been carefully chosen to nearly match Array methods, such that learning curve is least and adaptability is higher. But a few methods couldn't have had a different name and we had to convince ourselves with those method name.

## Installation 

> npm i @akashbabu/node-dll -S

## Sample usage

```TS
import {DLL, DLLItem} from '@akashbabu/node-dll';

const dll = new DLL<string>();

const dllItem: DLLItem<string> = dll.push('foo');
console.log(dllItem.data) // => foo

console.log(dll.length) // => 1

dll.remove(dllItem)
console.log(dll.length) // => 0

dll.push('foo')
dll.unshift('bar')

const headItem = dll.head
console.log(headItem.data) // => bar

const headData = dll.shift()
console.log(headData) // => bar

console.log(dll.head.data) // => foo

dll.clear()
console.log(dll.length) // => 0

const firstItem = dll.push('first')
dll.push('third')

dll.appendAfter(firstItem, 'second')

dll.forEach((item, i) => {
  console.log(`${i + 1}) ${item}`);
})
// => 1) first
// => 2) second
// => 3) third


console.log(dll.map((item, i) => `${i + 1}) ${item}`));
// => ["1) first", "2) second", "3) third"]

```

### API - DLL

#### new DLL<T>():   
This creates a new instance of `DLL`.  
T -> Denotes the type of data being saved in DLL

##### .head: DLLItem<T> | null
Returns the first item in the list

##### .tail: DLLItem<T> | null
Returns the last item in the list

##### .length: number
Returns the length of the list

##### .shift(): T | undefined
Removes and returns the first item in the list. Returns `undefined` if the list is empty

##### .unshift(data: T): void
Adds the given item to the head of DLL (same as Array.unshift logic)

##### .forEach(cb: (data: T, i: number) => void): void
Iterates through the entire DLL

##### .map<U>(cb: (data: T, i: number) => U): U[]
Iterates through the entire DLL and returns the resultant array.  
U -> Denotes the return type of `cb`(callback)

##### .push(data: T): DLLItem<T> 
Adds the given item to the tail of DLL and returns the added item

##### .appendAfter(dllItem: DLLItem<T>, data: T): DLLItem<T> 
Adds the given data after the given dllItem in DLL and returns the added item

##### .remove(dllItem: DLLItem<T>): boolean
Removes the given item from DLL and returns true if the removal was successful

##### .clear()
Removes all the items in the DLL

### API - DLLItem
DLLItem has a readonly access to `prev` and `next` properties, this is to ensure that the users doesn't change them unintentionally (which can mess up with the entire DLL) and hence less surface for bugs.

##### .data
Set / get data value on the DLLItem via this property

##### .prev
Get prev value on the DLLItem via this property

##### .next
Get next value on the DLLItem via this property


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