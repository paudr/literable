## [literable].where

### where(predicate)
Filters a sequence of values based on a predicate.

#### Parameters
* **predicate**: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
* **result**: A new `Literable` that contains elements from the sequence that satisfy the condition.

#### Examples
The following code example demonstrates how to use Where to filter a sequence based on a predicate that involves the index of each element.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

const query = fruits.where(fruit => fruit.length < 6);

console.log(query.toArray());

// This code produces the following output:
//
// [ 'apple', 'mango', 'grape' ]
```

```javascript
const Literable = require('literable');

const numbers = Literable.from([0, 30, 20, 15, 90, 85, 40, 75]);

const query = numbers.where((number, index) => number <= index * 10);

console.log(query.toArray());

// This code produces the following output:
//
// [ 0, 20, 15, 40 ]
```
