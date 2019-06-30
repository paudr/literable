## [literable].min
Returns the minimum value in a sequence of values.

#### Overloads
* [min()](#[min()): Returns the minimum value in a sequence.
* [min(selector)](#[min(selector)): Invokes a transform function on each element of a sequence and returns the minimum resulting value.

### min()
Returns the minimum value in a sequence.

#### Parameters
* **result**: The minimum value in the sequence.

#### Examples
The following code example demonstrates how to use Min to determine the minimum value in a sequence.

```javascript
const Literable = require('literable');

const numbers = Literable.from([4294967296, 466855135, 81125]);
const min = numbers.min();

console.log(`The smallest number is ${min}.`);

/*
 This code produces the following output:

 The smallest number is 81125.
*/
```

### min(selector)
Invokes a transform function on each element of sequence and returns the minimum resulting value.

#### Parameters
* **selector**: A transform function to apply to each element.
* **result**: The minimum value in the sequence.

#### Examples
The following code example demonstrates how to use Max to determine the minimum value in a sequence of projected values.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

const min = pets.min(pet => pet.age);

console.log(`The youngest animal is age ${min}.`);

/*
 This code produces the following output:

 The youngest animal is age 1.
*/
```
