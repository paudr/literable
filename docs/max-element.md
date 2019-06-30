## [literable].maxElement
Returns the maximum value in a sequence of values.

#### Overloads
* [maxElement()](#[maxElement()): Returns the maximum value in a sequence.
* [maxElement(selector)](#[maxElement(selector)): Invokes a transform function on each element of a sequence and returns the element with the maximum resulting value.

### maxElement()
Returns the maximum value in a sequence.

#### Parameters
* **result**: The maximum value in the sequence.

#### Examples
The following code example demonstrates how to use MaxElement to determine the maximum value in a sequence.

```javascript
const Literable = require('literable');

const numbers = Literable.from([4294967296, 466855135, 81125]);
const max = numbers.maxElement();

console.log(`The largest number is ${max}.`);

/*
 This code produces the following output:

 The largest number is 4294967296.
*/
```

### maxElement(selector)
Invokes a transform function on each element of sequence and returns the element with the maximum resulting value.

#### Parameters
* **selector**: A transform function to apply to each element.
* **result**: The maximum value in the sequence.

#### Examples
The following code example demonstrates how to use MaxElement to determine the maximum value in a sequence.

```javascript
const Literable = require('literable');

const pets = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

const max = pets.maxElement(pet => pet.age + pet.name.length);

console.log(`${max.name} has the maximum pet age plus name length.`);

/*
 This code produces the following output:

 Barley has the maximum pet age plus name length.
*/
```
