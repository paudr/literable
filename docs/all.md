## [literable].all

### all(predicate)
Determines whether all elements of a sequence satisfy a condition.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **result**: `true` if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, `false`.

#### Examples
The following code example demonstrates how to use All to determine whether all the elements in a sequence satisfy a condition. Variable allStartWithB is true if all the pet names start with "B" or if the pets array is empty.

```javascript
const Literable = require('literable');

// Create an array of Pets.
const pets = [
    { name: 'Barley', age: 10 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 6 },
];

// Determine whether all pet names in the array start with 'B'.
const allStartWithB = Literable.from(pets)
    .all(pet => pet.name.startsWith('B'));

console.log(`${allStartWithB ? 'All' : 'Not all'} pet names start with 'B'.`);

// This code produces the following output:
//
// Not all pet names start with 'B'.
```
