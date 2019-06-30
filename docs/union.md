## [literable].union
Produces the set union of two sequences.

#### Overloads
* [union(sequence)](#[union(sequence)): Produces the set union of two sequences by using the default equality comparer.
* [union(sequence, comparer)](#[union(sequence,-comparer)): Produces the set union of two sequences by using a specified comparer.

### union(sequence)
Produces the set union of two sequences by using the default equality comparer.

#### Parameters
* **sequence**: A sequence whose distinct elements form the second set for the union.
* **result**: A new `Literable` that contains the elements from current `Literable` and input sequence, excluding duplicates.

#### Examples
The following code example demonstrates how to use Union to obtain the union of two sequences of integers.

```javascript
const Literable = require('literable');

const ints1 = [5, 3, 9, 7, 5, 9, 3, 7];
const ints2 = [8, 3, 6, 4, 4, 9, 1, 0];

const union = Literable.from(ints1).union(ints2);

console.log(union.toArray());

// This code produces the following output:
//
// [ 5, 3, 9, 7, 8, 6, 4, 1, 0 ]
```

### union(sequence, comparer)
Produces the set union of two sequences by using a specified comparer.

#### Parameters
* **sequence**: A sequence whose distinct elements form the second set for the union.
* **result**: A new `Literable` that contains the elements from current `Literable` and input sequence, excluding duplicates.

#### Examples
The following example shows how to implement an equality comparer that can be used in the Union method.

```javascript
const Literable = require('literable');

const store1 = [
    { name: "apple", code: 9 },
    { name: "orange", code: 4 },
];
const store2 = [
    { name: "apple", code: 9 },
    { name: "lemon", code: 12 },
];

const comparer = (a, b) => a.name === b.name && a.code === b.code;

const union = Literable.from(store1).union(store2, comparer);

for (let item of union) console.log(`[${item.code}] - ${item.name}`);

// This code produces the following output:
//
// [9] - apple
// [4] - orange
// [12] - lemon
```
