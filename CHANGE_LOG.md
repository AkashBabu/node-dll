## v2.0.0
- adds `.appendAfter()` method, which enables the users to add a item anywhere in the DLL chain
- adds `.clear()` method, which can be used to clear all the items in the list
- maintains an internal state for tracking
- replaces `DLL.getHead() => .head` & `DLL.getTail() => .tail`
- made the API more robust by making `head, tail & length` as readonly params
- handles memory leakage issues
- refactored the code to be more readable
- adds more test cases for DLL
- adds test cases for DLLItem
- replaces `DLLItem.getValue() & DLLItem.setValue() => .data`, `DLLItem.getPrev() & DLLItem.setPrev() => .prev` & `DLLItem.getNext() & DLLItem.setNext() => .next`
- restricts the access to `prev` & `next` on DLLItem for security purposes and the enable bug-free code

## v1.1.0
- adds `.unshift()` method, which adds new item to the head of DLL chain 

## v1.0.0
- initial commit