## [literable].max
Returns the maximum value in a sequence of values.

#### Overloads
* [max()](#[max()): Returns the maximum value in a sequence.
* [max(selector)](#[max(selector)): Invokes a transform function on each element of a sequence and returns the maximum resulting value.

### max()
Returns the maximum value in a sequence.

#### Parameters
* **result**: The maximum value in the sequence.

#### Examples
The following code example demonstrates how to use Max to determine the maximum value in a sequence.

```javascript
const Literable = require('literable');

const numbers = Literable.from([4294967296, 466855135, 81125]);
const max = numbers.max();

console.log(`The largest number is ${max}.`);

/*
 This code produces the following output:

 The largest number is 4294967296.
*/
```

### max(selector)
Invokes a transform function on each element of sequence and returns the maximum resulting value.

#### Parameters
* **selector**: A transform function to apply to each element.
* **result**: The maximum value in the sequence.

#### Examples
The following code example demonstrates how to use Max to determine the maximum value in a sequence of projected values.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

const max = pets.max(pet => pet.age + pet.name.length);

console.log(`The maximum pet age plus name length is ${max}.`);

/*
 This code produces the following output:

 The maximum pet age plus name length is 14.
*/
```
