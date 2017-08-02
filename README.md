# RingCentral JavaScript Style Guide

## Table of contents

1. [Overview](#overview)
1. [Language statements and features](#language-statements-and-features)
1. [Spaces and alignments](#spaces-and-alignments)

## Overview

This document provides a set of common rules regarding to source code in JavaScript.
It allow us to make and keep our codebase well organized and maintainable. 

## Language statements and features

### Use brackets for all control constructs

use brackets for all control constructs like ```if```, ```else```, ```try```, ```for```, ```while```. Even for one liners

> Reason: using brackets makes code as predictable as possible. It avoid bugs caused to forgotten bracket by misprint. Also it's don't require developer to add/remove brackets when body of construct transform to multi lines from one line and vice versa. It makes diffs more clear.

```javascript
// BAD
let bar = [];
if (isValid(foo)) bar.push('bar');

// BAD
if (isValid(foo))
    bar.push('bar');

// BAD
for (let i=0; i<AMOUNT; i++) bar.push(i);

// GOOD
if (isValid(foo)) {
    bar.push('bar');
}

// GOOD
for (let i=0; i<AMOUNT; i++) {
    bar.push(i);
}
```

### Always add semicolon ```;``` at the end of statements

```javascript
// BAD
let foo = 'foo'
let bar = ['bar', 'baz']

// GOOD
let foo = 'foo';
let bar = ['bar', 'baz'];
```

### Use separate var/const/let declaration per variable

> Reason: it allows to avoid bugs with global scope variables (caused by misprinted comma). It's easier to maintain. It makes diffs more clear.

```javascript
// BAD
const FOO = 'FOO',
    BAR = 17;
let foo, bar = 17;

// GOOD
const FOO = 'FOO';
const BAR = 17;
let foo;
let bar = 17;
```

### Use strict comparison operator to avoid potential type-casting bugs

```javascript
// BAD
if (foo == '') {
    bar();
}
if (foo == null) {
    bar();
}

// GOOD
if (foo === '') {
    bar();
}
if (foo === null) {
    bar();
}
```

### Do not reassign variables inside ```if```, ```while```, etc.

It easy to misprint and leads to bugs

```javascript
// BAD
if (foo.bar = baz) {
    calculate();
}

// GOOD
foo.bar = baz;
if (foo.bar === true) {
    calculate();
}
```

### Don't use ```var``` inside block

It's a bad practice and may cause scope side bugs. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) for reference.
For block-scoped definition use ```const``` or ```let```.

```javascript
// BAD
if (foo) {
    var result = 'foo';
}
return result;

// GOOD
var result;
if (foo) {
    result = true;
}
return result;

```

### Put dot before the property, don't leave it at the end of line

```javascript
// BAD
model.
    foo().
    bar().
    baz;

// GOOD
model
    .foo()
    .bar()
    .baz();

// BAD
expect(actualValue, 'should contains foo, bar').
    to.have.ordered.members(['foo', 'bar']);
    
// GOOD
expect(actualValue, 'should contains foo, bar')
    .to.have.ordered.members(['foo', 'bar']);
```

### Do not exceed 120 column width

> Reason: It's hard to read and maintain

### Do not use ternary inside ternary - no nested ternary

It's really hard to maintain such code

```javascript
// BAD
let result = foo < bar ? foo : (foo > baz ? 'FOO' : baz);

// GOOD
let result;
if (foo < bar) {
    result = foo;
} else {
    result = foo > baz ? 'FOO' : baz;
}
```

### Do not use ```with``` statement

Do not use ```with``` statement - it cause of confusing and bad maintainable code

```javascript
// BAD
with (_) {
    trace(sort(bar), trim(baz));
}

// GOOD
trace(_.sort(bar), _.trim(baz));
```

### Do not leave console calls

Do not leave console calls in your code

### Do not leave commented code, just remove it

> Reason: it just a noise for other developers. We always can find anything using history of version control system.

## Spaces and alignments

### Do not align values horizontally

> Reason: alignment may increase readability for some cases, but it's a root of few problems. It bad for maintaining, because of change of one line can trigger realignment of all nearest aligned lines. So, owner of such change will mislead reviewers, and makes commits history dirty. Also it cause a redundant merge conflicts.

```javascript
// BAD
let foo = {
    first:          'foo',
    second:         'bar',
    thisOneIsLong:  'baz'
};

// GOOD
let foo = {
    first: 'foo',
    second: 'bar',
    thisOneIsLong: 'baz'
};
```

### Do not add blank lines on beginning or ending functions

```javascript
// BAD
function foo(baz) {

    const bar = 5;
    return bar * baz;

}

// GOOD
function foo(baz) {
    const bar = 5;
    return bar * baz;
}
```

### Set one space before function body curly bracket ```{```, do not set space after function name

```javascript
// BAD
function isFooBar () {
    // ...
}

// BAD
function isFooBar(){
    // ...
}

// GOOD
function isFooBar() {
    // ...
}
```

### Set one space before nearly curly brackets ```{``` followed by keywords: (```do```, ```for```, ```if```, ```else```, etc.)

```javascript
// BAD
if (isValid){
    // ...
}

// GOOD
if (isValid) {
    // ...
}

// BAD
while (foo > bar){
    // ...
}

// GOOD
while (foo > bar) {
    // ...
}
```

### Set one space around keywords (```do```, ```for```, ```if```, ```else```, etc.)

```javascript
// BAD
if(isValid) {
    foo();
}else{
    bar();
    baz();
}

// GOOD 
if (isValid) {
    foo();
} else {
    bar();
    baz();
}

// BAD
for(const foo of listFoo) {
    bar(foo);
}

// GOOD
for (const foo of listFoo) {
    bar(foo);
}
```
