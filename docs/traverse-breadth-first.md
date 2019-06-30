## [literable].traverseBreadthFirst
Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

#### Overloads
* [traverseBreadthFirst(childSelector)](#[traverseBreadthFirst(childSelector)): Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
* [traverseBreadthFirst(childSelector, resultSelector)](#[traverseBreadthFirst(childSelector,-resultSelector)): Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level and invokes a result selector function on each element therein.

### traverseBreadthFirst(childSelector)
Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

#### Parameters
* **childSelector**: A function to transform each element into the child sequence.
* **result**: A new `Literable` that contains all nodes.

#### Examples
The following code examples demonstrates how to use TraverseBreadthFirst to traverse a tree.

```javascript
const Literable = require('literable');

const document = Literable.from([{
    name: 'html',
    childs: [{
        name: 'head',
        childs: [{
            name: 'title',
            childs: [],
        }],
    }, {
        name: 'body',
        childs: [],
    }],
}]);

const nodes = document.traverseBreadthFirst(node => node.childs)
    .select(node => node.name)
    .toArray();

console.log(nodes);

// This code produces the following output:
//
// [ 'html', 'head', 'body', 'title' ]
```

### traverseBreadthFirst(childSelector, resultSelector)
Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level and invokes a result selector function on each element therein.

#### Parameters
* **childSelector**: A function to transform each element into the child sequence.
* **resultSelector**: A function to transform the final accumulator value into the result value.
* **result**: A new `Literable` that contains all nodes.

#### Examples
The following code examples demonstrates how to use TraverseBreadthFirst to traverse a tree.

```javascript
const Literable = require('literable');

const document = Literable.from([{
    name: 'html',
    childs: [{
        name: 'head',
        childs: [{
            name: 'title',
            childs: [],
        }],
    }, {
        name: 'body',
        childs: [],
    }],
}]);

const nodes = document.traverseBreadthFirst(node => node.childs, (node, level) => `${level} [${node.name}]`).toArray();

console.log(nodes);

// This code produces the following output:
//
// [ '0 [html]', '1 [head]', '1 [body]', '2 [title]' ]
```
