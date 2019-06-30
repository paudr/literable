## [literable].sequenceEqual
Determines whether two sequences are equal according to an equality comparer.

#### Overloads
* [sequenceEqual(sequence)](#[sequenceEqual(sequence)): Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
* [sequenceEqual(sequence, comparer)](#[sequenceEqual(sequence,-comparer)): Determines whether two sequences are equal by comparing their elements by using a specified function.

### sequenceEqual(sequence)
Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.

#### Parameters
* **sequence**: A sequence to compare to the `Literable`.
* **result**: `true` if the two source sequences are of equal length and their corresponding elements are equal according to the default equality comparer for their type; otherwise, `false`.

#### Examples

```javascript
const Literable = require('literable');

const storeA = Literable.from(['apple', 'orange']);
const storeB = Literable.from(['apple', 'orange']);

const equalAB = storeA.sequenceEqual(storeB);

console.log(`Equal? ${equalAB}`);

// This code produces the following output:
//
// Equal? true
```

### sequenceEqual(sequence, comparer)
Determines whether two sequences are equal by comparing their elements by using a specified function.

#### Parameters
* **sequence**: A sequence to compare to the `Literable`.
* **comparer**: An fucntion to use to compare elements.
* **result**: `true` if the two source sequences are of equal length and their corresponding elements are equal according to `comparer` for their type; otherwise, `false`.

#### Examples

```javascript
const Literable = require('literable');

const storeA = Literable.from([
    { name: 'apple', code: 9 },
    { name: 'orange', code: 4 },
]);
const storeB = Literable.from([
    { name: 'apple', code: 9 },
    { name: 'orange', code: 4 },
]);
const comparer = (a, b) => a.name === b.name && a.code === b.code;

const equalAB = storeA.sequenceEqual(storeB, comparer);

console.log(`Equal? ${equalAB}`);

// This code produces the following output:
//
// Equal? true
```
