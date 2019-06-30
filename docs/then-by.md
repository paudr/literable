## [orderedLiterable].thenBy
Performs a subsequent ordering of the elements in a sequence in ascending order.

#### Overloads
* [thenBy(keySelector)](#[thenBy(keySelector)): Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
* [thenBy(keySelector, comparer)](#[thenBy(keySelector,-comparer)): Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.

### thenBy(keySelector)
Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.

#### Parameters
* **keySelector**: A function to extract a key from each element.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use ThenBy to perform a secondary ordering of the elements in a sequence.

```javascript
const Literable = require('literable');

const fruits = ['grape', 'passionfruit', 'banana', 'cherry', 'mango', 'orange', 'raspberry', 'apple', 'blueberry'];

const query = Literable.from(fruits)
    .orderBy(fruit => fruit.length)
    .thenBy(fruit => fruit);

for (let fruit of query) console.log(fruit);

// This code produces the following output:
//
// apple
// grape
// mango
// banana
// cherry
// orange
// blueberry
// raspberry
// passionfruit
```

### thenBy(keySelector, comparer)
Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.

#### Parameters
* **keySelector**: A function to extract a key from each element.
* **comparer**: A function to compare keys.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use ThenBy to perform a secondary ordering of the elements in a sequence in descending order by using a custom comparer.

```javascript
const Literable = require('literable');

const fruits = ['grape', 'passionfruit', 'banana', 'cherry', 'mango', 'orange', 'raspberry', 'apple', 'blueberry'];

const reverse = str => str.split('').reverse().join('');

const comparer = (a, b) => reverse(a).localeCompare(reverse(b));

const query = Literable.from(fruits)
    .orderBy(fruit => fruit.length)
    .thenBy(fruit => fruit, comparer);

for (let fruit of query) console.log(fruit);

// This code produces the following output:
//
// apple
// grape
// mango
// banana
// orange
// cherry
// blueberry
// raspberry
// passionfruit
```
