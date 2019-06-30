## [literable].traverseDepthFirst
Traverse over elements exploring as far as possible along each branch before backtracking.

#### Overloads
* [traverseDepthFirst(childSelector)](#[traverseDepthFirst(childSelector)): Traverse over elements exploring as far as possible along each branch before backtracking.
* [traverseDepthFirst(childSelector, resultSelector)](#[traverseDepthFirst(childSelector,-resultSelector)): Traverse over elements exploring as far as possible along each branch before backtracking and invokes a result selector function on each element therein.

### traverseDepthFirst(childSelector)
Traverse over elements exploring as far as possible along each branch before backtracking.

#### Parameters
* **childSelector**: A function to transform each element into the child sequence.
* **result**: A new `Literable` that contains all nodes.

#### Examples
The following code examples demonstrates how to use TraverseDepthFirst to traverse a tree.

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

const nodes = document.traverseDepthFirst(node => node.childs)
    .select(node => node.name)
    .toArray();

console.log(nodes);

// This code produces the following output:
//
// [ 'html', 'head', 'title', 'body' ]
```

### traverseDepthFirst(childSelector, resultSelector)
Traverse over elements exploring as far as possible along each branch before backtracking and invokes a result selector function on each element therein.

#### Parameters
* **childSelector**: A function to transform each element into the child sequence.
* **resultSelector**: A function to transform the final accumulator value into the result value.
* **result**: A new `Literable` that contains all nodes.

#### Examples
The following code examples demonstrates how to use TraverseDepthFirst to traverse a tree.

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

const nodes = document.traverseDepthFirst(node => node.childs, (node, level) => `${level} [${node.name}]`).toArray();

console.log(nodes);

// This code produces the following output:
//
// [ '0 [html]', '1 [head]', '2 [title]', '1 [body]' ]
```
