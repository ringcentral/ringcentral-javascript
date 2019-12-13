import * as React from 'react';

export const Foo = () => <div>Foo!</div>;
Foo.displayName = 'Foo';

const bar = {foo: {baz: 'qux'}};
const baz = bar?.foo?.baz;
