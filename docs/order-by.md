## [literable].orderBy
Sorts the elements of a sequence in ascending order.

#### Overloads
* [orderBy(keySelector)](#[orderBy(keySelector)): Sorts the elements of a sequence in ascending order according to a key.
* [orderBy(keySelector, comparer)](#[orderBy(keySelector,-comparer)): Sorts the elements of a sequence in ascending order by using a specified comparer.

### orderBy(keySelector)
Sorts the elements of a sequence in ascending order according to a key.

#### Parameters
* **keySelector**: A function to extract a key from an element.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use OrderBy to sort the elements of a sequence.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

const query = pets.orderBy(pet => pet.age);

for (let pet of query) {
    console.log(`${pet.name} - ${pet.age}`);
}

/*
 This code produces the following output:

 Whiskers - 1
 Boots - 4
 Barley - 8
*/
```

### orderBy(keySelector, comparer)
Sorts the elements of a sequence in ascending order by using a specified comparer.

#### Parameters
* **keySelector**: A function to extract a key from an element.
* **comparer**: A function to compare keys.
* **result**: An `OrderedLiterable` whose elements are sorted according to a key.

#### Examples
The following code example demonstrates how to use OrderBy to sort the elements of a sequence.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

const query = pets.orderBy(pet => pet.name, (a, b) => a.length - b.length);

for (let pet of query) {
    console.log(`${pet.name} - ${pet.name.length}`);
}

/*
 This code produces the following output:

 Boots - 5
 Barley - 6
 Whiskers - 8
*/
```
