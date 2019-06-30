## [literable].intersect
Produces the set intersection of two sequences.

#### Overloads
* [intersect(sequence)](#[intersect(sequence)): Produces the set intersection of two sequences by using the default equality comparer to compare values.
* [intersect(sequence, comparer)](#[intersect(sequence,-comparer)): Produces the set intersection of two sequences by using the specified function to compare values.

### intersect(sequence)
Produces the set intersection of two sequences by using the default equality comparer to compare values.

#### Parameters
* **sequence**: An secuence whose distinct elements that also appear in the `Literable` will be returned.
* **result**: A `Literable` that contains the elements that form the set intersection of two sequences.

#### Examples
The following code example demonstrates how to use Intersect to return the elements that appear in each of two sequences of integers.

```javascript
const Literable = require('literable');

const id1 = [44, 26, 92, 30, 71, 38];
const id2 = [39, 59, 83, 47, 26, 4, 30];
const both = Literable.from(id1).intersect(id2);

for (let id of both) console.log(id);

/*
 This code produces the following output:

 26
 30
*/
```

### intersect(sequence, comparer)
Produces the set intersection of two sequences by using the specified function to compare values.

#### Parameters
* **sequence**: An secuence whose distinct elements that also appear in the `Literable` will be returned.
* **comparer**: A function to compare values.
* **result**: A `Literable` that contains the elements that form the set intersection of two sequences.

#### Examples
The following example shows how to implement an equality comparer that can be used in the Intersect method.

```javascript
const Literable = require('literable');

const store1 = [
    { name: 'apple', code: 9 },
    { name: 'orange', code: 4 },
];
const store2 = [
    { name: 'apple', code: 9 },
    { name: 'lemon', code: 12 },
];
const comparer = (a, b) => a.name === b.name;

const duplicates = Literable.from(store1).intersect(store2, (a, b) => a.name === b.name);

for (let product of duplicates) console.log(`${product.name} ${product.code}`);

/*
 This code produces the following output:

 apple 9
*/
```
