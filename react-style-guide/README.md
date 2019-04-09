# RingCentral React Style Guide

## React specific

### Prefer composition vs inheritance

> Reason: Inheritance increases the complexity of the component. With inheritance, the code of particular component shared between different classes/layers and files, that negatively affects navigation too. Eventually, polymorphism is a powerful mechanism, but can negatively affect an understanding and maintaining of the component. Unlike inheritance, the composition makes a component structure "flat". Component properties and the ability to combine multiple components together is enough for most cases and provide a lot of flexibility.

Please read [this article](https://reactjs.org/docs/composition-vs-inheritance.html) for better understanding.

### Avoid to put multiple components in a single file

Even it's looks so small, just don't do it.

> Reason: It bad for code navigation. It's bad for component scale - the components grows eventually, and it's an extra work to split components by separate files when it's already has huge size. It's also cause extra merge conflicts. So, the better choice is always split components by separate files.

### Avoid large components

Ideally, it should not be more that 100 lines of code.

### Keep component methods and properties in specific order for better navigation
```render()``` should be the last method of class. Not the first, not in the middle. It should be last method.

```javascript
// BAD
class MyAwesomeComponent extends React.Component {
    getThing() {/* */}

    render() {/* */}

    handleClick() {/* */}
}

// GOOD
class MyAwesomeComponent extends React.Component {
    getThing() {/* */}

    handleClick() {/* */}

    render() {/* */}
}

```

Follow this order for class members

```javascript
// GOOD
class MyAwesomeComponent extends React.Component {
    
    static SOME_STATIC_CONSTANT;

    static propTypes = {/* */};
    static defaultProps = {/* */};
    static contextTypes = {/* */};

    static staticFoo() {/* */};

    constructor(props, context) {/* */}
    
    /* react lifecycle methods componentWillMount, etc... */

    methodFoo() {/* */}
    methodBar() {/* */}
    
    render() {/* */}
}
```

### Always specify prop types for your components

> Reason: it's a main component documentation and will be used by others developers. It's also satisfy editor's code autocomplete

```javascript
// BAD
class Foo extends React.Component {
    
    getBar() {
        if (!this.props.hasBar) {
            return null;
        }
        
        return <Bar />;
    }

    render() {
        return (
            <div>
                {this.getBar()}
                {this.props.message}
            </div>
        );
    }
}

// GOOD
class Foo extends React.Component {
    
    static propTypes = {
        hasBar: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
    };

   getBar() {
        if (!this.props.hasBar) {
            return null;
        }
        
        return <Bar />;
    }

    render() {
        return (
            <div>
                {this.getBar()}
                {this.props.message}
            </div>
        );
    }
}
```

### Always specify default prop types

When introduce optional property, make sure it has default value. Otherwise, component can work unpredictable.
> Exception: default event handlers can be omitted, React care about not specified event handlers callbacks.

```javascript
// BAD
class Foo extends React.Component {
    static propTypes = {
        hasBar: PropTypes.bool,
        message: PropTypes.string.isRequired,
    };

    getBar() {
        if (!this.props.hasBar) {
            return null;
        } 
        
        return <Bar />;
    }

    render() {
        return (
            <div>
                {this.getBar()}
                {this.props.message}
            </div>
        );
    }
}

// GOOD
class Foo extends React.Component {

    static propTypes = {
        hasBar: PropTypes.bool,
        message: PropTypes.string.isRequired,
    };

    static defaultProps = {
        hasBar: true,
    };

    getBar() {
       if (!this.props.hasBar) {
            return null;
        } 
        
        return <Bar />;
    }

    render() {
        return (
            <div>
                {this.getBar()}
                {this.props.message}
            </div>
        );
    }
}
```

### Never mutate state directly, only ```setState()``` allowed

```javascript
// BAD
foo(result) {
    let thingAttrs = this.state.thingState;
    if (result === BAR) {
        thingAttrs.buz = BAR;
        this.save(thingAttrs);
    }
}

// GOOD
foo(result) {
    let thingAttrs = {...this.state.thingAttrs};
    if (result === BAR) {
        thingAttrs.buz = BAR;
        this.save(thingAttrs);
    }
}
```

### Always specify ```key``` property for list components
 
see [lists-and-keys](https://facebook.github.io/react/docs/lists-and-keys.html)

for ```key``` property avoid using iterator indices to be side effects free.
see [index-as-a-key-is-an-anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)

```javascript
// BAD
const listItems = records.map((item) => <ListItem record={item} />);

// BAD (better, but still not good)
const listItems = records.map((item, index) => <ListItem record={item} key={index} />);

// GOOD
const listItems = records.map((item) => <ListItem record={item} key={item.id} />);
```

### Do not bind function inside ```render()``` and render-related functions
> Reason: it's bad from the performance perspective of view

For ```this``` binding use following pattern:

```javascript
// GOOD
class Foo extends React.Component {

    handleClickButton = event => {
        // 
    };
    
    render() {
        const {children} = this.props;
        return (
            <button onClick={this.handleClickButton}>
                {children}
            </button>
        );
    }
}
```

```javascript
// BAD
class Foo extends React.Component {

    handleClickButton(event) {
        // 
    }
    
    render() {
        const {children} = this.props;
        return (
            <button onClick={this.handleClickButton.bind(this)}>
                {children}
            </button>
        );
    }
}

// BAD
class Foo extends React.Component {

    handleClickButton(event) {
        // 
    }
    
    render() {
        const {children} = this.props;
        return (
            <button onClick={::this.handleClickButton}>
                {children}
            </button>
        );
    }
}

// BAD
class Foo extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        // well optimized, but bad for maintenance, 
        // because requires double declaration for each method
        this.handleClickButton = ::this.handleClickButton; 
    }

    handleClickButton(event) {
        // 
    }
    
    render() {
        const {children} = this.props;
        return (
            <button onClick={this.handleClickButton}>
                {children}
            </button>
        );
    }
}
```

### Avoid using ```forceUpdate()```

Prefer ```this.props``` and ```this.state``` changes. It's enough for most of cases. When You think You needs to call ```forceUpdate()``` think twice. Likely something goes wrong with such component and You needs to review it life cycle and usage.

### Avoid using ```refs```

Prefer declarative approach versus imperative.

Exception: It's ok to use refs for form elements.

### Avoid using context

> Reason: it increase coupling between components

### Do not use ```default``` keyword when export class

> Reason: ```default``` cause of increasing entropy of naming. Follow this rule we mostly keep the same components naming across application codebase

```javascript
// BAD
// Foo.js
export default class Foo extends React.Component {
    
}

// Bar.js
import fooComponent from './Foo';
// ...
    render() {
        return <fooComponent />;
    }
    
// Baz.js
import FooComponent from './Foo';
// ...
    render() {
        return <FooComponent />;
    }
    
// Quux.js
import ILikeThisName from './Foo';
// ...
    render() {
        return <ILikeThisName />;
    }
    
// Corge.js - names collision
import FooComponent from './Foo';
import FooComponentVariant from '../common/Foo';
// ...
    render() {
        return (
            <div>
                <FooComponent />
                <FooComponentVariant />
            </div>
        );
    }
```

```javascript

// GOOD
export class Foo extends React.Component {
    
}

// Bar.js
import {Foo} from './Foo';
// ...
    render() {
        return <Foo />;
    }

// Baz.js
import {Foo} from './Foo';
// ...
    render() {
        return <Foo />;
    }

// Quux.js
import {Foo} from './Foo';
// ...
    render() {
        return <Foo />;
    }

// Corge.js - names collision
import {Foo} from './Foo';
import {Foo as FooVariant} from '../common/Foo';
// ...
    render() {
        return (
            <div>
                <Foo />
                <FooVariant />
            </div>
        );
    }
```

### Use ```null``` vs ```undefined``` to omit component

> Reason: it's predictable when passed ```null``` into JSX tree. ```undefined``` may be cause of unexpected flow.

```javascript

// BAD
getFoo() {
    if (isCondition()) {
        return <Foo />;
    }
}

render() {
    return (
        <div>
            <Bar />
            {this.getFoo()}
        </div>
    );
}

// GOOD
getFoo() {
    if (!isCondition()) {
        return null;
    }
    
    return <Foo />;
}

render() {
    return (
        <div>
            <Bar />
            {this.getFoo()}
        </div>
    );
}

```

## Spaces and alignments

### For multi-line components put first property on separate new line

keep props alignment by following pattern

> Reason: all properties will be aligned in the same manner independently on component name (length).

```javascript
// BAD
<ListOfThings foo={bar}
              fooBar={baz}
              fooBarBaz />

// BAD
<ListOfThings foo={bar}
    fooBar={baz}
    fooBarBaz />

// GOOD
<ListOfThings
    foo={bar}
    fooBar={baz}
    fooBarBaz 
/>
```

### For multi-line components keep one property per line

```javascript
// BAD
<ListOfThings
    foo={bar}
    fooBar={baz} barBaz
    fooBarBaz />

// GOOD
<ListOfThings
    foo={bar}
    fooBar={baz}
    barBaz
    fooBarBaz 
/>

// GOOD
<ListOfThings foo={bar} barBaz>
    <MyAwesomeComponent />
<ListOfThings/>
```

### For multi-line components put closing bracket at new line

```javascript
// BAD
<MyAwesomeComponent
    foo={bar}
    baz />
    
// GOOD
<MyAwesomeComponent
    foo={bar}
    baz 
/>
    
// BAD
<MyAwesomeComponent
    foo={bar}
    baz
>
    <ListOfThings />
</MyAwesomeComponent>    
    
// GOOD
<MyAwesomeComponent
    foo={bar}
    baz>
    <ListOfThings />
</MyAwesomeComponent>
    
```

### Indent nested JSX

```javascript
// BAD
<Foo>
<Bar />
<Baz />
</Foo>


// GOOD
<Foo>
    <Bar />
    <Baz />
</Foo>
```

### Wrap component and components tree in round brackets

```javascript
// BAD
let header = <div>
    {messageBlock}
    {tabs}
</div>;

// BAD
let header = (<div>
    {messageBlock}
    {tabs}
</div>);

// GOOD
let header = (
    <div>
        {messageBlock}
        {tabs}
    </div>
);

// BAD
return <MyComponent foo={bar}>
    {messageBlock}
    {tabs}
</MyComponent>;

// GOOD
return (
    <MyComponent foo={bar}>
        {messageBlock}
        {tabs}
    </MyComponent>
);
```

## Do not use round brackets for single line components

```javascript
// BAD
let foo = (
    <Foo bar baz="baz" />
);

// GOOD
let foo = <Foo bar baz="baz" />

// BAD
return (
    <Foo bar baz="baz" />
);

// GOOD
return <Foo bar baz="baz" />;
```

### Do not add extra spacing for properties

```javascript
// BAD
<ListOfThings foo = { bar } />
<ListOfThings foo={ bar } />
<ListOfThings foo = {bar} />

// GOOD
<ListOfThings foo={bar} />
```
