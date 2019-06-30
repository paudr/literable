## [literable].first
Returns the first element of a sequence.

#### Overloads
* [first()](#[first()): Returns the first element of a sequence.
* [first(match)](#[first(match)): Returns the first element in a sequence that satisfies a specified condition.

### first()
Returns the first element of a sequence.

#### Parameters
* **result**: The first element in the specified sequence.

#### Examples
The following code example demonstrates how to use First to return the first element of a `Literable`.

```javascript
const Literable = require('literable');

const numbers = Literable.from([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 435, 67, 12, 19]);
const first = numbers.first();

console.log(first);

/*
 This code produces the following output:

 9
*/
```

### first(match)
Returns the first element in a sequence that satisfies a specified condition.

#### Parameters
* **match**: A function to test each element for a condition.
* **result**: The first element in the sequence that passes the test in the specified predicate function.

#### Examples
The following code example demonstrates how to use First to return the first element of an array that satisfies a condition.

```javascript
const Literable = require('literable');

const numbers = Literable.from([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 435, 67, 12, 19]);
const first = numbers.first(number => number > 80);

console.log(first);

/*
 This code produces the following output:

 92
*/
```
