## [literable].last
Returns the last element of a sequence.

#### Overloads
* [last()](#[last()): Returns the last element of a sequence.
* [last(predicate)](#[last(predicate)): Returns the last element of a sequence that satisfies a specified condition.

### last()
Returns the last element of a sequence.

#### Parameters
* **result**: The value at the last position in the source sequence.

#### Examples
The following code example demonstrates how to use Last to return the last element of an `Literable`.

```javascript
const Literable = require('literable');

const numbers = Literable.from([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 67, 12, 19]);
const last = numbers.last();

console.log(last);

/*
 This code produces the following output:

 19
*/
```

### last(predicate)
Returns the last element of a sequence that satisfies a specified condition.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **result**: The last element in the sequence that passes the test in the specified predicate function.

#### Examples
The following code example demonstrates how to use Last to return the last element of an array that satisfies a condition.

```javascript
const Literable = require('literable');

const numbers = Literable.from([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 67, 12, 19]);
const last = numbers.last(num => num > 80);

console.log(last);

/*
 This code produces the following output:

 87
*/
```
