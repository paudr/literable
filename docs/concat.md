## [literable].concat

### concat(...collections)
Concatenates the sequences.

#### Parameters
* **collections**: The sequences to concatenate.
* **result**: An `Literable` that contains the concatenated elements of all the input sequences.

#### Examples
The following code example demonstrates how to use Concat to concatenate two sequences.

```javascript
const Literable = require('literable');

const cats = [
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
];
const dogs = [
    { name: 'Bounder', age: 3 },
    { name: 'Snoopy', age: 14 },
    { name: 'Fido', age: 9 },
];

const query = Literable.from(cats).select(cat => cat.name)
    .concat(dogs.map(dog => dog.name));

console.log(query.toArray());

// This code produces the following output:
// [
//     Barley,
//     Boots,
//     Whiskers,
//     Bounder,
//     Snoopy,
//     Fido,
// ]
```
