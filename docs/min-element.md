## [literable].minElement
Returns the minimum value in a sequence of values.

#### Overloads
* [minElement()](#[minElement()): Returns the minimum value in a sequence.
* [minElement(selector)](#[minElement(selector)): Invokes a transform function on each element of a sequence and returns the element with the minimum resulting value.

### minElement()
Returns the minimum value in a sequence.

#### Parameters
* **result**: The minimum value in the sequence.

#### Examples
The following code example demonstrates how to use MinElement to determine the minimum value in a sequence.

```javascript
const Literable = require('literable');

const numbers = Literable.from([4294967296, 466855135, 81125]);
const min = numbers.minElement();

console.log(`The smallest number is ${min}.`);

/*
 This code produces the following output:

 The smallest number is 81125.
*/
```

### minElement(selector)
Invokes a transform function on each element of sequence and returns the element with the minimum resulting value.

#### Parameters
* **selector**: A transform function to apply to each element.
* **result**: The minimum value in the sequence.

#### Examples
The following code example demonstrates how to use MinElement to determine the minimum value in a sequence.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

const min = pets.minElement(pet => pet.age + pet.name.length);

console.log(`${min.name} has the youngest animal is age.`);

/*
 This code produces the following output:

 Boots has the youngest animal is age.
*/
```
