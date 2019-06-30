## [orderedLiterable].thenByDescending
Performs a subsequent ordering of the elements in a sequence in descending order.

#### Overloads
* [thenByDescending(keySelector)](#[any(keySelector)): Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
* [thenByDescending(keySelector, comparer)](#[any(keySelector,-comparer)):Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.

### thenByDescending(keySelector)
Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.

#### Parameters
* **keySelector**: A function to extract a key from each element.
* **result**: An `OrderedLiterable` whose elements are sorted descending to a key.

#### Examples
The following code example demonstrates how to use ThenByDescending to perform a secondary ordering of the elements in a sequence.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['apPLe', 'baNanA', 'apple', 'APple', 'orange', 'BAnana', 'ORANGE', 'apPLE']);

const query = Literable.from(fruits).orderBy(fruit => fruit.length).thenByDescending(fruit => fruit);

for (let fruit of query) console.log(fruit);

// This code produces the following output:
//
// APple
// apPLE
// apPLe
// apple
// ORANGE
// orange
// BAnana
// baNanA
```

### thenByDescending(keySelector, comparer)
Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.

#### Parameters
* **keySelector**: A function to extract a key from each element.
* **comparer**: A function to compare keys.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use ThenByDescending to perform a secondary ordering of the elements in a sequence in descending order by using a custom comparer.

```javascript
const Literable = require('literable');

const fruits = ['apPLe', 'baNanA', 'apple', 'APple', 'orange', 'BAnana', 'ORANGE', 'apPLE'];

const comparer = (a, b) => a.localeCompare(b, 'en-US-u-kf-upper');

const query = Literable.from(fruits).orderBy(fruit => fruit.length).thenByDescending(fruit => fruit, comparer);

for (let fruit of query) console.log(fruit);

// This code produces the following output:
//
// apple
// apPLe
// apPLE
// APple
// orange
// ORANGE
// baNanA
// BAnana
```
