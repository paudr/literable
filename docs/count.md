## [literable].count
Returns the number of elements in a sequence.

#### Overloads
* [count()](#[count()): Returns the number of elements in a sequence.
* [count(predicate)](#[count(predicate)): Returns a number that represents how many elements in the specified sequence satisfy a condition.

### count()
Returns the number of elements in a sequence.

#### Parameters
* **result**: The number of elements in the input sequence.

#### Examples
The following code example demonstrates how to use Count to count the elements in an array.

```javascript
const Literable = require('literable');

const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];

const numberOfFruits = Literable.from(fruits).count();
console.log(`There are ${numberOfFruits} fruits in the collection.`);

// This code produces the following output:
//
// There are 6 fruits in the collection.
```

### count(predicate)
Returns a number that represents how many elements in the specified sequence satisfy a condition.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **result**: A number that represents how many elements in the sequence satisfy the condition in the predicate function.

#### Examples
The following code example demonstrates how to use Count(predicate) to count the elements in an array that satisfy a condition.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', vaccinated: true },
    { name: 'Boots', vaccinated: false },
    { name: 'Whiskers', vaccinated: false },
]);

const numberUnvaccinated = pets.count(p => p.vaccinated == false);
console.log(`There are ${numberUnvaccinated} unvaccinated animals.`);

// This code produces the following output:
//
// There are 2 unvaccinated animals.
```
