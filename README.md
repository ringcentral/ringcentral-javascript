# RingCentral JavaScript Style Guide

React-specific guidelines described at [RingCentral React Style Guide](https://github.com/ringcentral/ringcentral-javascript/tree/master/react-style-guide)

## Table of contents

1. [Overview](#overview)
1. [Language statements and features](#language-statements-and-features)
1. [Spaces and alignments](#spaces-and-alignments)
1. [Naming](#naming)
1. [External libraries](#external-libraries)

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

### Prefer ```const``` / ```let``` vs ```var```

> Reason: ```const``` / ```let``` is block scoped, vs ```var``` is function scoped. Using unassigned ```const``` / ```let``` variable cause an ```ReferenceError``` exception, but unassigned ```var``` still work silently without warnings and may cause hard to reproduce bugs. One more reason to use ```const``` / ```let``` is that redeclaration the same variable will trigger ```SyntaxError``` versus silent continuation of execution with ```var``` declaration

```javascript
// BAD
function foo() {
    var bar = baz();
    // ...
    var bar = null; // work
}

// GOOD (to avoid implicit errors)
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

// GOOD (to avoid implicit errors)
function foo() {
    baz(bar); // SyntaxError
    // ...
    let bar = 'bar'; 
}
```

### Use trailing comma

For multi-line structures, the trailing comma is required. For oneline definitions it should not be used.

> Reason: it helps to make history and code review cleaner. It allows to move/remove the last element without changing a previous line.

```javascript
// BAD
let foo = {bar: 1, baz: 5,};
let bar = ['bar', 'baz',];

// GOOD
let foo = {bar: 1, baz: 5};
let bar = ['bar', 'baz'];

// BAD
let foo = {
    bar: 1,
    baz: 5,
    qux: 8
};
let bar = [
    'bar',
    'baz',
    'qux'
];

// GOOD
let foo = {
    bar: 1,
    baz: 5,
    qux: 8,
};
let bar = [
    'bar',
    'baz',
    'qux',
];
```

### Use separate ```const``` / ```let``` declaration per variable

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

> Reason: it's really hard to maintain such code

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
### Don't use else, if return stops function execution before
> Reason: it's necessary and makes code cleaner
```javascript
// BAD
const foo = () => {
    if (isBar) {
        return 'bar';
    } else {
        return 'baz';
    }
}

// GOOD
const foo = () => {
    if (isBar) {
        return 'bar';
    }
    
    return 'baz';
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

### Make the code more flat and plain
Each indent makes code's reading difficult. Return the result from the function as soon as possible.

```javascript
// BAD 
function getUserActions() {
    if (isActionsAvailable) {
        if (isUserEnabled) {
            return [/*some actions for enabled user*/];
        } else if (isUserDisabled) {
            return [/*some actions for disabled user*/];
        } else {
            return [/*other actions*/];
        }
    }
    return [];
}

// GOOD
function getUserActions() {
    if (!isActionsAvailable) {
        return [];
    }
    if (isUserEnabled) {
        return [/*some actions for enabled user*/];
    } 
    if (isUserDisabled) {
        return [/*some actions for disabled user*/];
    }
    return [/*other actions*/];
}


// BAD 
class SomePopup extends Component {
    renderFooter() {
        if (isFooterAvailable) {
            return (
                <Footer 
                    there="there" 
                    are="are"
                    many="many"
                    properties 
                    here
                />
            );
        }
        return null;
    }
}

// GOOD
class SomePopup extends Component {
    renderFooter() {
        if (!isFooterAvailable) {
            return null;
        }
        return (
            <Footer 
                there="there" 
                are="are"
                many="many"
                properties 
                here
            />
        );
    }
}
```

### Put all non dynamic imports at the top of file

> Reason: it improves a file navigation

### Prefer named export vs default export

> Reason: it saves exported variable names, makes imports, a refactoring and a navigation easier

```javascript

// BAD
export default class Foo {
    // ...
}

// GOD
export class Foo {
    // ...
}

````

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

### Use shorthand object properties
> Reason: it makes code cleaner
```javascript
// BAD
const foo = {
    a: a,
    b: b,
    c: function() {},
};

// GOOD
const foo = {
    a, 
    b,
    c() {},
};

```
<a name="move-shorthand-properties-up"></a>
[#](#move-shorthand-properties-up) Move shorthand properties up 
```javascript
// BAD
const foo = {
    c: 'bar',
    a,
    d: 'baz',
    b,
};

// GOOD
const foo = {
    a,
    b,
    c: 'bar',
    d: 'baz',
};
```
### Avoid using nested functions

> Reason: it bad for testing and maintaining. It's always better to make separate, outer-scope free functions and methods instead of mash of inner functions. 

### Do not leave console calls

Do not leave console calls in your code

### Do not leave commented code, just remove it

> Reason: it just a noise for other developers. We always can find anything using history of version control system.

### Specify `TODO` | `FIXME` comment with task id or username

> Reason: to not keep not evident and forgotten comments please specify a comment with a task id which is connected with a problem. If it's a light problem and you are going to solve it soon you can provide just your username. 
<details>
  <summary>Read more</summary>
  
  ---
  
  TODO is a useful tool for developers.
  There are a few cases when TODO comments could be added:
  
  * the developer is working on the task, and he noticed that part of his work is temporarily blocked (say, his particular task depends on API that not yet ready)
  * the developer is working on the task and noticed that he would like to make one/few little improvements later in the scope of this task. However, the task is already done and could be sent for code-review to the boost a process.
  * the developer detects some issue in the code and unable to fix it in the scope of his task, but he would like to improve the situation.
  
  **Do not leave anonymous TODO without the id**. Usually, anonymous TODO's live too long while it not linked to the issue tracking system.
  Signed TODO's increases the factor of responsibility. When the developer signs TODO it like a short-term note for the author. But, it also a flag that author is responsible to resolve it ASAP. Finally, it makes such part of code clear for reviewers.
  
  ---
  
</details>


```javascript

class UserService {
    // BAD
    getAllUsers() {
        // TODO implement when backend is ready
    }
        
    // GOOD
    getAllUsers() {
        // TODO [UIA-12345] implement when backend is ready
    }
    
    // GOOD (if you know that you will do it no later than two weeks)
    getAllUsers() {
       // TODO (trump.wang) implement when backend is ready
    }
    
    // GOOD (to add FIXME if you see some problem code)
    badMethod() {
        // FIXME [UIA-12345] rewrite this to a better structure
        // ...bad code
    }
}

```

## Spaces and alignments

### Do not exceed 120 column width

> Reason: it's hard to read and maintain

Exception: long links and international strings can exceed that limitation

### Do not align values horizontally

> Reason: alignment may increase readability for some cases, but it's a root of few problems. It bad for maintaining, because of change of one line can trigger realignment of all nearest aligned lines. So, owner of such change will mislead reviewers, and makes commits history dirty. Also it cause a redundant merge conflicts.

```javascript
// BAD
let foo = {
    first:          'foo',
    second:         'bar',
    thisOneIsLong:  'baz',
};

// GOOD
let foo = {
    first: 'foo',
    second: 'bar',
    thisOneIsLong: 'baz',
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

For better navigation, we recommend to use `render` prefix for any method which returns JSX or component.  

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
    
    // BAD - should be renderCommentsList
    getCommentsList() {
        let {id} = this.props;
        
        return <ResourceCommentsList resourceId={id} />;
    }
    
    render() {
        return (
            <div>
                {this.renderHeaderToolbar()}
                {this.renderImageBlock()}
                {this.getCommentsList()}
            </div>
        );
    }
}
```

## External libraries

### Prefer native js vs lodash

> Reason: lodash is a great library which contains a lot of useful functions but the modern js has the short identical part of this functionality so some lodash functions are excess alternative.

> Don't forget to check necessary browsers compatibility and turn on polyfills if it's needed.
```javascript
// BAD
_.each([1, 2, 3], callback); 
// GOOD
[1, 2, 3].forEach(callback); 
```
```javascript
// BAD
_.filter([1, 2, 3], callback);
// GOOD
[1, 2, 3].filter(callback);
```
```javascript
// BAD
_.compact([1, 2, 3, 0, false, '']);
// GOOD
[1, 2, 3, 0, false, ''].filter(Boolean);
```
```javascript
// BAD
_.map([1, 2, 3], callback);
// GOOD
[1, 2, 3].map(callback);
```
```javascript
// BAD
_.every([1, 2, 3], callback);
// GOOD
[1, 2, 3].every(callback);
```
```javascript
// BAD
_.some([1, 2, 3], callback);
// GOOD
[1, 2, 3].some(callback);
```
```javascript
// BAD
_.reduce([1, 2, 3], callback, 0);
// GOOD
[1, 2, 3].reduce(callback, 0);
```
```javascript
// BAD
_.concat([1, 2, 3], [4, 5, 6]);
// GOOD
[1, 2, 3].concat([4, 5, 6]);
```
```javascript
// BAD
_.indexOf([1, 2, 3], 1);
// GOOD
[1, 2, 3].indexOf(1);
```
```javascript
// BAD
_.includes([1, 2, 3], 1);
// GOOD
[1, 2, 3].includes(1);
```
```javascript
// BAD
const first = _.first([1, 2, 3]);
// GOOD
const [first] = [1, 2, 3];
```
```javascript
// BAD
_.join([1, 2, 3], '-');
// GOOD
[1, 2, 3].join('-');
```
```javascript
// BAD
_.reverse([1, 2, 3]);
// GOOD
[1, 2, 3].reverse();
```
```javascript
// BAD
_.uniq([1, 2, 3, 3, 2]);
// GOOD
[...new Set([1, 2, 3, 3, 2])];
```
```javascript
// BAD
_.isArray([1, 2, 3]);
// GOOD
Array.isArray([1, 2, 3]);
```
```javascript
// BAD
_.size([1, 2, 3]);
// GOOD
[1, 2, 3].length;
```
```javascript
// BAD
_.isEmpty([]);
// GOOD
[].length === 0;
````
```javascript
// BAD
_.bind(func, this);
// GOOD
func.bind(this);
```
```javascript
// BAD
_.isNaN(value);
// GOOD
Number.isNaN(value);
```
```javascript
// BAD
_.isUndefined(value);
// GOOD
value === undefined;
```
```javascript
// BAD
_.isEmpty(object);
// GOOD
Object.keys(object).length === 0;
```
```javascript
// BAD
const foo = _.assign({}, object1, object2);
// GOOD
const foo = {
    ...object1,
    ...object2,
};
```
```javascript
// BAD
const others = _.omit({a: 1, b: 2, c: 3, d: 4}, ['a', 'c']);
// GOOD
const {a, c, ...others} = {a: 1, b: 2, c: 3, d: 4};
```
```javascript
// BAD
_.isEmpty(object);
// GOOD
Object.keys(object).length === 0;
````
```javascript
// BAD
_.keys(object);
// GOOD
Object.keys(object);
```
```javascript
// BAD
_.values(object);
// GOOD
Object.values(object);
```
```javascript
// BAD
_.entries(object);
// GOOD
Object.entries(object);
```
```javascript
// BAD
_.trim(' 123 ');
// GOOD
' 123 '.trim();
```
