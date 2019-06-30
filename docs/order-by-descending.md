## [literable].orderByDescending
Sorts the elements of a sequence in descending order.

#### Overloads
* [orderByDescending(keySelector)](#[orderByDescending(keySelector)): Sorts the elements of a sequence in descending order according to a key.
* [orderByDescending(keySelector, comparer)](#[orderByDescending(keySelector,-comparer)): Sorts the elements of a sequence in descending order by using a specified comparer.

### orderByDescending(keySelector)
Sorts the elements of a sequence in descending order according to a key.

#### Parameters
* **keySelector**: A function to extract a key from an element.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use OrderByDescending to sort the elements of a sequence.

```javascript
const Literable = require('literable');

const decimals = Literable.from([6.2, 8.3, 0.5, 1.3, 6.3, 9.7]);
const query = decimals.orderByDescending(x => x);

console.log(query.toArray());

/*
 This code produces the following output:

 [ 9.7, 8.3, 6.3, 6.2, 1.3, 0.5 ]
*/
```

### orderByDescending(keySelector, comparer)
Sorts the elements of a sequence in descending order by using a specified comparer.

#### Parameters
* **keySelector**: A function to extract a key from an element.
* **comparer**: A function to compare keys.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use OrderByDescending to sort the elements of a sequence.

```javascript
const Literable = require('literable');

const decimals = Literable.from([6.2, 8.3, 0.5, 1.3, 6.3, 9.7]);

const fractPart = num => Math.round(10 * (num - Math.floor(num)));
const compareFractionalPart = (a, b) => {
    const fractDiff = fractPart(a) - fractPart(b);
    return fractDiff === 0 ? a - b : fractDiff;
};

const query = decimals.orderByDescending(x => x, compareFractionalPart);

console.log(query.toArray());

/*
 This code produces the following output:

 [ 9.7, 0.5, 8.3, 6.3, 1.3, 6.2 ]
*/
```
