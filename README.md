# RingCentral JavaScript Style Guide

React-specific guidelines described at [RingCentral React Style Guide](https://github.com/ringcentral/ringcentral-javascript/tree/master/react-style-guide)

## Table of contents

1. [Overview](#overview)
1. [Language statements and features](#language-statements-and-features)
1. [Spaces and alignments](#spaces-and-alignments)
1. [Naming](#naming)

## Overview

This document provides a set of common rules regarding to source code in JavaScript.
It allow us to make and keep our codebase well organized and maintainable. 

## Language statements and features

### Use brackets for all control constructs

use brackets for all control constructs like ```if```, ```else```, ```try```, ```for```, ```while```. Even for one liners

> Reason: using brackets makes code as predictable as possible. It avoid bugs caused to forgotten bracket by misprint. Also it's don't require developer to add/remove brackets when body of construct transform from one line to multi-line form and vice versa. It makes diffs more clear.

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

### Use separate ```var``` / ```const``` / ```let``` declaration per variable

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

// GOOD
if (foo) {
    let result = true;
}

// BAD
for (var i=0; i<AMOUNT; i++) {
    var item = foo[i];
}

// GOOD
for (let i=0; i<AMOUNT; i++) {
    let item = foo[i];
}
``` 

### Don't define functions inside block

```javascript
// BAD
function qux() {
    if (foo) {
        function bar() {
            // ...
        }
        // ...
        bar();
    }
}

// GOOD
function qux() {
    if (foo) {
        // ...
        bar();
    }
}

function bar() {
    // ...
}

// GOOD, but avoid inner functions
function qux() {
    if (foo) {
        // ...
        bar();
    }
    
    function bar() {
        // ...
    }
}

```

### Prefer ```let``` vs ```var```

> Reason: ```let``` is block scoped, vs ```var``` is function scoped. Using unassigned ```let``` variable cause an ```ReferenceError``` exception, but unassigned ```var``` still work silently without warnings and may cause hard to reproduce bugs. One more reason to use ```let``` is that redeclaration the same variable will trigger ```SyntaxError``` versus silent continuation of execution with ```var``` declaration

```javascript
// BAD
function foo() {
    var bar = baz();
    // ...
    var bar = null; // work
}

// GOOD
function foo() {
    let bar = baz();
    // ...
    let bar = baz(); // SyntaxError exception prevent re-declaration
}

// BAD
function foo() {
    baz(bar); // work, bar === undefined
    // ...
    var bar = 'bar'; 
}

// GOOD
function foo() {
    baz(bar); // SyntaxError
    // ...
    let bar = 'bar'; 
}
```

### Put dot ```.``` before the property, don't leave it at the end of line

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

### Make function calls clear and predictable

```javascript
// BAD 
condition && foo();

// GOOD
if (condition === true) {
    foo();
}

// BAD 
isCondition && foo();

// GOOD
if (isCondition) {
    foo();
}

```

### Put all non dynamic imports at the top of file

> Reason: it's improve file navigation

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

### Avoid using nested functions

> Reason: it bad for testing and maintaining. It's always better to make separate, outer-scope free functions and methods instead of mash of inner functions. 

### Do not leave console calls

Do not leave console calls in your code

### Do not leave commented code, just remove it

> Reason: it just a noise for other developers. We always can find anything using history of version control system.

## Spaces and alignments

### Do not exceed 120 column width

> Reason: It's hard to read and maintain

Exception: long links and international strings can exceed that limitation

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

### Set one space before function body curly bracket ```{```, do not set space after function name

```javascript
// BAD
function isFooBar () {
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
if(isValid) {
    foo();
}else if(quux < 0){
    bar();
    baz();
}

// GOOD
if (isValid) {
    foo();
} else if (quux < 0) {
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

### Do not new line before ```else``` or ```else if```

```javascript
// BAD
if (isFoo(bar)) {
    foo();
}
else {
    bar();
}

// GOOD
if (isFoo(bar)) {
    foo();
} else {
    bar();
}

// BAD
if (isFoo(bar)) {
    foo();
} else if (quux > baz)
{
    bar();
}
else {
    bar();
    barBaz();
}

// GOOD
if (isFoo(bar)) {
    foo();
} else if (quux > baz) {
    bar();
} else {
    bar();
    barBaz();
}
``` 

## Naming

Naming should be expressive. It should be maximally clear and avoid unnecessary abbreviations.

*ClassName* should be same as *ClassName*.js. Avoid multiple classes per file.
*ClassName* should begin with Letter in upper case.
```javascript
// GOOD
ThingsStore.js
Logger.js
```

*methodName* should be verbs like and be in *camelCase*
```javascript
// GOOD
sumbitMessage(message) { /* */ }
save(data) {/* */ }
hasMessages() { /* */ }
```

*variableName* should be in *camelCase*
```javascript
// GOOD
let store = new Store();
let formatParser = getParser();
```

*ENUMERIC_CONSTANTS* should be *ALL_IN_UPPER_CASE*
```javascript
// GOOD
const MODE_EDIT = 'MODE_EDIT';
const PARSER_ID_MARKDOWN = 14;
```

Boolean variables and methods who returns Boolean values should contains verb prefix (```has```, ```is```, ```should```, etc.)
```javascript
// GOOD
const isValid = isEmail(email);

// GOOD
let canProceedFlow = this.getListLength() > 0;

isUserAuthorized() {
    if ( /* */ ) {
        return true;        
    }
}
``` 

### Handlers naming

To make handlers organized keep following rules:  

use `handle` prefix for class members

use `on` prefix for component props

use action right away after prefix `onClickButton` no `onButtonClick`

use first-verb form of words in names

```javascript
export class MyAwesomeComponent extends React.PureComponent {
    
    // ...
    
    // GOOD
    handleClose = () => {
        // event handler logic
    };
    
    // GOOD
    handleClickNextButton = event => {
        // event handler logic
    };
    
    // GOOD
    handleClickPrevButton = event => {
        // event handler logic
    };
    
    // ALSO GOOD
    handleConnectMediaStreamView = payload => {
        // event handler logic
    };
    
    // STILL GOOD
    handleChangeStreamQuality = nextValue => {
        // event handler logic
    };
    
    render() {
        return (
            <Panel closable onClose={this.handleClose}>
                <MediaStreamView
                    stream={this.getStream()}
                    onConnect={this.handleConnectMediaStreamView}
                    onChangeStreamQuality={this.handleChangeStreamQuality}
                />
                <Button onClick={this.handleClickPrevButton}Prev</Button>
                <Button onClick={this.handleClickNextButton}>Next</Button>
            </Panel>
        );
    }
}
```

### renderXXX

For better navigation, use `render` prefix for any method who returns JSX or component.  
Of course it is possible to use another prefixes like `get` or even `display`, but in terms of React we recommend to use `renderXXX`.

```javascript
export class MyCompositeComponent {
    
    // ...
    
    // GOOD
    renderHeaderToolbar() {
        return (
            <HeaderToolbar>
                <Action name="like">Like</Action>
                <Action name="pin">Pin</Action>
                <Action name="share">Share</Action>
            </HeaderToolbar>
        );
    }
    
    // GOOD
    renderImageBlock() {
        let {url, title, description} = this.props;
        
        return (
            <Block>
                <h3>{title}</h3>
                <p>{description}</p>
                <Image src={url} />
            </Block>
        );
    }
    
    render() {
        return (
            <div>
                {this.renderHeaderToolbar()}
                {this.renderImageBlock()}
            </div>
        );
    }
}
```
