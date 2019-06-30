## [literable].lastOrDefault
Returns the last element of a sequence, or a default value if no element is found.

#### Overloads
* [lastOrDefault(defaultValue)](#[lastOrDefault(defaultValue)): Returns the last element of a sequence, or a default value if the sequence contains no elements.
* [lastOrDefault(predicate, defaultValue)](#[lastOrDefault(predicate,-defaultValue)): Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

### lastOrDefault(defaultValue)
Returns the last element of a sequence, or a default value if the sequence contains no elements.

#### Parameters
* **defaultValue**: The value to return if the sequence is empty.
* **result**: `defaultValue` if the sequence is empty; otherwise, the last element in the `Literable`.

#### Examples
The following code example demonstrates how to use LastOrDefault on an empty array.

```javascript
const Literable = require('literable');

const fruits = Literable.from([]);
const last = fruits.lastOrDefault('');

console.log(`The last fruit is "${last.toUpperCase()}".`);

/*
 This code produces the following output:

 The last fruit is "".
*/
```

### lastOrDefault(predicate, defaultValue)
Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **defaultValue**: The value to return if the sequence has no elements that satisfies predicate.
* **result**: `defaultValue` if the sequence has no elements that satisfies predicate; otherwise, the last element in the `Literable`.

#### Examples
The following code example demonstrates how to use LastOrDefault by passing in a predicate.

```javascript
const Literable = require('literable');

const numbers = Literable.from([49.6, 52.3, 51.0, 49.4, 50.2, 48.3]);

const last50 = numbers.lastOrDefault(n => Math.round(n) === 50, -1);

console.log(`The last number that rounds to 50 is ${last50}.`);

const last40 = numbers.lastOrDefault(n => Math.round(n) === 40, -1);

console.log(`The last number that rounds to 40 is ${last40 === -1 ? "<DOES NOT EXIST>" : last40}.`);

/*
 This code produces the following output:

 The last number that rounds to 50 is 50.2.
 The last number that rounds to 40 is <DOES NOT EXIST>.
*/
```
